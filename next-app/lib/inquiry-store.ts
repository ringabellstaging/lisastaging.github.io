import { randomUUID } from "node:crypto";
import type { Inquiry } from "./inquiry-core";
import {
  recordMarketingPreference,
  type MarketingPreference,
} from "./marketing-consent.ts";
import {
  decryptRecord,
  encryptRecord,
  encryptionConfigured,
  inquiryHash,
} from "./inquiry-crypto.ts";

// Server-side REST access. Durable state and rate limiting are shared across Vercel instances.
const RETENTION = 30 * 24 * 60 * 60;
const JOBS = "oaktime:pending";
export type InquiryJob = {
  data: Inquiry;
  digest: string;
  createdAt: number;
  teamSent: boolean;
  confirmationRequested: boolean;
  customerSent: boolean;
  attempts: number;
  marketingPreference?: MarketingPreference;
};
export function storageConfigured() {
  return Boolean(
    secureStorageUrl() && storageToken() && encryptionConfigured(),
  );
}
function secureStorageUrl() {
  try {
    const url = new URL(
      process.env.UPSTASH_REDIS_REST_URL || process.env.KV_REST_API_URL || "",
    );
    return url.protocol === "https:" && !url.username && !url.password
      ? url.href
      : null;
  } catch {
    return null;
  }
}
function storageToken() {
  return process.env.UPSTASH_REDIS_REST_TOKEN || process.env.KV_REST_API_TOKEN;
}
export async function redis<T>(...command: (string | number)[]): Promise<T> {
  const url = secureStorageUrl();
  const token = storageToken();
  if (!url || !token) throw new Error("Inquiry storage is not configured");
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(command),
    cache: "no-store",
    redirect: "error",
    signal: AbortSignal.timeout(5000),
  });
  if (!response.ok) throw new Error("Inquiry storage unavailable");
  const result = await response.json();
  if (result.error) throw new Error("Inquiry storage rejected request");
  return result.result as T;
}
export const hash = inquiryHash;
export const jobKey = (id: string) => `oaktime:inquiry:${id}`;
export async function getJob(id: string): Promise<InquiryJob | null> {
  const value = await redis<string | null>("GET", jobKey(id));
  return value ? decryptRecord<InquiryJob>(jobKey(id), value) : null;
}
export async function rateLimit(key: string, maximum: number, seconds: number) {
  const count = await redis<number>(
    "EVAL",
    "local n=redis.call('INCR',KEYS[1]); if n==1 then redis.call('EXPIRE',KEYS[1],ARGV[1]) end; return n",
    1,
    `oaktime:rate:${key}`,
    seconds,
  );
  return count <= maximum;
}
export async function createJob(data: Inquiry) {
  const digest = hash(JSON.stringify(data));
  const createdAt = Date.now();
  const job: InquiryJob = {
    data,
    digest,
    createdAt,
    teamSent: false,
    // Freeze this choice per inquiry so a later settings change cannot send
    // unexpected acknowledgements when an older job is retried.
    confirmationRequested: process.env.INQUIRY_SEND_CONFIRMATION === "true",
    customerSent: false,
    attempts: 0,
    // Freeze the timestamp and exact disclosure before delivery/retries.
    ...(typeof data.marketingConsent === "boolean"
      ? {
          marketingPreference: recordMarketingPreference(
            data.marketingConsent,
            data.locale ?? "en",
            createdAt,
          ),
        }
      : {}),
  };
  // Save the record and enqueue it atomically so an interrupted request can be retried.
  const created = await redis<number>(
    "EVAL",
    "if redis.call('EXISTS',KEYS[1])==1 then return 0 end; redis.call('SET',KEYS[1],ARGV[1],'EX',ARGV[2]); redis.call('ZADD',KEYS[2],ARGV[3],ARGV[4]); return 1",
    2,
    jobKey(data.requestId),
    JOBS,
    encryptRecord(jobKey(data.requestId), job),
    RETENTION,
    Date.now(),
    data.requestId,
  );
  return created ? job : await getJob(data.requestId);
}
export async function saveJob(job: InquiryJob) {
  const ttl = Math.max(
    1,
    Math.floor((job.createdAt + RETENTION * 1000 - Date.now()) / 1000),
  );
  await redis(
    "SET",
    jobKey(job.data.requestId),
    encryptRecord(jobKey(job.data.requestId), job),
    "EX",
    ttl,
  );
}
export async function completeJob(id: string) {
  await redis("ZREM", JOBS, id);
}
export async function deferJob(id: string, attempts: number) {
  await redis(
    "ZADD",
    JOBS,
    Date.now() + Math.min(3600000, 60000 * 2 ** Math.min(attempts, 6)),
    id,
  );
}
export async function dueJobs() {
  return redis<string[]>("ZRANGEBYSCORE", JOBS, 0, Date.now(), "LIMIT", 0, 5);
}
export async function lockJob(id: string) {
  const token = randomUUID();
  const acquired = await redis(
    "SET",
    `oaktime:lock:${id}`,
    token,
    "NX",
    "EX",
    120,
  );
  return acquired ? token : null;
}
export async function unlockJob(id: string, token: string) {
  await redis(
    "EVAL",
    "if redis.call('GET',KEYS[1])==ARGV[1] then return redis.call('DEL',KEYS[1]) else return 0 end",
    1,
    `oaktime:lock:${id}`,
    token,
  );
}

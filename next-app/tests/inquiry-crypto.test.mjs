import test from "node:test";
import assert from "node:assert/strict";
import { randomBytes } from "node:crypto";
import {
  decryptRecord,
  encryptRecord,
  encryptionConfigured,
  inquiryHash,
} from "../lib/inquiry-crypto.ts";
import { redis, storageConfigured } from "../lib/inquiry-store.ts";

test("inquiry encryption protects customer data and rejects tampering, swapped records and wrong keys", () => {
  const oldKey = process.env.INQUIRY_ENCRYPTION_KEY;
  const key = randomBytes(32).toString("base64");
  process.env.INQUIRY_ENCRYPTION_KEY = key;
  const recordKey = "oaktime:inquiry:test-1";
  const record = {
    data: {
      address: "123 Test Street",
      email: "customer@example.test",
      name: "測試客户",
    },
    teamSent: false,
  };
  try {
    assert.equal(encryptionConfigured(), true);
    const encrypted = encryptRecord(recordKey, record);
    assert.deepEqual(decryptRecord(recordKey, encrypted), record);
    assert.notEqual(encrypted, encryptRecord(recordKey, record));
    for (const value of Object.values(record.data))
      assert.equal(encrypted.includes(value), false);
    assert.throws(() => decryptRecord("oaktime:inquiry:test-2", encrypted));
    assert.throws(() => decryptRecord(recordKey, JSON.stringify(record)));
    for (const field of ["iv", "tag", "ciphertext"]) {
      const changed = JSON.parse(encrypted);
      const bytes = Buffer.from(changed[field], "base64");
      bytes[0] ^= 1;
      changed[field] = bytes.toString("base64");
      assert.throws(() => decryptRecord(recordKey, JSON.stringify(changed)));
    }
    const fingerprint = inquiryHash(record.data.email);
    assert.equal(fingerprint, inquiryHash(record.data.email));
    process.env.INQUIRY_ENCRYPTION_KEY = randomBytes(32).toString("base64");
    assert.throws(() => decryptRecord(recordKey, encrypted));
    assert.notEqual(fingerprint, inquiryHash(record.data.email));
    process.env.INQUIRY_ENCRYPTION_KEY = key;
    assert.deepEqual(decryptRecord(recordKey, encrypted), record);
    for (const invalid of [
      "",
      "not-a-key",
      Buffer.alloc(16).toString("base64"),
      `${key}\n`,
    ]) {
      process.env.INQUIRY_ENCRYPTION_KEY = invalid;
      assert.equal(encryptionConfigured(), false);
      assert.throws(() => encryptRecord(recordKey, record));
    }
  } finally {
    if (oldKey === undefined) delete process.env.INQUIRY_ENCRYPTION_KEY;
    else process.env.INQUIRY_ENCRYPTION_KEY = oldKey;
  }
});

test("storage fails closed without encryption and refuses insecure URLs before sending credentials", async () => {
  const envNames = [
    "INQUIRY_ENCRYPTION_KEY",
    "UPSTASH_REDIS_REST_URL",
    "UPSTASH_REDIS_REST_TOKEN",
  ];
  const oldEnv = Object.fromEntries(
    envNames.map((key) => [key, process.env[key]]),
  );
  const oldFetch = globalThis.fetch;
  globalThis.fetch = async () => assert.fail("No network request is allowed");
  try {
    process.env.UPSTASH_REDIS_REST_URL = "https://storage.example.test";
    process.env.UPSTASH_REDIS_REST_TOKEN = "test-token";
    delete process.env.INQUIRY_ENCRYPTION_KEY;
    assert.equal(storageConfigured(), false);
    process.env.INQUIRY_ENCRYPTION_KEY = randomBytes(32).toString("base64");
    assert.equal(storageConfigured(), true);
    for (const url of [
      "http://storage.example.test",
      "https://user:pass@storage.example.test",
      "not-a-url",
    ]) {
      process.env.UPSTASH_REDIS_REST_URL = url;
      assert.equal(storageConfigured(), false);
      await assert.rejects(redis("PING"));
    }
  } finally {
    globalThis.fetch = oldFetch;
    for (const [key, value] of Object.entries(oldEnv)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});

test("Vercel integration variables provide authenticated HTTPS storage without copying credentials", async () => {
  const envNames = [
    "INQUIRY_ENCRYPTION_KEY",
    "UPSTASH_REDIS_REST_URL",
    "UPSTASH_REDIS_REST_TOKEN",
    "KV_REST_API_URL",
    "KV_REST_API_TOKEN",
  ];
  const oldEnv = Object.fromEntries(
    envNames.map((key) => [key, process.env[key]]),
  );
  const oldFetch = globalThis.fetch;
  try {
    delete process.env.UPSTASH_REDIS_REST_URL;
    delete process.env.UPSTASH_REDIS_REST_TOKEN;
    process.env.INQUIRY_ENCRYPTION_KEY = randomBytes(32).toString("base64");
    process.env.KV_REST_API_URL = "https://integration.example.test";
    process.env.KV_REST_API_TOKEN = "integration-test-token";
    globalThis.fetch = async (url, options) => {
      assert.equal(url, "https://integration.example.test/");
      assert.equal(
        options.headers.Authorization,
        "Bearer integration-test-token",
      );
      assert.equal(options.redirect, "error");
      assert.deepEqual(JSON.parse(options.body), ["PING"]);
      return Response.json({ result: "PONG" });
    };
    assert.equal(storageConfigured(), true);
    assert.equal(await redis("PING"), "PONG");
  } finally {
    globalThis.fetch = oldFetch;
    for (const [key, value] of Object.entries(oldEnv)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});

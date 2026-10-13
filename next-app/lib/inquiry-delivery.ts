import { buildEmails } from "./inquiry-core.ts";
import {
  completeJob,
  deferJob,
  getJob,
  lockJob,
  saveJob,
  unlockJob,
} from "./inquiry-store.ts";

export function emailConfigured() {
  return Boolean(
    process.env.RESEND_API_KEY &&
      process.env.INQUIRY_FROM &&
      process.env.INQUIRY_TO,
  );
}
async function send(
  email: ReturnType<typeof buildEmails>["team"],
  key: string,
): Promise<void> {
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": key,
    },
    body: JSON.stringify(email),
    signal: AbortSignal.timeout(8000),
  });
  if (!response.ok) throw new Error(`Email provider status ${response.status}`);
}
export async function deliverInquiry(id: string) {
  const token = await lockJob(id);
  if (!token) return false;
  try {
    const job = await getJob(id);
    if (!job) {
      await completeJob(id);
      return false;
    }
    if (job.teamSent && (!job.confirmationRequested || job.customerSent)) {
      await completeJob(id);
      return true;
    }
    // Resend remembers idempotency keys for 24h. Stop before that window expires;
    // unresolved records remain available for manual review without duplicate mail.
    if (
      Date.now() - job.createdAt > 23 * 60 * 60 * 1000 ||
      job.attempts >= 10
    ) {
      await completeJob(id);
      console.error("[inquiry] needs manual delivery review", { id });
      return false;
    }
    job.attempts += 1;
    await saveJob(job);
    const messages = buildEmails(
      job.data,
      process.env.INQUIRY_FROM!,
      process.env.INQUIRY_TO!,
    );
    try {
      if (!job.teamSent) {
        await send(messages.team, `oaktime-team-${id}`);
        job.teamSent = true;
        await saveJob(job);
      }
      if (job.confirmationRequested && !job.customerSent) {
        await send(messages.customer, `oaktime-customer-${id}`);
        job.customerSent = true;
        await saveJob(job);
      }
      await completeJob(id);
      return true;
    } catch {
      await deferJob(id, job.attempts);
      console.error("[inquiry] email pending retry", {
        id,
        teamSent: job.teamSent,
        customerSent: job.customerSent,
      });
      return false;
    }
  } finally {
    await unlockJob(id, token);
  }
}

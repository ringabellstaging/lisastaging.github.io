import { isAllowedOrigin, validateInquiry } from "@/lib/inquiry-core";
import {
  createJob,
  getJob,
  hash,
  rateLimit,
  storageConfigured,
} from "@/lib/inquiry-store";
import { deliverInquiry, emailConfigured } from "@/lib/inquiry-delivery";
import { siteUrl } from "@/lib/site";

export const runtime = "nodejs";
export const maxDuration = 60;
const reply = (body: object, status = 200) =>
  Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (
    !isAllowedOrigin(origin, request.url, request.headers.get("host"), siteUrl)
  )
    return reply({ error: "Please submit the form from this website." }, 403);
  if (!request.headers.get("content-type")?.includes("application/json"))
    return reply({ error: "Unsupported form submission." }, 415);
  // Enforce a streaming size limit, including requests without Content-Length.
  const reader = request.body?.getReader();
  if (!reader) return reply({ error: "The form was empty." }, 400);
  let text = "",
    size = 0;
  const decoder = new TextDecoder();
  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 12000) {
        await reader.cancel();
        return reply({ error: "Please shorten your message." }, 413);
      }
      text += decoder.decode(value, { stream: true });
    }
    text += decoder.decode();
  } catch {
    return reply({ error: "Unable to read the form." }, 400);
  }
  let input: unknown;
  try {
    input = JSON.parse(text);
  } catch {
    return reply({ error: "Please check your form details." }, 400);
  }
  const { data, error } = validateInquiry(input);
  if (!data) return reply({ error }, 400);
  // Fail closed: no demo success and no customer data in logs when credentials are missing.
  if (!emailConfigured() || !storageConfigured() || !process.env.CRON_SECRET)
    return reply(
      {
        error:
          "Online inquiries are temporarily unavailable. Please contact our team directly.",
      },
      503,
    );
  try {
    const ip =
      request.headers.get("x-vercel-forwarded-for")?.split(",")[0]?.trim() ||
      request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      "unknown";
    if (!(await rateLimit(`ip:${hash(ip)}`, 8, 600)))
      return reply(
        { error: "Too many requests. Please try again later." },
        429,
      );
    let job = await getJob(data.requestId);
    if (job && job.digest !== hash(JSON.stringify(data)))
      return reply(
        {
          error:
            "These details changed. Please reload the page and submit again.",
        },
        409,
      );
    if (!job) {
      // A global cap also limits abuse spread across many addresses and IPs.
      if (!(await rateLimit("all", 40, 86400)))
        return reply(
          {
            error:
              "Online inquiries have reached today’s limit. Please contact our team directly.",
          },
          429,
        );
      if (!(await rateLimit(`email:${hash(data.email)}`, 3, 86400)))
        return reply(
          {
            error:
              "We have received several inquiries from this email today. Please contact us directly.",
          },
          429,
        );
      job = await createJob(data);
    }
    if (!job) throw new Error("Record not saved");
    if (job.digest !== hash(JSON.stringify(data)))
      return reply({ error: "Please reload the page and submit again." }, 409);
    let confirmationSent = job.customerSent;
    try {
      const delivered = await deliverInquiry(data.requestId);
      confirmationSent ||= Boolean(job.confirmationRequested && delivered);
    } catch {
      console.error("[inquiry] delivery pending", { id: data.requestId });
    }
    return reply({
      ok: true,
      reference: `OT-${data.requestId}`,
      confirmationRequested: Boolean(job.confirmationRequested),
      confirmationSent,
    });
  } catch {
    return reply(
      { error: "We couldn’t safely save your inquiry. Please try again." },
      503,
    );
  }
}

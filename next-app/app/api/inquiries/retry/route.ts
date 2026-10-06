import { timingSafeEqual } from "node:crypto";
import { dueJobs, storageConfigured } from "@/lib/inquiry-store";
import { deliverInquiry, emailConfigured } from "@/lib/inquiry-delivery";
export const runtime = "nodejs";
export const maxDuration = 300;
export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  const supplied = Buffer.from(request.headers.get("authorization") || "");
  const expected = Buffer.from(`Bearer ${secret}`);
  if (
    !secret ||
    supplied.length !== expected.length ||
    !timingSafeEqual(supplied, expected)
  )
    return new Response("Unauthorized", { status: 401 });
  if (!emailConfigured() || !storageConfigured())
    return Response.json({ error: "Not configured" }, { status: 503 });
  const jobs = await dueJobs();
  let delivered = 0;
  for (const id of jobs) {
    try {
      if (await deliverInquiry(id)) delivered += 1;
    } catch {
      console.error("[inquiry] retry failed", { id });
    }
  }
  return Response.json(
    { processed: jobs.length, delivered },
    { headers: { "Cache-Control": "no-store" } },
  );
}

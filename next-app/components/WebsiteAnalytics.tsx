"use client";

import { Analytics } from "@vercel/analytics/next";
import { publicPageView } from "@/lib/analytics";

export default function WebsiteAnalytics() {
  return <Analytics beforeSend={publicPageView} />;
}

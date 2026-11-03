import type { BeforeSendEvent } from "@vercel/analytics";

// Record public page views only. Form fields, URL parameters and custom events
// do not belong in the traffic dashboard.
export function publicPageView(event: BeforeSendEvent): BeforeSendEvent | null {
  if (event.type !== "pageview") return null;
  try {
    const url = new URL(event.url);
    const path = url.pathname.replace(/^\/(zh-hant|zh)(?=\/|$)/, "") || "/";
    if (
      !["https:", "http:"].includes(url.protocol) ||
      !/^(\/|\/projects|\/home-staging-gta|\/furniture|\/about|\/contact|\/privacy|\/house\d+)$/.test(
        path,
      )
    )
      return null;
    return { type: "pageview", url: `${url.origin}${url.pathname}` };
  } catch {
    return null;
  }
}

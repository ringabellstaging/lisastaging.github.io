import type { MetadataRoute } from "next";
import { siteUrl, isIndexable } from "@/lib/site";
export default function robots(): MetadataRoute.Robots {
  // Crawlers must be able to see noindex on previews; robots.txt is not access control.
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    ...(siteUrl && isIndexable ? { sitemap: `${siteUrl}/sitemap.xml` } : {}),
  };
}

import type { MetadataRoute } from "next";
import { siteUrl, isIndexable } from "@/lib/site";
import { locales, localizedPath } from "@/lib/i18n";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl || !isIndexable) return [];
  return [
    "/",
    "/projects",
    "/home-staging-gta",
    "/furniture",
    "/about",
    "/contact",
    "/privacy",
  ].flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteUrl}${localizedPath(path, locale)}`,
      alternates: {
        languages: {
          "en-CA": `${siteUrl}${localizedPath(path, "en")}`,
          "zh-Hans": `${siteUrl}${localizedPath(path, "zh")}`,
          "zh-Hant": `${siteUrl}${localizedPath(path, "zh-hant")}`,
          "x-default": `${siteUrl}${localizedPath(path, "en")}`,
        },
      },
    })),
  );
}

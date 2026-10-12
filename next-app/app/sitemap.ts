import type { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { siteUrl, isIndexable } from "@/lib/site";
import { locales, localizedPath } from "@/lib/i18n";
export default function sitemap(): MetadataRoute.Sitemap {
  if (!siteUrl || !isIndexable) return [];
  return [
    "/",
    "/projects",
    "/about",
    "/contact",
    "/privacy",
    ...projects.map((project) => `/${project.id}`),
  ].flatMap((path) =>
    locales.map((locale) => ({
      url: `${siteUrl}${localizedPath(path, locale)}`,
      alternates: {
        languages: {
          "en-CA": `${siteUrl}${localizedPath(path, "en")}`,
          "zh-Hans": `${siteUrl}${localizedPath(path, "zh")}`,
          "zh-Hant": `${siteUrl}${localizedPath(path, "zh-hant")}`,
        },
      },
    })),
  );
}

import type { Metadata } from "next";
import { localizedPath, type Locale } from "./i18n";
import { pageText } from "./page-copy";

// Do not infer a canonical domain from a preview deployment or an expired domain.
const configuredUrl = process.env.SITE_URL?.replace(/\/$/, "");
export const siteUrl =
  configuredUrl && /^https:\/\/[^/]+$/.test(configuredUrl)
    ? configuredUrl
    : undefined;
export const isIndexable =
  Boolean(siteUrl) && process.env.VERCEL_ENV !== "preview";
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  image?: string,
  locale: Locale = "en",
): Metadata {
  return {
    // Home metadata shares its route segment with the root layout, so Next's
    // inherited title template alone does not append the brand there.
    title: { absolute: `${title} | Oaktime Staging` },
    description,
    ...(siteUrl
      ? {
          alternates: {
            canonical: `${siteUrl}${path}`,
            languages: {
              "en-CA": `${siteUrl}${localizedPath(path, "en")}`,
              "zh-Hans": `${siteUrl}${localizedPath(path, "zh")}`,
              "zh-Hant": `${siteUrl}${localizedPath(path, "zh-hant")}`,
              "x-default": `${siteUrl}${localizedPath(path, "en")}`,
            },
          },
        }
      : {}),
    openGraph: {
      title: `${title} | Oaktime Staging`,
      description,
      type: "website",
      locale: { en: "en_CA", zh: "zh_CN", "zh-hant": "zh_TW" }[locale],
      alternateLocale: ["en_CA", "zh_CN", "zh_TW"].filter(
        (value) =>
          value !== { en: "en_CA", zh: "zh_CN", "zh-hant": "zh_TW" }[locale],
      ),
      siteName: "Oaktime Staging",
      ...(siteUrl
        ? {
            url: `${siteUrl}${path}`,
            images: image ? [{ url: `${siteUrl}${image}` }] : undefined,
          }
        : {}),
    },
  };
}

export function localizedMetadata(
  locale: Locale,
  title: string,
  description: string,
  path: string,
  image?: string,
) {
  return pageMetadata(
    pageText(locale, title),
    pageText(locale, description),
    localizedPath(path, locale),
    image,
    locale,
  );
}

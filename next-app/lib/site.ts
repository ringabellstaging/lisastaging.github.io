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
    title,
    description,
    ...(siteUrl
      ? {
          alternates: {
            canonical: `${siteUrl}${path}`,
            languages: {
              "en-CA": `${siteUrl}${localizedPath(path, "en")}`,
              "zh-Hans": `${siteUrl}${localizedPath(path, "zh")}`,
              "x-default": `${siteUrl}${localizedPath(path, "en")}`,
            },
          },
        }
      : {}),
    openGraph: {
      title: `${title} | Oaktime Staging`,
      description,
      type: "website",
      locale: locale === "zh" ? "zh_CN" : "en_CA",
      alternateLocale: locale === "zh" ? "en_CA" : "zh_CN",
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

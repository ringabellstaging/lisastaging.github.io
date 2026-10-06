import type { Metadata } from "next";

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
): Metadata {
  return {
    title,
    description,
    ...(siteUrl ? { alternates: { canonical: `${siteUrl}${path}` } } : {}),
    openGraph: {
      title: `${title} | Oaktime Staging`,
      description,
      type: "website",
      locale: "en_CA",
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

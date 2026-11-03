import type { Locale } from "./i18n";

export const languageCookieName = "oaktime_language";
export const languageCookieMaxAge = 60 * 60 * 24 * 365;

export function savedLanguage(value?: string): Locale | undefined {
  return value === "en" || value === "zh" || value === "zh-hant"
    ? value
    : undefined;
}

function languageTag(tag: string): Locale | undefined {
  const [language, ...parts] = tag.toLowerCase().split("-");
  if (language === "en") return "en";
  if (language !== "zh") return undefined;
  // An explicit script takes precedence over the region (e.g. zh-Hans-HK).
  if (parts.includes("hant")) return "zh-hant";
  if (parts.includes("hans")) return "zh";
  return parts.some((part) => ["tw", "hk", "mo"].includes(part))
    ? "zh-hant"
    : "zh";
}

export function preferredLanguage(
  cookieValue: string | undefined,
  acceptLanguage: string | null,
): Locale {
  const saved = savedLanguage(cookieValue);
  if (saved) return saved;

  const choices = (acceptLanguage || "")
    .split(",")
    .map((entry) => {
      const [tag, ...parameters] = entry.trim().split(";");
      const qualityParameter = parameters.find((part) =>
        /^\s*q\s*=/i.test(part),
      );
      const quality = qualityParameter
        ? Number(qualityParameter.split("=")[1])
        : 1;
      return { locale: languageTag(tag.trim()), quality };
    })
    .filter(
      (choice) =>
        choice.locale &&
        Number.isFinite(choice.quality) &&
        choice.quality > 0 &&
        choice.quality <= 1,
    )
    .sort((a, b) => b.quality - a.quality);

  return choices[0]?.locale || "en";
}

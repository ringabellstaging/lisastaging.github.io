export type Locale = "en" | "zh" | "zh-hant";
export const locales: Locale[] = ["en", "zh", "zh-hant"];
export const languageNames: Record<Locale, string> = {
  en: "English",
  zh: "Simplified Chinese",
  "zh-hant": "Traditional Chinese",
};
export const htmlLanguage = (locale: Locale) =>
  ({ en: "en-CA", zh: "zh-Hans", "zh-hant": "zh-Hant" })[locale];
export const translator =
  (locale: Locale) =>
  (english: string, chinese: string, traditional: string) =>
    locale === "zh-hant" ? traditional : locale === "zh" ? chinese : english;

// Preserve the current page, query and anchor when switching languages.
export function localizedPath(path: string, locale: Locale) {
  const match = path.match(/^([^?#]*)(.*)$/)!;
  const pathname = match[1].replace(/^\/(?:zh-hant|zh)(?=\/|$)/, "") || "/";
  return (
    (locale !== "en"
      ? `/${locale}${pathname === "/" ? "" : pathname}`
      : pathname) + match[2]
  );
}

const cityNames: Record<string, string> = {
  Toronto: "多伦多",
  "Richmond Hill": "列治文山",
  Markham: "万锦",
  Mississauga: "密西沙加",
  Stouffville: "史托维尔",
  Scarborough: "士嘉堡",
  "North York": "北约克",
  Vaughan: "旺市",
  Thornhill: "康山",
  Aurora: "奥罗拉",
  Barrie: "巴里",
  Pickering: "皮克林",
  Oshawa: "奥沙瓦",
  Whitby: "惠特比",
  Unionville: "于人村",
  Woodbridge: "伍德布里奇",
  Maple: "枫树镇",
  "East Gwillimbury": "东贵林",
  Georgina: "乔治娜",
  York: "约克",
};
const traditionalCityNames: Record<string, string> = {
  Toronto: "多倫多",
  "Richmond Hill": "列治文山",
  Markham: "萬錦",
  Mississauga: "密西沙加",
  Stouffville: "史托維爾",
  Scarborough: "士嘉堡",
  "North York": "北約克",
  Vaughan: "旺市",
  Thornhill: "康山",
  Aurora: "奧羅拉",
  Barrie: "巴里",
  Pickering: "皮克林",
  Oshawa: "奧沙瓦",
  Whitby: "惠特比",
  Unionville: "於人村",
  Woodbridge: "伍德布里奇",
  Maple: "楓樹鎮",
  "East Gwillimbury": "東貴林",
  Georgina: "喬治娜",
  York: "約克",
};
export const cityLabel = (city: string, locale: Locale) =>
  locale === "en"
    ? city
    : (locale === "zh-hant" ? traditionalCityNames : cityNames)[city] || city;

export function photoAlt(alt: string, locale: Locale) {
  return locale !== "en"
    ? alt.replace(
        /^Home staging at (.+) — project photograph (\d+)$/,
        "$1 房屋布置案例 · 照片 $2",
      )
    : alt;
}

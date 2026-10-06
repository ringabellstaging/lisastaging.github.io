export type Locale = "en" | "zh";
export const locales: Locale[] = ["en", "zh"];
export const htmlLanguage = (locale: Locale) =>
  locale === "zh" ? "zh-Hans" : "en-CA";
export const translator =
  (locale: Locale) => (english: string, chinese: string) =>
    locale === "zh" ? chinese : english;

// Preserve the current page, query and anchor when switching languages.
export function localizedPath(path: string, locale: Locale) {
  const match = path.match(/^([^?#]*)(.*)$/)!;
  const pathname = match[1].replace(/^\/zh(?=\/|$)/, "") || "/";
  return (
    (locale === "zh" ? `/zh${pathname === "/" ? "" : pathname}` : pathname) +
    match[2]
  );
}

export const cityLabel = (city: string, locale: Locale) =>
  locale === "zh"
    ? (
        {
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
        } as Record<string, string>
      )[city] || city
    : city;

export function photoAlt(alt: string, locale: Locale) {
  return locale === "zh"
    ? alt.replace(
        /^Home staging at (.+) — project photograph (\d+)$/,
        "$1 房屋布置案例 · 照片 $2",
      )
    : alt;
}

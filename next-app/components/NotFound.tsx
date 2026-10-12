import Link from "next/link";
import { localizedPath, type Locale } from "@/lib/i18n";
import { pageText } from "@/lib/page-copy";
export default function NotFound({ locale = "en" }: { locale?: Locale }) {
  const t = (text: string) => pageText(locale, text);
  const href = (path: string) => localizedPath(path, locale);
  return (
    <main id="main" className="section wrap">
      <div className="page-heading">
        <p className="eyebrow">{t("404 · PAGE NOT FOUND")}</p>
        <h1>
          {t("A different")}
          {locale === "en" ? " " : null}
          <em>{t("direction.")}</em>
        </h1>
        <p>
          {t(
            "This project or page is no longer available. You can explore our current portfolio or get in touch about your home.",
          )}
        </p>
      </div>
      <Link href={href("/projects")} className="button button-dark">
        {t("Explore our work ↗")}
      </Link>
    </main>
  );
}

import Portfolio from "@/components/Portfolio";
import { projectSummaries } from "@/lib/projects";
import { localizedMetadata } from "@/lib/site";
import { type Locale } from "@/lib/i18n";
import { pageText } from "@/lib/page-copy";
export const getMetadata = (locale: Locale) =>
  localizedMetadata(
    locale,
    "Our Home Staging Projects",
    "Browse Oaktime Staging projects across Toronto and the GTA. Explore our work by location and discover thoughtful furniture arrangements and styling.",
    "/projects",
  );
export default function ProjectsPage({ locale = "en" }: { locale?: Locale }) {
  const t = (text: string) => pageText(locale, text);
  return (
    <main id="main" className="wrap section">
      <div className="page-heading">
        <p className="eyebrow">{t("THE OAKTIME PORTFOLIO")}</p>
        <h1>
          {t("Every space.")}
          <br />
          <em>{t("A new perspective.")}</em>
        </h1>
        <p>
          {t(
            "A collection of homes, thoughtfully brought to life. Find inspiration for your next chapter.",
          )}
        </p>
      </div>
      <Portfolio projects={projectSummaries} locale={locale} />
    </main>
  );
}

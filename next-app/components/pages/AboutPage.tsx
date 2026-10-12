import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { localizedMetadata } from "@/lib/site";
import { localizedPath, type Locale } from "@/lib/i18n";
import { pageText } from "@/lib/page-copy";
export const getMetadata = (locale: Locale) =>
  localizedMetadata(
    locale,
    "About Our Home Staging Team",
    "Meet Oaktime Staging, a Stouffville-based team bringing thoughtful property styling, furniture placement and staging to homes across Toronto and the GTA.",
    "/about",
  );
export default function AboutPage({ locale = "en" }: { locale?: Locale }) {
  const t = (text: string) => pageText(locale, text);
  const href = (path: string) => localizedPath(path, locale);
  return (
    <main id="main" className="section wrap">
      <div className="about-grid">
        <div className="about-image">
          <Image
            src="/images/house36/img1.jpg"
            alt={t("A bright open-plan home staged by the Oaktime team")}
            fill
            sizes="(max-width: 520px) 92vw, 45vw"
            priority
          />
        </div>
        <div className="about-copy">
          <p className="eyebrow">{t("THE PEOPLE BEHIND THE SPACES")}</p>
          <h1>
            {t("A thoughtful eye.")}
            <br />
            <em>{t("A personal touch.")}</em>
          </h1>
          <p>
            {t(
              "At Oaktime Staging, we believe a well-presented home helps people imagine what comes next. We bring furniture, texture and thoughtful details together to make each space feel welcoming.",
            )}
          </p>
          <p>
            {t(
              "Based in Stouffville, our team works with homeowners and real estate professionals across Toronto and the GTA. From the first conversation to furniture placement and the finishing touches, we take a considered approach to every home.",
            )}
          </p>
          <p>
            {t(
              "Oaktime Staging is operated by Oak Time Inc. Our team can help you in English and Mandarin.",
            )}
          </p>
          <Link href={href("/#inquiry")} className="button button-dark">
            {t("Tell us about your home")}
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </main>
  );
}

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { localizedMetadata } from "@/lib/site";
import { localizedPath, translator, type Locale } from "@/lib/i18n";
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
  const tr = translator(locale);
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
            {tr(
              "With 10 years of home staging experience, we select high-end furniture and accessories and design around each home’s layout, colours and overall style.",
              "我们拥有 10 年 Home Staging 经验，精选高端家具与软装饰品，根据每一套房屋的户型结构、色彩与整体风格进行设计。",
              "我們擁有 10 年 Home Staging 經驗，精選高端傢俱與軟裝飾品，根據每一套房屋的戶型結構、色彩與整體風格進行設計。",
            )}
          </p>
          <p>
            {tr(
              "We focus on proportion, materials and the finishing details, creating natural, layered spaces that feel elevated while retaining the warmth and authenticity of a home.",
              "注重比例、材质与细节呈现，让空间自然、有层次，在提升品质感的同时，保留家的温度与真实生活感。",
              "注重比例、材質與細節呈現，讓空間自然、有層次，在提升品質感的同時，保留家的溫度與真實生活感。",
            )}
          </p>
          <p>
            {tr(
              "New containers arrive every month. With over a hundred sets of high-end furniture and accessories in stock and new pieces arriving regularly, we can coordinate transitions and staging efficiently. We also offer furniture sales and rentals, from complete collections to individual pieces.",
              "我们拥有上百套高端家具与软装现货，新款不断，选择更多，衔接快、进场快。每月均有新货柜到港，持续更新高端全新家具与软装系列。同时提供家具租赁与出售服务，支持整套搭配或单品选择，满足不同空间与需求。",
              "我們擁有上百套高端傢俱與軟裝現貨，新款不斷，選擇更多，銜接快、進場快。每月均有新貨櫃到港，持續更新高端全新傢俱與軟裝系列。同時提供傢俱租賃與出售服務，支援整套搭配或單品選擇，滿足不同空間與需求。",
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

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { localizedPath, translator, type Locale } from "@/lib/i18n";

export default function FurniturePreview({
  locale = "en",
}: {
  locale?: Locale;
}) {
  const t = translator(locale);
  return (
    <section className="furniture-preview section">
      <div className="wrap furniture-preview-inner">
        <div className="furniture-preview-image">
          <Image
            src="/images/house68/img1.jpg"
            alt={t(
              "Furniture and accessories in an Oaktime-styled living room",
              "Oaktime 真实案例中的家具与软装搭配",
              "Oaktime 真實案例中的傢俱與軟裝搭配",
            )}
            fill
            sizes="(max-width: 800px) 92vw, 45vw"
          />
        </div>
        <div className="furniture-preview-copy">
          <p className="eyebrow">
            {t(
              "NEW ARRIVALS EVERY MONTH · FOR SALE & RENT",
              "每月持续上新 · 可租可售",
              "每月持續上新 · 可租可售",
            )}
          </p>
          <h2>
            {t("High-end furniture.", "高端家具，", "高端傢俱，")}
            <br />
            <em>
              {t("For your space.", "为您的空间而选。", "為您的空間而選。")}
            </em>
          </h2>
          <p>
            {t(
              "New containers arrive every month, bringing new high-end furniture and accessories. Buy or rent a complete collection or choose individual pieces to suit your space.",
              "每月均有新货柜到港，持续更新高端全新家具与软装系列。同时提供家具租赁与出售服务，支持整套搭配或单品选择，满足不同空间与需求。",
              "每月均有新貨櫃到港，持續更新高端全新傢俱與軟裝系列。同時提供傢俱租賃與出售服務，支援整套搭配或單品選擇，滿足不同空間與需求。",
            )}
          </p>
          <Link
            href={localizedPath("/furniture", locale)}
            className="text-link"
          >
            {t(
              "Explore furniture sales & rentals",
              "了解家具租售",
              "瞭解傢俱租售",
            )}
            <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </section>
  );
}

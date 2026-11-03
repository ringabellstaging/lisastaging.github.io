import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { localizedPath, translator, type Locale } from "@/lib/i18n";

export default function FirstCollaborationOffer({
  locale = "en",
  inquiryPath = "/contact",
}: {
  locale?: Locale;
  inquiryPath?: string;
}) {
  const t = translator(locale);
  return (
    <aside
      className="first-offer"
      aria-label={t("2026 special offer", "2026 特别优惠", "2026 特別優惠")}
    >
      <div className="wrap first-offer-inner">
        <p className="eyebrow">
          {t("2026 SPECIAL OFFER", "2026 特别优惠", "2026 特別優惠")}
        </p>
        <div>
          <p className="first-offer-title">
            {t(
              "20% off your first collaboration.",
              "首次合作，尊享 8 折。",
              "首次合作，尊享 8 折。",
            )}
          </p>
          <p>
            {t(
              "Home staging · Furniture sales & rentals",
              "Home Staging · 家具租赁与出售",
              "Home Staging · 傢俱租賃與出售",
            )}
          </p>
        </div>
        <Link href={localizedPath(inquiryPath, locale)} className="text-link">
          {t("Let’s talk", "联系咨询", "聯繫諮詢")}
          <ArrowUpRight size={17} />
        </Link>
      </div>
    </aside>
  );
}

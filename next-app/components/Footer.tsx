import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { contactInfo } from "@/lib/contact";
import PhoneContacts from "./PhoneContacts";
import { localizedPath, translator, type Locale } from "@/lib/i18n";

export default function Footer({ locale = "en" }: { locale?: Locale }) {
  const t = translator(locale);
  const href = (path: string) => localizedPath(path, locale);
  return (
    <footer className="site-footer">
      <div className="wrap footer-main">
        <div>
          <Link href={href("/")} className="wordmark">
            oaktime<span>STAGING & STYLING</span>
          </Link>
          <p>
            {t("Thoughtful spaces.", "用心布置空间，", "用心佈置空間，")}
            <br />
            {t(
              "Memorable first impressions.",
              "留下美好印象。",
              "留下美好印象。",
            )}
          </p>
        </div>
        <div>
          <p className="eyebrow">{t("Explore", "了解更多", "瞭解更多")}</p>
          <Link href={href("/#services")}>
            {t("Our services", "我们的服务", "我們的服務")}
          </Link>
          <Link href={href("/projects")}>
            {t("Our work", "案例作品", "案例作品")}
          </Link>
          <Link href={href("/about")}>
            {t("Our story", "关于我们", "關於我們")}
          </Link>
          <Link href={href("/contact")}>
            {t("Get in touch", "联系我们", "聯繫我們")}{" "}
            <ArrowUpRight size={13} />
          </Link>
        </div>
        <div>
          <p className="eyebrow">{t("Let’s talk", "联系团队", "聯繫團隊")}</p>
          <PhoneContacts />
          <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
        </div>
        <div>
          <p className="eyebrow">
            {t("Based in Stouffville", "公司位于史托维尔", "公司位於史托維爾")}
          </p>
          <address>{contactInfo.address}</address>
          <p>
            {t(
              "Serving Toronto & the GTA",
              "服务多伦多及大多地区",
              "服務多倫多及大多地區",
            )}
          </p>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>
          © {new Date().getFullYear()} Oaktime Staging · Oak Time Inc.
        </span>
        <Link href={href("/privacy")}>
          {t("Privacy", "隐私说明", "隱私說明")}
        </Link>
        <a href="#top">{t("Back to top ↑", "返回顶部 ↑", "返回頂部 ↑")}</a>
      </div>
    </footer>
  );
}

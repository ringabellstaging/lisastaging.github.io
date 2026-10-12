import Image from "next/image";
import InquirySection from "@/components/InquirySection";
import { contactInfo } from "@/lib/contact";
import { localizedMetadata } from "@/lib/site";
import { translator, type Locale } from "@/lib/i18n";
import { pageText } from "@/lib/page-copy";
export const getMetadata = (locale: Locale) =>
  localizedMetadata(
    locale,
    "Contact Us for a Home Staging Quote",
    translator(locale)(
      `Request a home staging quote from Oaktime Staging. Call ${contactInfo.englishPhone} or email ${contactInfo.email}. Based in Stouffville, serving Toronto and the GTA.`,
      `联系 Oaktime Staging 获取房屋布置报价。中文电话 ${contactInfo.mandarinPhone}，英文电话 ${contactInfo.englishPhone}，邮箱 ${contactInfo.email}。服务多伦多及大多地区。`,
      `聯繫 Oaktime Staging 獲取房屋佈置報價。中文電話 ${contactInfo.mandarinPhone}，英文電話 ${contactInfo.englishPhone}，郵箱 ${contactInfo.email}。服務多倫多及大多地區。`,
    ),
    "/contact",
  );
export default function ContactPage({ locale = "en" }: { locale?: Locale }) {
  const t = (text: string) => pageText(locale, text);
  return (
    <main id="main">
      <InquirySection standalone locale={locale} />
      <section className="section wrap">
        <div className="section-top">
          <div>
            <p className="eyebrow">{t("GET IN TOUCH")}</p>
            <h2>
              {t("Let’s start a")}
              {locale === "en" ? " " : null}
              <em>{t("conversation.")}</em>
            </h2>
            <div className="contact-address">
              <strong>{t("Company address")}</strong>
              <address>{contactInfo.address}</address>
              <p>{t("Please contact us to arrange a consultation.")}</p>
            </div>
          </div>
          <div>
            <p className="eyebrow">{t("CONNECT ON WECHAT")}</p>
            <Image
              src="/images/LisaWechatQR.jpg"
              alt={t("Scan to contact our Mandarin-speaking team on WeChat")}
              width={144}
              height={144}
              style={{ marginTop: 18 }}
            />
          </div>
        </div>
      </section>
    </main>
  );
}

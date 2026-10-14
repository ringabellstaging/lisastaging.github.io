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
      `联系 Oaktime Staging 咨询多伦多及 GTA 房屋布置报价。中文服务（普通话／国语）请拨打 ${contactInfo.mandarinPhone}，英文电话 ${contactInfo.englishPhone}，邮箱 ${contactInfo.email}。`,
      `聯繫 Oaktime Staging 諮詢多倫多及 GTA 房屋佈置報價。中文服務（普通話／國語）請撥打 ${contactInfo.mandarinPhone}，英文電話 ${contactInfo.englishPhone}，郵箱 ${contactInfo.email}。`,
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

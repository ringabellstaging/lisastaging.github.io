import { contactInfo } from "@/lib/contact";
import { localizedMetadata } from "@/lib/site";
import { translator, type Locale } from "@/lib/i18n";
import { pageText } from "@/lib/page-copy";
import { marketingContact } from "@/lib/marketing-consent";
export const getMetadata = (locale: Locale) =>
  localizedMetadata(
    locale,
    "Inquiry Privacy Notice",
    "How Oaktime Staging uses the information you provide when requesting a home staging quote.",
    "/privacy",
  );
export default function PrivacyPage({ locale = "en" }: { locale?: Locale }) {
  const t = (text: string) => pageText(locale, text);
  const tr = translator(locale);
  return (
    <main id="main" className="section wrap privacy-copy">
      <p className="eyebrow">OAKTIME STAGING · OAK TIME INC.</p>
      <h1>
        {t("Your inquiry.")}
        <br />
        <em>{t("Your information.")}</em>
      </h1>
      <p>
        {t(
          "When you request a quote, we collect your property address, email address and phone number, along with any property type, occupancy, approximate floor area, budget, name or notes you choose to share.",
        )}
      </p>
      <h2>{t("How we use it")}</h2>
      <p>
        {t(
          "We use these details to acknowledge your inquiry, review your staging needs, prepare a quote and contact you about your request. Submitting an inquiry does not automatically subscribe you to marketing emails.",
        )}
      </p>
      <h2>{t("How it is processed")}</h2>
      <p>
        {t(
          "Our website hosting, secure inquiry storage and email delivery providers process this information to help us respond. The website’s inquiry record is retained for up to 30 days; correspondence sent to our business mailbox may be retained for follow-up. Please avoid including financial account details or other sensitive information in the notes.",
        )}
      </p>
      <h2>{t("Optional marketing emails")}</h2>
      <p>
        {t(
          "If you separately tick the optional mailing list box, Oaktime Staging (Oak Time Inc.) may email you occasional staging tips, project inspiration and offers. Leaving it unchecked does not affect your quote request. This permission covers email only, not text messages or phone promotions.",
        )}
      </p>
      <p>
        {t(
          "We record your choice, the time, language, source and wording of the consent request with your inquiry. The website record expires after 30 days. A copy is sent to our business mailbox, where we retain the consent evidence for as long as we rely on it to send marketing emails. To withdraw your consent at any time, email",
        )}{" "}
        <a href={`mailto:${marketingContact.email}?subject=Unsubscribe`}>
          {marketingContact.email}
        </a>
        .{" "}
        {t(
          "We will stop marketing emails within 10 business days of your request.",
        )}
      </p>
      <p>Oak Time Inc. · {marketingContact.address}</p>
      <h2>{tr("Website analytics", "网站访问统计", "網站瀏覽統計")}</h2>
      <p>
        {tr(
          "We use Vercel Web Analytics on our production website to understand page visits and referral sources and improve the site. It does not use analytics cookies. We remove query parameters and fragments from the page URL before recording a visit, and do not send inquiry form details as analytics events. These traffic statistics are separate from the information you submit for a quote.",
          "我们在正式网站使用 Vercel Web Analytics 了解页面访问和来源，以改进网站。该服务不使用统计 Cookie。记录访问前，我们会移除页面网址中的查询参数和片段，也不会将询价表单内容发送为统计事件。访问统计与您提交的询价信息分别处理。",
          "我們在正式網站使用 Vercel Web Analytics 瞭解頁面瀏覽和來源，以改進網站。該服務不使用統計 Cookie。記錄瀏覽前，我們會移除頁面網址中的查詢參數和片段，也不會將詢價表單內容傳送為統計事件。瀏覽統計與您提交的詢價資訊分別處理。",
        )}
      </p>
      <h2>{t("Project locations and maps")}</h2>
      <p>
        {t(
          "Public project maps show approximate neighbourhood locations and street names, rather than full property addresses. When you view the map, your browser requests map tiles from OpenStreetMap, which receives normal connection information such as your IP address.",
        )}
      </p>
      <h2>{t("Questions or requests")}</h2>
      <p>
        {t(
          "To ask about your information or request a correction or deletion, contact",
        )}{" "}
        <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>.
      </p>
    </main>
  );
}

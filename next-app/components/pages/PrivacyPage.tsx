import { contactInfo } from "@/lib/contact";
import { localizedMetadata } from "@/lib/site";
import { type Locale } from "@/lib/i18n";
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
          "When you request a quote, we collect your property address, budget, email address and phone number, along with any name or notes you choose to share.",
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

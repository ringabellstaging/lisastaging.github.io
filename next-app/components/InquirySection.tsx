import InquiryForm from "./InquiryForm";
import { contactInfo } from "@/lib/contact";
import PhoneContacts from "./PhoneContacts";
import { translator, type Locale } from "@/lib/i18n";
export default function InquirySection({
  standalone = false,
  locale = "en",
}: {
  standalone?: boolean;
  locale?: Locale;
}) {
  const Heading = standalone ? "h1" : "h2";
  const t = translator(locale);
  return (
    <section id="inquiry" className="inquiry-section section">
      <div className="wrap inquiry-layout">
        <div className="inquiry-intro">
          <p className="eyebrow">
            {t(
              "LET’S MAKE AN IMPRESSION",
              "一起留下美好印象",
              "一起留下美好印象",
            )}
          </p>
          <Heading>
            {t("Your home.", "您的家，", "您的家，")}
            <br />
            <em>
              {t("Our next chapter.", "由我们用心呈现。", "由我們用心呈現。")}
            </em>
          </Heading>
          <p>
            {t(
              "Tell us a little about your property. A designer will be in touch to discuss your staging needs and prepare a quote.",
              "告诉我们您的房屋情况。设计师会尽快与您联系，沟通布置需求并准备报价。",
              "告訴我們您的房屋情況。設計師會盡快與您聯繫，溝通佈置需求並準備報價。",
            )}
          </p>
          <div className="inquiry-contact">
            <PhoneContacts />
            <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
          </div>
        </div>
        <InquiryForm locale={locale} />
      </div>
    </section>
  );
}

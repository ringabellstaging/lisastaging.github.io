import InquiryForm from "./InquiryForm";
import { contactInfo } from "@/lib/contact";
export default function InquirySection({
  standalone = false,
}: {
  standalone?: boolean;
}) {
  const Heading = standalone ? "h1" : "h2";
  return (
    <section id="inquiry" className="inquiry-section section">
      <div className="wrap inquiry-layout">
        <div className="inquiry-intro">
          <p className="eyebrow">LET’S MAKE AN IMPRESSION</p>
          <Heading>
            Your home.
            <br />
            <em>Our next chapter.</em>
          </Heading>
          <p>
            Tell us a little about your property. A designer will be in touch to
            discuss your staging needs and prepare a quote.
          </p>
          <div className="inquiry-contact">
            <a href={contactInfo.englishPhoneHref}>
              {contactInfo.englishPhone}
              <small>English</small>
            </a>
            <a href={contactInfo.mandarinPhoneHref}>
              {contactInfo.mandarinPhone}
              <small>中文</small>
            </a>
            <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
          </div>
        </div>
        <InquiryForm />
      </div>
    </section>
  );
}

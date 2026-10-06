import { contactInfo } from "@/lib/contact";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Inquiry Privacy Notice",
  "How Oaktime Staging uses the information you provide when requesting a home staging quote.",
  "/privacy",
);
export default function PrivacyPage() {
  return (
    <main id="main" className="section wrap privacy-copy">
      <p className="eyebrow">OAKTIME STAGING · OAK TIME INC.</p>
      <h1>
        Your inquiry.
        <br />
        <em>Your information.</em>
      </h1>
      <p>
        When you request a quote, we collect your property address, budget,
        email address and phone number, along with any name or notes you choose
        to share.
      </p>
      <h2>How we use it</h2>
      <p>
        We use these details to acknowledge your inquiry, review your staging
        needs, prepare a quote and contact you about your request. Submitting an
        inquiry does not subscribe you to marketing emails.
      </p>
      <h2>How it is processed</h2>
      <p>
        Our website hosting, secure inquiry storage and email delivery providers
        process this information to help us respond. The website’s inquiry
        record is retained for up to 30 days; correspondence sent to our
        business mailbox may be retained for follow-up. Please avoid including
        financial account details or other sensitive information in the notes.
      </p>
      <h2>Project locations and maps</h2>
      <p>
        Public project maps show approximate neighbourhood locations and street
        names, rather than full property addresses. When you view the map, your
        browser requests map tiles from OpenStreetMap, which receives normal
        connection information such as your IP address.
      </p>
      <h2>Questions or requests</h2>
      <p>
        To ask about your information or request a correction or deletion,
        contact <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>.
      </p>
    </main>
  );
}

import Image from "next/image";
import InquirySection from "@/components/InquirySection";
import { contactInfo } from "@/lib/contact";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Contact Us for a Home Staging Quote",
  `Request a home staging quote from Oaktime Staging. Call ${contactInfo.englishPhone} or email ${contactInfo.email}. Based in Stouffville, serving Toronto and the GTA.`,
  "/contact",
);
export default function ContactPage() {
  return (
    <main id="main">
      <InquirySection standalone />
      <section className="section wrap">
        <div className="section-top">
          <div>
            <p className="eyebrow">GET IN TOUCH</p>
            <h2>
              Let’s start a <em>conversation.</em>
            </h2>
            <div className="contact-address">
              <strong>Company address</strong>
              <address>{contactInfo.address}</address>
              <p>Please contact us to arrange a consultation.</p>
            </div>
          </div>
          <div>
            <p className="eyebrow">CONNECT ON WECHAT</p>
            <Image
              src="/images/LisaWechatQR.jpg"
              alt="Scan to contact our Mandarin-speaking team on WeChat"
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

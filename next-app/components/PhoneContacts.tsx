import { contactInfo } from "@/lib/contact";

export default function PhoneContacts() {
  return (
    <div className="phone-contacts">
      <a href={contactInfo.englishPhoneHref}>
        <span className="phone-number">{contactInfo.englishPhone}</span>
        <span className="phone-language" lang="en">
          English
        </span>
      </a>
      <a href={contactInfo.mandarinPhoneHref}>
        <span className="phone-number">{contactInfo.mandarinPhone}</span>
        <span className="phone-language" lang="zh-Hans">
          中文
        </span>
      </a>
    </div>
  );
}

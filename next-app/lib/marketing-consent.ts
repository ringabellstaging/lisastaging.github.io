import { translator, type Locale } from "./i18n.ts";

// Version the displayed request so its wording can be preserved with consent.
export const MARKETING_CONSENT_VERSION = "2026-10-13";
export const marketingContact = {
  email: "info@oaktime.ca",
  address: "13036 McCowan Rd, Stouffville, ON L4A3Y4",
};
export function marketingConsentText(locale: Locale) {
  return translator(locale)(
    "Yes, email me occasional staging tips, project inspiration and offers from Oaktime Staging (Oak Time Inc.). I can unsubscribe at any time by emailing info@oaktime.ca.",
    "我愿意通过电子邮件，偶尔接收 Oaktime Staging（Oak Time Inc.）的布置建议、案例灵感和优惠。我可以随时发邮件至 info@oaktime.ca 退订。",
    "我願意透過電子郵件，偶爾接收 Oaktime Staging（Oak Time Inc.）的佈置建議、案例靈感和優惠。我可以隨時發郵件至 info@oaktime.ca 退訂。",
  );
}
export type MarketingPreference = {
  optedIn: boolean;
  recordedAt: string;
  version: string;
  locale: Locale;
  source: string;
  statement: string;
  contact: string;
};
export function recordMarketingPreference(
  optedIn: boolean,
  locale: Locale,
  recordedAt: number,
): MarketingPreference {
  return {
    optedIn,
    recordedAt: new Date(recordedAt).toISOString(),
    version: MARKETING_CONSENT_VERSION,
    locale,
    source:
      "Oaktime Staging website inquiry form — separate, initially unchecked checkbox",
    statement: marketingConsentText(locale),
    contact: `${marketingContact.address} · ${marketingContact.email}`,
  };
}

import { translator, languageNames, type Locale } from "./i18n.ts";

export const budgetLabels: Record<string, string> = {
  "under-2000": "Under CAD $2,000",
  "2000-4000": "CAD $2,000–$4,000",
  "4000-7000": "CAD $4,000–$7,000",
  "7000-plus": "CAD $7,000+",
  unsure: "Not sure yet",
};
export type Inquiry = {
  requestId: string;
  address: string;
  budget: string;
  email: string;
  phone: string;
  name: string;
  message: string;
  consent: true;
  locale?: Locale;
};
export function isAllowedOrigin(
  origin: string | null,
  requestUrl: string,
  requestHost: string | null,
  configuredOrigin?: string,
) {
  if (!origin) return false;
  try {
    const submitted = new URL(origin);
    const internal = new URL(requestUrl);
    if (
      !["http:", "https:"].includes(submitted.protocol) ||
      submitted.origin !== origin
    )
      return false;
    if (origin === configuredOrigin || origin === internal.origin) return true;
    // Next.js can expose its internal loopback origin behind the public Host.
    // Use the actual request Host, never an arbitrary forwarded-host header.
    return (
      submitted.host === requestHost &&
      (submitted.protocol === "https:" ||
        submitted.protocol === internal.protocol)
    );
  } catch {
    return false;
  }
}
export function validateInquiry(input: unknown): {
  data?: Inquiry;
  error?: string;
} {
  if (!input || typeof input !== "object" || Array.isArray(input))
    return { error: "Please check your form details." };
  const body = input as Record<string, unknown>;
  if (
    body.locale !== undefined &&
    body.locale !== "en" &&
    body.locale !== "zh" &&
    body.locale !== "zh-hant"
  )
    return { error: "Please check your form details." };
  const string = (key: string, max: number) =>
    typeof body[key] === "string" && (body[key] as string).length <= max
      ? (body[key] as string).trim()
      : null;
  const requestId = string("requestId", 36);
  const address = string("address", 300),
    budget = string("budget", 30),
    email = string("email", 254)?.toLowerCase(),
    phone = string("phone", 40);
  const name = string("name", 100),
    message = string("message", 2000);
  if (
    !requestId ||
    !/^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(
      requestId,
    )
  )
    return { error: "Please reload the page and try again." };
  if (body.website) return { error: "Unable to accept this inquiry." };
  if (!address || address.length < 5 || /[\r\n\x00]/.test(address))
    return { error: "Please enter your property address." };
  if (!budget || !Object.hasOwn(budgetLabels, budget))
    return { error: "Please select a staging budget." };
  if (
    !email ||
    /[,;:"()[\]\\\x00-\x1f\x7f]/.test(email) ||
    !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)
  )
    return { error: "Please enter a valid email address." };
  if (
    !phone ||
    !/^[+\d\s().\-xext]+$/i.test(phone) ||
    phone.replace(/\D/g, "").length < 7
  )
    return { error: "Please enter a valid phone number." };
  if (name === null || message === null || /[\r\n\x00]/.test(name))
    return { error: "Please check the name and notes fields." };
  if (body.consent !== true)
    return { error: "Please agree to be contacted about this inquiry." };
  return {
    data: {
      requestId,
      address,
      budget,
      email,
      phone,
      name,
      message,
      consent: true,
      ...(body.locale === "en" ||
      body.locale === "zh" ||
      body.locale === "zh-hant"
        ? { locale: body.locale }
        : {}),
    },
  };
}
export function buildEmails(data: Inquiry, from: string, teamEmail: string) {
  const reference = `OT-${data.requestId}`;
  const t = translator(data.locale ?? "en");
  return {
    team: {
      from,
      to: [teamEmail],
      reply_to: data.email,
      subject: `New staging inquiry · ${reference}`,
      text: [
        "New Oaktime Staging inquiry",
        `Reference: ${reference}`,
        "",
        `Property: ${data.address}`,
        `Budget: ${budgetLabels[data.budget]}`,
        `Name: ${data.name || "Not provided"}`,
        `Email: ${data.email}`,
        `Phone: ${data.phone}`,
        `Website language: ${languageNames[data.locale ?? "en"]}`,
        "",
        `Notes: ${data.message || "None"}`,
        "",
        "The customer agreed to be contacted about this inquiry. Reply to this email to reach them.",
      ].join("\n"),
    },
    customer: {
      from,
      to: [data.email],
      reply_to: teamEmail,
      subject: t(
        "We’ve received your staging inquiry — Oaktime Staging",
        "我们已收到您的房屋布置询价 — Oaktime Staging",
        "我們已收到您的房屋佈置詢價 — Oaktime Staging",
      ),
      text: [
        t(
          "Thank you for contacting Oaktime Staging.",
          "感谢您联系 Oaktime Staging。",
          "感謝您聯繫 Oaktime Staging。",
        ),
        "",
        t(
          "We’ve received your inquiry. A designer will review your property details and contact you as soon as possible to discuss your staging needs and provide a quote.",
          "我们已收到您的询价。设计师会查看您的房屋信息，尽快与您联系，沟通布置需求并提供报价。",
          "我們已收到您的詢價。設計師會查看您的房屋信息，儘快與您聯繫，溝通佈置需求並提供報價。",
        ),
        "",
        t(
          `Your reference: ${reference}`,
          `询价编号：${reference}`,
          `詢價編號：${reference}`,
        ),
        "",
        t("Warm regards,", "诚挚问候，", "誠摯問候，"),
        "Oaktime Staging",
        "Oak Time Inc.",
        "English: (416) 877-1878",
        "中文: (416) 939-3962",
        teamEmail,
      ].join("\n"),
    },
  };
}

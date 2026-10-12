import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import "@/app/globals.css";
import { htmlLanguage, translator, type Locale } from "@/lib/i18n";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { contactInfo } from "@/lib/contact";
import { siteUrl, isIndexable } from "@/lib/site";

const sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
});
const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-display",
  display: "swap",
});
export const getSiteMetadata = (locale: Locale): Metadata => ({
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: translator(locale)(
      "Home Staging in Toronto & the GTA | Oaktime Staging",
      "多伦多及大多地区房屋布置 | Oaktime Staging",
      "多倫多及大多地區房屋佈置 | Oaktime Staging",
    ),
    template: "%s | Oaktime Staging",
  },
  description: translator(locale)(
    "Thoughtful home staging for memorable first impressions. Explore our work across Toronto and the GTA and request a quote from Oaktime Staging.",
    "Oaktime Staging 为多伦多及大多地区提供房屋布置服务。浏览案例，联系设计师获取报价。",
    "Oaktime Staging 為多倫多及大多地區提供房屋佈置服務。瀏覽案例，聯繫設計師獲取報價。",
  ),
  icons: { icon: "/icon.svg" },
  robots: isIndexable
    ? { index: true, follow: true }
    : { index: false, follow: true },
});
const schema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Oaktime Staging",
  legalName: "Oak Time Inc.",
  ...(siteUrl ? { url: siteUrl } : {}),
  email: contactInfo.email,
  telephone: "+14168771878",
  address: {
    "@type": "PostalAddress",
    streetAddress: "13036 McCowan Rd",
    addressLocality: "Stouffville",
    addressRegion: "ON",
    postalCode: "L4A3Y4",
    addressCountry: "CA",
  },
  areaServed: ["Toronto", "Greater Toronto Area"],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+14168771878",
      availableLanguage: "English",
    },
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: "+14169393962",
      availableLanguage: "Mandarin",
    },
  ],
};
export default function SiteDocument({
  children,
  locale,
}: Readonly<{ children: React.ReactNode; locale: Locale }>) {
  const t = translator(locale);
  return (
    <html
      lang={htmlLanguage(locale)}
      className={`${sans.variable} ${serif.variable}`}
    >
      <body id="top">
        <a className="skip-link" href="#main">
          {t("Skip to content", "跳转到主要内容", "跳轉到主要內容")}
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
        <Header locale={locale} />
        {children}
        <Footer locale={locale} />
      </body>
    </html>
  );
}

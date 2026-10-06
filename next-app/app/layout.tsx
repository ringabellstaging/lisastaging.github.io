import type { Metadata } from "next";
import { DM_Sans, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
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
export const metadata: Metadata = {
  ...(siteUrl ? { metadataBase: new URL(siteUrl) } : {}),
  title: {
    default: "Home Staging in Toronto & the GTA | Oaktime Staging",
    template: "%s | Oaktime Staging",
  },
  description:
    "Thoughtful home staging for memorable first impressions. Explore our work across Toronto and the GTA and request a quote from Oaktime Staging.",
  robots: isIndexable
    ? { index: true, follow: true }
    : { index: false, follow: true },
};
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
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-CA" className={`${sans.variable} ${serif.variable}`}>
      <body id="top">
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

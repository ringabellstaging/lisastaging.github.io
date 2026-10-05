import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/components/hero.scss";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";
import { contactInfo } from "@/lib/contact";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Home Staging in Toronto & the GTA | Oaktime Staging",
    template: "%s | Oaktime Staging",
  },
  description: "Explore Oaktime Staging's home staging projects across Toronto and the GTA. Contact our Stouffville team to discuss your property and request a quote.",
};

// Domain-independent business information; add the canonical URL once a
// production domain has been selected and verified.
const businessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Oaktime Staging",
  legalName: "Oak Time Inc.",
  description: "Home staging in Toronto and the Greater Toronto Area.",
  email: contactInfo.email,
  telephone: contactInfo.englishPhoneHref.replace("tel:", ""),
  address: {
    "@type": "PostalAddress",
    streetAddress: "13036 McCowan Rd",
    addressLocality: "Stouffville",
    addressRegion: "ON",
    postalCode: "L4A3Y4",
    addressCountry: "CA",
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: contactInfo.englishPhoneHref.replace("tel:", ""),
      availableLanguage: "English",
    },
    {
      "@type": "ContactPoint",
      contactType: "customer service",
      telephone: contactInfo.mandarinPhoneHref.replace("tel:", ""),
      availableLanguage: "Mandarin",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased items-center justify-items-center min-h-screen min-screen w-full max-w-screen w-screen"`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema).replace(/</g, "\\u003c") }}
        />
        <header className="w-full border-b shadow-sm bg-white sticky top-0 z-90">
          <nav className="flex items-center justify-between px-6 py-4 max-w-screen-xl mx-auto">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/images/logo.png" alt="Oaktime Staging logo" width={32} height={32} />
              <span className="font-semibold text-lg">Oaktime Staging</span>
            </Link>
            <div className="flex items-center gap-6">
              <Link href="/about" className="hover:underline">About</Link>
              <Link href="/contact" className="hover:underline">Contact</Link>
            </div>
          </nav>
        </header>
        {children}
        <Footer/>
      </body>
    </html>
  );
}

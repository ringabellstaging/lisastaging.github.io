import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import "@/components/hero.scss";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lisa Staging",
  description: "Your GTA Staging Solution",
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
        <header className="w-full border-b shadow-sm bg-white sticky top-0 z-90">
          <nav className="flex items-center justify-between px-6 py-4 max-w-screen-xl mx-auto">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/images/logo.png" alt="Logo" width={32} height={32} />
              <span className="font-semibold text-lg">Lisa Staging</span>
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

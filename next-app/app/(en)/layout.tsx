import SiteDocument, { getSiteMetadata } from "@/components/SiteDocument";
export const metadata = getSiteMetadata("en");
export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteDocument locale="en">{children}</SiteDocument>;
}

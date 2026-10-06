import SiteDocument, { getSiteMetadata } from "@/components/SiteDocument";
export const metadata = getSiteMetadata("zh");
export default function Layout({ children }: { children: React.ReactNode }) {
  return <SiteDocument locale="zh">{children}</SiteDocument>;
}

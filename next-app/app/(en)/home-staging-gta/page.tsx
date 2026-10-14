import Content, { getMetadata } from "@/components/pages/ServiceAreasPage";
export const metadata = getMetadata("en");
export default function Page() {
  return <Content locale="en" />;
}

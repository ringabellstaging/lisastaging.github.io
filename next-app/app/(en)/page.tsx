import Content, { getMetadata } from "@/components/pages/HomePage";
export const metadata = getMetadata("en");
export default function Page() {
  return <Content locale="en" />;
}

import Content, { getMetadata } from "@/components/pages/PrivacyPage";
export const metadata = getMetadata("en");
export default function Page() {
  return <Content locale="en" />;
}

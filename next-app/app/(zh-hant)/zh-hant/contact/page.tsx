import Content, { getMetadata } from "@/components/pages/ContactPage";
export const metadata = getMetadata("zh-hant");
export default function Page() {
  return <Content locale="zh-hant" />;
}

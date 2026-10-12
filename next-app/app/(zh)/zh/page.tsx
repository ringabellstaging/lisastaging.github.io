import Content, { getMetadata } from "@/components/pages/HomePage";
export const metadata = getMetadata("zh");
export default function Page() {
  return <Content locale="zh" />;
}

import Content, { getMetadata } from "@/components/pages/FurniturePage";
export const metadata = getMetadata("zh");
export default function Page() {
  return <Content locale="zh" />;
}

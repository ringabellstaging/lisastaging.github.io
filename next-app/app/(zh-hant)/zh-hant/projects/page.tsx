import Content, { getMetadata } from "@/components/pages/ProjectsPage";
export const metadata = getMetadata("zh-hant");
export default function Page() {
  return <Content locale="zh-hant" />;
}

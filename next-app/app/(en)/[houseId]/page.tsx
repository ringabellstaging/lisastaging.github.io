import Content, { getMetadata } from "@/components/pages/ProjectPage";
import { projects } from "@/lib/projects";
export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((project) => ({ houseId: project.id }));
}
type Props = { params: Promise<{ houseId: string }> };
export async function generateMetadata(props: Props) {
  return getMetadata(props, "en");
}
export default function Page(props: Props) {
  return <Content {...props} locale="en" />;
}

import Portfolio from "@/components/Portfolio";
import { projectSummaries } from "@/lib/projects";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Our Home Staging Projects",
  "Browse Oaktime Staging projects across Toronto and the GTA. Explore our work by location and discover thoughtful furniture arrangements and styling.",
  "/projects",
);
export default function ProjectsPage() {
  return (
    <main id="main" className="wrap section">
      <div className="page-heading">
        <p className="eyebrow">THE OAKTIME PORTFOLIO</p>
        <h1>
          Every space.
          <br />
          <em>A new perspective.</em>
        </h1>
        <p>
          A collection of homes, thoughtfully brought to life. Find inspiration
          for your next chapter.
        </p>
      </div>
      <Portfolio projects={projectSummaries} />
    </main>
  );
}

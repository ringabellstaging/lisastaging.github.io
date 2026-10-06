import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProjectSummary } from "@/lib/projects";

export default function ProjectCard({ project }: { project: ProjectSummary }) {
  return (
    <article className="project-card">
      <Link
        href={`/${project.id}`}
        prefetch={false}
        aria-label={`View ${project.title}, ${project.city}`}
      >
        <div className="project-image">
          <Image
            src={project.cover.src}
            alt={project.cover.alt}
            fill
            sizes="(max-width: 600px) 92vw, (max-width: 900px) 45vw, 30vw"
            quality={75}
          />
          <span className="image-link">
            View project <ArrowUpRight size={16} />
          </span>
        </div>
        <div className="project-caption">
          <div>
            <span className="eyebrow">{project.city}</span>
            <h3>{project.title}</h3>
          </div>
          <ArrowUpRight size={22} />
        </div>
      </Link>
    </article>
  );
}

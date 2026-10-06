import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { ProjectSummary } from "@/lib/projects";
import {
  cityLabel,
  localizedPath,
  photoAlt,
  translator,
  type Locale,
} from "@/lib/i18n";

export default function ProjectCard({
  project,
  locale = "en",
}: {
  project: ProjectSummary;
  locale?: Locale;
}) {
  const t = translator(locale);
  return (
    <article className="project-card">
      <Link
        href={localizedPath(`/${project.id}`, locale)}
        prefetch={false}
        aria-label={t(
          `View ${project.title}, ${project.city}`,
          `查看 ${project.title}，${cityLabel(project.city, locale)}`,
        )}
      >
        <div className="project-image">
          <Image
            src={project.cover.src}
            alt={photoAlt(project.cover.alt, locale)}
            fill
            sizes="(max-width: 600px) 92vw, (max-width: 900px) 45vw, 30vw"
            quality={75}
          />
          <span className="image-link">
            {t("View project", "查看案例")} <ArrowUpRight size={16} />
          </span>
        </div>
        <div className="project-caption">
          <div>
            <span className="eyebrow">{cityLabel(project.city, locale)}</span>
            <h3>{project.title}</h3>
          </div>
          <ArrowUpRight size={22} />
        </div>
      </Link>
    </article>
  );
}

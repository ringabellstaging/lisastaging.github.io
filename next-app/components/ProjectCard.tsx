import Image from "next/image";
import ProjectLink from "./ProjectLink";
import { ArrowUpRight } from "lucide-react";
import type { ProjectSummary } from "@/lib/projects";
import { cityLabel, localizedPath, translator, type Locale } from "@/lib/i18n";

export default function ProjectCard({
  project,
  locale = "en",
  prefetchOnView = false,
}: {
  project: ProjectSummary;
  locale?: Locale;
  prefetchOnView?: boolean;
}) {
  const t = translator(locale);
  return (
    <article className="project-card">
      <ProjectLink
        href={localizedPath(`/${project.id}`, locale)}
        prefetchOnView={prefetchOnView}
        aria-label={t(
          `View home staging in ${project.city}`,
          `查看${cityLabel(project.city, locale)}的房屋布置案例`,
        )}
      >
        <div className="project-image">
          <Image
            src={project.cover.src}
            alt={t(
              `Home staging in ${project.city}`,
              `${cityLabel(project.city, locale)}房屋布置`,
            )}
            fill
            sizes="(max-width: 520px) calc(100vw - 40px), (max-width: 800px) calc((100vw - 60px) / 2), (max-width: 1100px) calc((100vw - 116px) / 3), (max-width: 1392px) calc((100vw - 164px) / 3), 410px"
            quality={75}
          />
          <span className="image-link">
            {t("View project", "查看案例")} <ArrowUpRight size={16} />
          </span>
        </div>
        <div className="project-caption">
          <div>
            <span className="eyebrow">{t("Home staging", "房屋布置")}</span>
            <h3>{cityLabel(project.city, locale)}</h3>
          </div>
          <ArrowUpRight size={22} />
        </div>
      </ProjectLink>
    </article>
  );
}

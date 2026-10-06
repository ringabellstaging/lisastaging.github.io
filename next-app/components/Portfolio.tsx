"use client";
import { useState } from "react";
import type { ProjectSummary } from "@/lib/projects";
import ProjectCard from "./ProjectCard";
import { cityLabel, translator, type Locale } from "@/lib/i18n";
export default function Portfolio({
  projects,
  locale = "en",
}: {
  projects: ProjectSummary[];
  locale?: Locale;
}) {
  const [city, setCity] = useState("All locations");
  const t = translator(locale);
  const filtered =
    city === "All locations"
      ? projects
      : projects.filter((project) => project.city === city);
  return (
    <>
      <div className="portfolio-filter">
        <label htmlFor="portfolio-city">
          {t("Explore by location", "按城市浏览")}{" "}
          <select
            id="portfolio-city"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          >
            <option value="All locations">
              {t("All locations", "全部城市")}
            </option>
            {[...new Set(projects.map((p) => p.city))].sort().map((name) => (
              <option key={name} value={name}>
                {cityLabel(name, locale)}
              </option>
            ))}
          </select>
        </label>
        <span aria-live="polite">
          {t(`${filtered.length} projects`, `${filtered.length} 个案例`)}
        </span>
      </div>
      <div className="projects-grid">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} locale={locale} />
        ))}
      </div>
    </>
  );
}

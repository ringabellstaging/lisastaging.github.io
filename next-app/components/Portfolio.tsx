"use client";
import { useState } from "react";
import type { ProjectSummary } from "@/lib/projects";
import ProjectCard from "./ProjectCard";
export default function Portfolio({
  projects,
}: {
  projects: ProjectSummary[];
}) {
  const [city, setCity] = useState("All locations");
  const filtered =
    city === "All locations"
      ? projects
      : projects.filter((project) => project.city === city);
  return (
    <>
      <div className="portfolio-filter">
        <label htmlFor="portfolio-city">
          Explore by location{" "}
          <select
            id="portfolio-city"
            value={city}
            onChange={(event) => setCity(event.target.value)}
          >
            <option>All locations</option>
            {[...new Set(projects.map((p) => p.city))].sort().map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </label>
        <span aria-live="polite">{filtered.length} projects</span>
      </div>
      <div className="projects-grid">
        {filtered.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </>
  );
}

"use client";
import {
  Component,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, List, MapPin, Map as MapIcon } from "lucide-react";
import type { ProjectSummary } from "@/lib/projects";

const ProjectMap = dynamic(() => import("./ProjectMap"), {
  ssr: false,
  loading: () => (
    <div className="map-placeholder">Loading the project map…</div>
  ),
});
class MapBoundary extends Component<
  { children: ReactNode },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <div className="map-placeholder">
        The map is unavailable. You can still explore every project in the list.
      </div>
    ) : (
      this.props.children
    );
  }
}
export default function ProjectExplorer({
  projects,
}: {
  projects: ProjectSummary[];
}) {
  const [city, setCity] = useState("All locations");
  const [selectedId, setSelectedId] = useState("");
  const [view, setView] = useState<"map" | "list">("map");
  const [ready, setReady] = useState(false);
  const [limit, setLimit] = useState(8);
  const root = useRef<HTMLDivElement>(null);
  const cities = [...new Set(projects.map((project) => project.city))].sort();
  const filtered = useMemo(
    () =>
      city === "All locations"
        ? projects
        : projects.filter((project) => project.city === city),
    [city, projects],
  );
  const selected =
    filtered.find((project) => project.id === selectedId) || filtered[0];
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px", threshold: 0.05 },
    );
    if (root.current) observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={root} className="project-explorer">
      <div className="explorer-toolbar">
        <label htmlFor="city-filter">
          <MapPin size={17} /> Explore by location{" "}
          <select
            id="city-filter"
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
              setLimit(8);
              setSelectedId("");
            }}
          >
            <option>All locations</option>
            {cities.map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </label>
        <span aria-live="polite">{filtered.length} projects</span>
        <div className="view-switch" aria-label="Project view">
          <button
            type="button"
            aria-pressed={view === "map"}
            onClick={() => setView("map")}
          >
            <MapIcon size={16} /> Map
          </button>
          <button
            type="button"
            aria-pressed={view === "list"}
            onClick={() => setView("list")}
          >
            <List size={16} /> List
          </button>
        </div>
      </div>
      <div className={`explorer-body view-${view}`}>
        <div className="explorer-map">
          <MapBoundary>
            {ready ? (
              <ProjectMap
                projects={filtered}
                selectedId={selectedId || undefined}
                onSelect={setSelectedId}
              />
            ) : (
              <div className="map-placeholder">
                <MapIcon size={30} />
                <span>Explore our neighbourhoods</span>
                <button
                  type="button"
                  className="text-link"
                  onClick={() => setReady(true)}
                >
                  Load interactive map <ArrowUpRight size={16} />
                </button>
              </div>
            )}
          </MapBoundary>
          {selected && (
            <Link
              className="mobile-map-card"
              href={`/${selected.id}`}
              prefetch={false}
            >
              <Image
                src={selected.cover.src}
                alt={selected.cover.alt}
                width={96}
                height={76}
                sizes="96px"
              />
              <span>
                <small>{selected.city}</small>
                <strong>{selected.title}</strong>
                <span>View project ↗</span>
              </span>
            </Link>
          )}
        </div>
        <div className="explorer-list">
          <div className="selected-project" aria-live="polite">
            {selected && (
              <>
                <span className="eyebrow">ON THE MAP · {selected.city}</span>
                <Link href={`/${selected.id}`} prefetch={false}>
                  <h3>
                    {selected.title} <ArrowUpRight size={20} />
                  </h3>
                  <p>Explore this project</p>
                </Link>
              </>
            )}
          </div>
          <div className="project-list-scroll">
            {filtered.slice(0, limit).map((project) => (
              <article
                key={project.id}
                className={
                  selected?.id === project.id
                    ? "map-list-item selected"
                    : "map-list-item"
                }
              >
                <Image
                  src={project.cover.src}
                  alt={project.cover.alt}
                  width={96}
                  height={80}
                  sizes="96px"
                  quality={65}
                />
                <div>
                  <small>{project.city}</small>
                  <Link href={`/${project.id}`} prefetch={false}>
                    {project.title} <ArrowUpRight size={13} />
                  </Link>
                  <button
                    type="button"
                    aria-label={`Show ${project.title} on map`}
                    onClick={() => {
                      setSelectedId(project.id);
                      setView("map");
                    }}
                  >
                    Show on map
                  </button>
                </div>
              </article>
            ))}
            {limit < filtered.length && (
              <button
                type="button"
                className="load-more"
                onClick={() => setLimit(limit + 8)}
              >
                Show more projects ({filtered.length - limit} more)
              </button>
            )}
          </div>
        </div>
      </div>
      <p className="map-note">
        Locations are approximate. Full property addresses are kept private.
      </p>
    </div>
  );
}

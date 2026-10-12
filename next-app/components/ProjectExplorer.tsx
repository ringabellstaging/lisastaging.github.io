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
import ProjectLink from "./ProjectLink";
import { ArrowUpRight, List, MapPin, Map as MapIcon } from "lucide-react";
import type { ProjectSummary } from "@/lib/projects";
import {
  cityLabel,
  localizedPath,
  photoAlt,
  translator,
  type Locale,
} from "@/lib/i18n";

const ProjectMap = dynamic(() => import("./ProjectMap"), {
  ssr: false,
  loading: () => (
    <div className="map-placeholder" aria-busy="true">
      <MapIcon size={30} />
    </div>
  ),
});
class MapBoundary extends Component<
  { children: ReactNode; locale: Locale },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  render() {
    return this.state.failed ? (
      <div className="map-placeholder">
        {translator(this.props.locale)(
          "The map is unavailable. You can still explore every project in the list.",
          "地图暂时不可用，您仍可通过列表浏览全部案例。",
          "地圖暫時不可用，您仍可通過列表瀏覽全部案例。",
        )}
      </div>
    ) : (
      this.props.children
    );
  }
}
export default function ProjectExplorer({
  projects,
  locale = "en",
}: {
  projects: ProjectSummary[];
  locale?: Locale;
}) {
  const [city, setCity] = useState("All locations");
  const t = translator(locale);
  const href = (path: string) => localizedPath(path, locale);
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
          <MapPin size={17} />{" "}
          {t("Explore by location", "按城市浏览", "按城市瀏覽")}{" "}
          <select
            id="city-filter"
            value={city}
            onChange={(event) => {
              setCity(event.target.value);
              setLimit(8);
              setSelectedId("");
            }}
          >
            <option value="All locations">
              {t("All locations", "全部城市", "全部城市")}
            </option>
            {cities.map((name) => (
              <option key={name} value={name}>
                {cityLabel(name, locale)}
              </option>
            ))}
          </select>
        </label>
        <span aria-live="polite">
          {t(
            `${filtered.length} projects`,
            `${filtered.length} 个案例`,
            `${filtered.length} 個案例`,
          )}
        </span>
        <div
          className="view-switch"
          aria-label={t("Project view", "案例显示方式", "案例顯示方式")}
        >
          <button
            type="button"
            aria-pressed={view === "map"}
            onClick={() => setView("map")}
          >
            <MapIcon size={16} /> {t("Map", "地图", "地圖")}
          </button>
          <button
            type="button"
            aria-pressed={view === "list"}
            onClick={() => setView("list")}
          >
            <List size={16} /> {t("List", "列表", "列表")}
          </button>
        </div>
      </div>
      <div className={`explorer-body view-${view}`}>
        <div className="explorer-map">
          <MapBoundary locale={locale}>
            {ready ? (
              <ProjectMap
                projects={filtered}
                locale={locale}
                selectedId={selectedId || undefined}
                onSelect={setSelectedId}
              />
            ) : (
              <div className="map-placeholder">
                <MapIcon size={30} />
                <span>
                  {t(
                    "Explore our neighbourhoods",
                    "探索身边的案例",
                    "探索身邊的案例",
                  )}
                </span>
                <button
                  type="button"
                  className="text-link"
                  onClick={() => setReady(true)}
                >
                  {t("Load interactive map", "加载互动地图", "加載互動地圖")}{" "}
                  <ArrowUpRight size={16} />
                </button>
              </div>
            )}
          </MapBoundary>
          {selected && (
            <ProjectLink
              className="mobile-map-card"
              href={href(`/${selected.id}`)}
              prefetchOnView
            >
              <Image
                src={selected.cover.src}
                alt={photoAlt(selected.cover.alt, locale)}
                width={96}
                height={76}
                sizes="96px"
                quality={65}
              />
              <span>
                <small>{cityLabel(selected.city, locale)}</small>
                <strong>{selected.title}</strong>
                <span>{t("View project ↗", "查看案例 ↗", "查看案例 ↗")}</span>
              </span>
            </ProjectLink>
          )}
        </div>
        <div className="explorer-list">
          <div className="selected-project" aria-live="polite">
            {selected && (
              <>
                <span className="eyebrow">
                  {t("ON THE MAP", "地图中的案例", "地圖中的案例")} ·{" "}
                  {cityLabel(selected.city, locale)}
                </span>
                <ProjectLink href={href(`/${selected.id}`)} prefetchOnView>
                  <h3>
                    {selected.title} <ArrowUpRight size={20} />
                  </h3>
                  <p>
                    {t("Explore this project", "了解这个案例", "瞭解這個案例")}
                  </p>
                </ProjectLink>
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
                  alt={photoAlt(project.cover.alt, locale)}
                  width={96}
                  height={80}
                  sizes="96px"
                  quality={65}
                />
                <div>
                  <small>{cityLabel(project.city, locale)}</small>
                  <ProjectLink href={href(`/${project.id}`)}>
                    {project.title} <ArrowUpRight size={13} />
                  </ProjectLink>
                  <button
                    type="button"
                    aria-label={t(
                      `Show ${project.title} on map`,
                      `在地图上显示 ${project.title}`,
                      `在地圖上顯示 ${project.title}`,
                    )}
                    onClick={() => {
                      setSelectedId(project.id);
                      setView("map");
                    }}
                  >
                    {t("Show on map", "在地图上查看", "在地圖上查看")}
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
                {t(
                  `Show more projects (${filtered.length - limit} more)`,
                  `查看更多案例（还有 ${filtered.length - limit} 个）`,
                  `查看更多案例（還有 ${filtered.length - limit} 個）`,
                )}
              </button>
            )}
          </div>
        </div>
      </div>
      <p className="map-note">
        {t(
          "Locations are approximate. Full property addresses are kept private.",
          "地图仅展示大致位置，完整房屋地址不公开。",
          "地圖僅展示大致位置，完整房屋地址不公開。",
        )}
      </p>
    </div>
  );
}

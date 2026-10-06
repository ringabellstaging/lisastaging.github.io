"use client";
import { useEffect, useMemo, useState } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { ProjectSummary } from "@/lib/projects";
import { localizedPath, translator, type Locale } from "@/lib/i18n";

function MapViewport({
  projects,
  selectedId,
  locale,
}: {
  projects: ProjectSummary[];
  selectedId?: string;
  locale: Locale;
}) {
  const map = useMap();
  useEffect(() => {
    const t = translator(locale);
    for (const [selector, label] of [
      [".leaflet-control-zoom-in", t("Zoom in", "放大地图")],
      [".leaflet-control-zoom-out", t("Zoom out", "缩小地图")],
    ] as const) {
      map
        .getContainer()
        .querySelector(selector)
        ?.setAttribute("aria-label", label);
      map.getContainer().querySelector(selector)?.setAttribute("title", label);
    }
  }, [map, locale]);
  useEffect(() => {
    if (projects.length)
      map.fitBounds(
        L.latLngBounds(projects.map((p) => [p.latitude, p.longitude])),
        { padding: [45, 45], maxZoom: 12, animate: false },
      );
  }, [map, projects]);
  useEffect(() => {
    const selected = projects.find((p) => p.id === selectedId);
    if (selected)
      map.panTo([selected.latitude, selected.longitude], {
        animate: !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
      });
  }, [map, projects, selectedId]);
  useEffect(() => {
    const observer = new ResizeObserver(() => map.invalidateSize());
    observer.observe(map.getContainer());
    return () => observer.disconnect();
  }, [map]);
  return null;
}
export default function ProjectMap({
  projects,
  selectedId,
  onSelect,
  locale = "en",
}: {
  projects: ProjectSummary[];
  selectedId?: string;
  onSelect: (id: string) => void;
  locale?: Locale;
}) {
  const [tileError, setTileError] = useState(false);
  const t = translator(locale);
  const markerLabel = (group: ProjectSummary[]) =>
    t(
      `Explore ${group.length} staging project${group.length > 1 ? "s" : ""} near ${group[0].street}`,
      `查看 ${group[0].street} 附近的 ${group.length} 个布置案例`,
    );
  const groups = useMemo(() => {
    const grouped = new Map<string, ProjectSummary[]>();
    for (const project of projects) {
      const key = `${project.latitude},${project.longitude}`;
      grouped.set(key, [...(grouped.get(key) || []), project]);
    }
    return [...grouped.values()];
  }, [projects]);
  return (
    <>
      <MapContainer
        center={[43.9, -79.4]}
        zoom={9}
        scrollWheelZoom={false}
        className="leaflet-project-map"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          maxZoom={17}
          eventHandlers={{
            tileerror: () => setTileError(true),
            tileload: () => setTileError(false),
          }}
        />
        <MapViewport
          projects={projects}
          selectedId={selectedId}
          locale={locale}
        />
        {groups.map((group) => (
          <Marker
            key={`${group[0].latitude},${group[0].longitude}`}
            position={[group[0].latitude, group[0].longitude]}
            title={markerLabel(group)}
            icon={L.divIcon({
              className: "oaktime-marker",
              html: `<span aria-hidden="true" class="${group.some((p) => p.id === selectedId) ? "active" : ""}">${group.length > 1 ? group.length : "•"}</span>`,
              iconSize: [30, 30],
              iconAnchor: [15, 15],
            })}
            eventHandlers={{
              click: () => onSelect(group[0].id),
              add: (event) => {
                const marker = event.target as L.Marker;
                marker
                  .getElement()
                  ?.setAttribute("aria-label", markerLabel(group));
              },
            }}
          >
            <Popup>
              <div className="project-popup">
                <small>{t("STAGED BY OAKTIME", "OAKTIME 布置案例")}</small>
                {group.map((project) => (
                  <div key={project.id}>
                    <button type="button" onClick={() => onSelect(project.id)}>
                      {project.title}
                    </button>
                    <a href={localizedPath(`/${project.id}`, locale)}>
                      {t("View project ↗", "查看案例 ↗")}
                    </a>
                  </div>
                ))}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {tileError && (
        <p role="status" className="map-error">
          {t(
            "Map tiles are unavailable. Browse the project list to explore our work.",
            "地图暂时无法加载，请通过案例列表浏览我们的作品。",
          )}
        </p>
      )}
    </>
  );
}

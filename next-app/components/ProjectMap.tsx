"use client";
import { useEffect, useMemo, useState } from "react";
import L from "leaflet";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import type { ProjectSummary } from "@/lib/projects";

function MapViewport({
  projects,
  selectedId,
}: {
  projects: ProjectSummary[];
  selectedId?: string;
}) {
  const map = useMap();
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
}: {
  projects: ProjectSummary[];
  selectedId?: string;
  onSelect: (id: string) => void;
}) {
  const [tileError, setTileError] = useState(false);
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
        <MapViewport projects={projects} selectedId={selectedId} />
        {groups.map((group) => (
          <Marker
            key={`${group[0].latitude},${group[0].longitude}`}
            position={[group[0].latitude, group[0].longitude]}
            title={`${group.length} staging project${group.length > 1 ? "s" : ""} near ${group[0].street}`}
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
                  ?.setAttribute(
                    "aria-label",
                    `Explore ${group.length} staging project${group.length > 1 ? "s" : ""} near ${group[0].street}`,
                  );
              },
            }}
          >
            <Popup>
              <div className="project-popup">
                <small>STAGED BY OAKTIME</small>
                {group.map((project) => (
                  <div key={project.id}>
                    <button type="button" onClick={() => onSelect(project.id)}>
                      {project.title}
                    </button>
                    <a href={`/${project.id}`}>View project ↗</a>
                  </div>
                ))}
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
      {tileError && (
        <p role="status" className="map-error">
          Map tiles are unavailable. Browse the project list to explore our
          work.
        </p>
      )}
    </>
  );
}

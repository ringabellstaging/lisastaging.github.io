import data from "@/data/projects.json";

export type ProjectImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};
export type Project = {
  id: string;
  city: string;
  street: string;
  title: string;
  description: string;
  latitude: number;
  longitude: number;
  featured: boolean;
  cover: ProjectImage;
  images: ProjectImage[];
};
export type ProjectSummary = Omit<Project, "images">;
export const projects: Project[] = data;
export const projectSummaries: ProjectSummary[] = projects.map((project) => ({
  id: project.id,
  city: project.city,
  street: project.street,
  title: project.title,
  description: project.description,
  latitude: project.latitude,
  longitude: project.longitude,
  featured: project.featured,
  cover: project.cover,
}));
export const featuredProjects = projectSummaries
  .filter((project) => project.featured)
  .slice(0, 6);
export function getProject(id: string) {
  return projects.find((project) => project.id === id);
}

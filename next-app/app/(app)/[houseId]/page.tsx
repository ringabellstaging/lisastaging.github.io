import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import ProjectGallery from "@/components/ProjectGallery";
import { getProject, projects } from "@/lib/projects";
import { pageMetadata, siteUrl } from "@/lib/site";

export const dynamicParams = false;
export function generateStaticParams() {
  return projects.map((project) => ({ houseId: project.id }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ houseId: string }>;
}) {
  const project = getProject((await params).houseId);
  if (!project) return {};
  return pageMetadata(
    `${project.title} — ${project.city} Home Staging`,
    project.description,
    `/${project.id}`,
    project.cover.src,
  );
}
export default async function ProjectPage({
  params,
}: {
  params: Promise<{ houseId: string }>;
}) {
  const project = getProject((await params).houseId);
  if (!project) notFound();
  const images = [
    project.cover,
    ...project.images.filter((image) => image.src !== project.cover.src),
  ];
  const breadcrumb = siteUrl
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
          {
            "@type": "ListItem",
            position: 2,
            name: "Our work",
            item: `${siteUrl}/projects`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: `${siteUrl}/${project.id}`,
          },
        ],
      }
    : null;
  return (
    <main id="main" className="section wrap">
      {breadcrumb && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(breadcrumb).replace(/</g, "\\u003c"),
          }}
        />
      )}
      <nav aria-label="Breadcrumb" className="breadcrumbs">
        <Link href="/">Home</Link>
        <span>/</span>
        <Link href="/projects">Our work</Link>
        <span>/</span>
        <span>{project.title}</span>
      </nav>
      <div className="project-heading">
        <div>
          <p className="eyebrow">{project.city} · HOME STAGING</p>
          <h1>{project.title}</h1>
        </div>
        <p>{project.description}</p>
      </div>
      <ProjectGallery images={images} title={project.title} />
      <p className="map-note">
        Street name shown for reference. Full property address kept private.
      </p>
      <div className="project-cta">
        <div>
          <h2>
            Imagine the possibilities <em>for your home.</em>
          </h2>
          <p>Let’s talk about the right approach for your space.</p>
        </div>
        <Link href="/#inquiry" className="button button-dark">
          Request a quote <ArrowUpRight size={18} />
        </Link>
      </div>
    </main>
  );
}

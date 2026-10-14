import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowUpRight } from "lucide-react";
import ProjectGallery from "@/components/ProjectGallery";
import { getProject } from "@/lib/projects";
import { pageMetadata, siteUrl } from "@/lib/site";
import { cityLabel, localizedPath, translator, type Locale } from "@/lib/i18n";
import { pageText, projectDescription } from "@/lib/page-copy";
import { gtaPath, serviceAreaForCity } from "@/lib/service-areas";

export async function getMetadata(
  {
    params,
  }: {
    params: Promise<{ houseId: string }>;
  },
  locale: Locale = "en",
) {
  const project = getProject((await params).houseId);
  if (!project) return {};
  return pageMetadata(
    locale !== "en"
      ? `${project.title} — ${cityLabel(project.city, locale)}房屋布置`
      : `${project.title} — ${project.city} Home Staging`,
    projectDescription(project, locale),
    localizedPath(`/${project.id}`, locale),
    project.cover.src,
    locale,
  );
}
export default async function ProjectPage({
  params,
  locale = "en",
}: {
  params: Promise<{ houseId: string }>;
  locale?: Locale;
}) {
  const t = (text: string) => pageText(locale, text);
  const href = (path: string) => localizedPath(path, locale);
  const project = getProject((await params).houseId);
  if (!project) notFound();
  const area = serviceAreaForCity(project.city);
  const images = [
    project.cover,
    ...project.images.filter((image) => image.src !== project.cover.src),
  ];
  const breadcrumb = siteUrl
    ? {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: t("Home"),
            item: `${siteUrl}${href("/")}`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: t("Our work"),
            item: `${siteUrl}${href("/projects")}`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: project.title,
            item: `${siteUrl}${href(`/${project.id}`)}`,
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
      <nav
        aria-label={translator(locale)("Breadcrumb", "页面位置", "頁面位置")}
        className="breadcrumbs"
      >
        <Link href={href("/")}>{t("Home")}</Link>
        <span>/</span>
        <Link href={href("/projects")}>{t("Our work")}</Link>
        <span>/</span>
        <span>{project.title}</span>
      </nav>
      <div className="project-heading">
        <div>
          <p className="eyebrow">
            {cityLabel(project.city, locale)} · {t("HOME STAGING")}
          </p>
          <h1>{project.title}</h1>
        </div>
        <p>{projectDescription(project, locale)}</p>
      </div>
      <ProjectGallery images={images} title={project.title} locale={locale} />
      <p className="map-note">
        {t(
          "Street name shown for reference. Full property address kept private.",
        )}
      </p>
      <Link
        href={href(`${gtaPath}${area ? `#${area.id}` : ""}`)}
        className="text-link"
      >
        {translator(locale)(
          "Explore home staging services across the GTA",
          "了解大多地区房屋布置服务",
          "瞭解大多地區房屋佈置服務",
        )}
        <ArrowUpRight size={17} />
      </Link>
      <div className="project-cta">
        <div>
          <h2>
            {t("Imagine the possibilities")}
            {locale === "en" ? " " : null}
            <em>{t("for your home.")}</em>
          </h2>
          <p>{t("Let’s talk about the right approach for your space.")}</p>
        </div>
        <Link href={href("/#inquiry")} className="button button-dark">
          {t("Request a quote")}
          <ArrowUpRight size={18} />
        </Link>
      </div>
    </main>
  );
}

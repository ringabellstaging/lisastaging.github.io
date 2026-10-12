import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, MoveRight } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import ProjectExplorer from "@/components/ProjectExplorer";
import InquirySection from "@/components/InquirySection";
import Reviews from "@/components/Reviews";
import { featuredProjects, projectSummaries } from "@/lib/projects";
import { localizedMetadata } from "@/lib/site";
import { localizedPath, type Locale } from "@/lib/i18n";
import { pageText } from "@/lib/page-copy";

export const getMetadata = (locale: Locale) =>
  localizedMetadata(
    locale,
    "Home Staging in Toronto & the GTA",
    "Thoughtful home staging for memorable first impressions. Explore our projects across Toronto and the GTA and request a quote.",
    "/",
    "/images/house38/img1.jpg",
  );
const services = [
  {
    number: "01",
    title: "Home staging",
    text: "Furniture, texture and finishing touches, brought together to help buyers see the possibilities in your home.",
  },
  {
    number: "02",
    title: "Property styling",
    text: "A fresh perspective on your space. We work with its character to create a welcoming, considered first impression.",
  },
  {
    number: "03",
    title: "Design & logistics",
    text: "From the furniture plan to placement, our team brings the details together so you can focus on your next chapter.",
  },
];
export default function HomePage({ locale = "en" }: { locale?: Locale }) {
  const t = (text: string) => pageText(locale, text);
  const href = (path: string) => localizedPath(path, locale);
  return (
    <main id="main">
      <section className="hero-section" aria-labelledby="hero-heading">
        <Image
          src="/images/house38/img1.jpg"
          alt={t(
            "Oaktime-staged living room with soft seating, natural light and a stone fireplace",
          )}
          fill
          priority
          sizes="100vw"
          quality={75}
        />
        <div className="hero-shade" />
        <div className="hero-content wrap">
          <p className="eyebrow">{t("HOME STAGING · TORONTO & THE GTA")}</p>
          <h1 id="hero-heading">
            {t("Thoughtful spaces.")}
            <br />
            <em>{t("Lasting impressions.")}</em>
          </h1>
          <p>
            {t("Helping buyers feel at home,")}
            <br />
            {t("before they even move in.")}
          </p>
          <div className="hero-actions">
            <Link href="#inquiry" className="button button-cream">
              {t("Request a quote")}
              <ArrowUpRight size={17} />
            </Link>
            <Link href="#selected-work" className="hero-work">
              {t("Explore our work")}
              <ArrowDown size={16} />
            </Link>
          </div>
        </div>
        <Link href={href("/house38")} className="hero-credit">
          {t("THE ARDMORE ROAD PROJECT")}
          <ArrowUpRight size={14} />
        </Link>
      </section>
      <div className="intro-strip wrap">
        <span>{t("Considered design. Beautifully presented.")}</span>
        <span>{t("Based in Stouffville · Serving the GTA")}</span>
      </div>
      <section id="services" className="section wrap services-section">
        <div className="section-heading">
          <p className="eyebrow">{t("THE OAKTIME APPROACH")}</p>
          <h2>
            {t("Every home has a story.")}
            <br />
            <em>{t("Let’s bring yours to life.")}</em>
          </h2>
          <p className="section-description">
            {t(
              "We create spaces that feel warm, effortless and ready for their next chapter. Through thoughtful staging, we help your property make an impression that stays.",
            )}
          </p>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <article key={service.number}>
              <span className="index-number">{service.number}</span>
              <h3>{t(service.title)}</h3>
              <p>{t(service.text)}</p>
            </article>
          ))}
        </div>
      </section>
      <section id="selected-work" className="section work-section">
        <div className="wrap">
          <div className="section-top">
            <div>
              <p className="eyebrow">{t("SELECTED WORK")}</p>
              <h2>
                {t("Spaces to")}
                {locale === "en" ? " " : null}
                <em>{t("fall for.")}</em>
              </h2>
            </div>
            <Link href={href("/projects")} className="text-link">
              {t("View all projects")}
              <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="projects-grid">
            {featuredProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                locale={locale}
                prefetchOnView
              />
            ))}
          </div>
        </div>
      </section>
      <section id="project-map" className="section wrap map-section">
        <div className="section-top">
          <div>
            <p className="eyebrow">{t("IN YOUR NEIGHBOURHOOD")}</p>
            <h2>
              {t("A little closer")}
              {locale === "en" ? " " : null}
              <em>{t("to home.")}</em>
            </h2>
          </div>
          <p className="section-description">
            {t(
              "Explore our staging projects across the GTA and beyond. Find a space near you.",
            )}
          </p>
        </div>
        <ProjectExplorer projects={projectSummaries} locale={locale} />
      </section>
      <section id="process" className="process-section section">
        <div className="wrap">
          <div className="section-top">
            <div>
              <p className="eyebrow">{t("FROM FIRST HELLO TO FINAL TOUCH")}</p>
              <h2>{t("Beautifully simple.")}</h2>
            </div>
            <p className="section-description">
              {t(
                "A personal approach, with thoughtful attention at every step.",
              )}
            </p>
          </div>
          <div className="process-grid">
            {[
              {
                title: "Tell us about your home",
                text: "Share your property address, budget and plans. We’ll get to know your space and what you need.",
              },
              {
                title: "Make a plan together",
                text: "A designer reviews your inquiry and follows up to discuss the right approach and prepare a quote.",
              },
              {
                title: "Bring the space to life",
                text: "Once the plan is agreed, we coordinate the furniture, styling and finishing details.",
              },
            ].map((step, i) => (
              <article key={t(step.title)}>
                <span className="process-number">0{i + 1}</span>
                <h3>{t(step.title)}</h3>
                <p>{t(step.text)}</p>
              </article>
            ))}
          </div>
          <Link href="#inquiry" className="text-link">
            {t("Let’s start with your home")}
            <MoveRight size={19} />
          </Link>
        </div>
      </section>
      <Reviews locale={locale} />
      <section className="section wrap faq-section">
        <div>
          <p className="eyebrow">{t("A FEW THINGS TO KNOW")}</p>
          <h2>
            {t("Before we")}
            {locale === "en" ? " " : null}
            <em>{t("begin.")}</em>
          </h2>
        </div>
        <div>
          {[
            {
              q: "Which areas do you serve?",
              a: "We are based in Stouffville and serve Toronto and the Greater Toronto Area. Share your property address and we’ll confirm availability for your location.",
            },
            {
              q: "How much does home staging cost?",
              a: "Every property is different. Your quote depends on the space, the furnishings required and the scope of work. Send us your address and budget to start the conversation.",
            },
            {
              q: "What happens after I request a quote?",
              a: "We’ll acknowledge your inquiry by email. A designer will review your details and get in touch to discuss your needs and prepare a quote.",
            },
            {
              q: "Can I speak with the team in Chinese?",
              a: "Yes. You can call our Mandarin line at 416-939-3962. For English, call (416) 877-1878.",
            },
          ].map((item) => (
            <details key={t(item.q)}>
              <summary>
                {t(item.q)}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{t(item.a)}</p>
            </details>
          ))}
        </div>
      </section>
      <InquirySection locale={locale} />
    </main>
  );
}

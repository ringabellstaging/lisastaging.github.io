import Image from "next/image";
import Link from "next/link";
import { ArrowDown, ArrowUpRight, MoveRight } from "lucide-react";
import ProjectCard from "@/components/ProjectCard";
import ProjectExplorer from "@/components/ProjectExplorer";
import InquirySection from "@/components/InquirySection";
import Reviews from "@/components/Reviews";
import { featuredProjects, projectSummaries } from "@/lib/projects";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
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
export default function Home() {
  return (
    <main id="main">
      <section className="hero-section" aria-labelledby="hero-heading">
        <Image
          src="/images/house38/img1.jpg"
          alt="Oaktime-staged living room with soft seating, natural light and a stone fireplace"
          fill
          priority
          sizes="100vw"
          quality={85}
        />
        <div className="hero-shade" />
        <div className="hero-content wrap">
          <p className="eyebrow">HOME STAGING · TORONTO & THE GTA</p>
          <h1 id="hero-heading">
            Thoughtful spaces.
            <br />
            <em>Lasting impressions.</em>
          </h1>
          <p>
            Helping buyers feel at home,
            <br />
            before they even move in.
          </p>
          <div className="hero-actions">
            <Link href="#inquiry" className="button button-cream">
              Request a quote <ArrowUpRight size={17} />
            </Link>
            <Link href="#selected-work" className="hero-work">
              Explore our work <ArrowDown size={16} />
            </Link>
          </div>
        </div>
        <Link href="/house38" className="hero-credit">
          THE ARDMORE ROAD PROJECT <ArrowUpRight size={14} />
        </Link>
      </section>
      <div className="intro-strip wrap">
        <span>Considered design. Beautifully presented.</span>
        <span>Based in Stouffville · Serving the GTA</span>
      </div>
      <section id="services" className="section wrap services-section">
        <div className="section-heading">
          <p className="eyebrow">THE OAKTIME APPROACH</p>
          <h2>
            Every home has a story.
            <br />
            <em>Let’s bring yours to life.</em>
          </h2>
          <p className="section-description">
            We create spaces that feel warm, effortless and ready for their next
            chapter. Through thoughtful staging, we help your property make an
            impression that stays.
          </p>
        </div>
        <div className="services-grid">
          {services.map((service) => (
            <article key={service.number}>
              <span className="index-number">{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
      </section>
      <section id="selected-work" className="section work-section">
        <div className="wrap">
          <div className="section-top">
            <div>
              <p className="eyebrow">SELECTED WORK</p>
              <h2>
                Spaces to <em>fall for.</em>
              </h2>
            </div>
            <Link href="/projects" className="text-link">
              View all projects <ArrowUpRight size={17} />
            </Link>
          </div>
          <div className="projects-grid">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        </div>
      </section>
      <section id="project-map" className="section wrap map-section">
        <div className="section-top">
          <div>
            <p className="eyebrow">IN YOUR NEIGHBOURHOOD</p>
            <h2>
              A little closer <em>to home.</em>
            </h2>
          </div>
          <p className="section-description">
            Explore our staging projects across the GTA and beyond. Find a space
            near you.
          </p>
        </div>
        <ProjectExplorer projects={projectSummaries} />
      </section>
      <section id="process" className="process-section section">
        <div className="wrap">
          <div className="section-top">
            <div>
              <p className="eyebrow">FROM FIRST HELLO TO FINAL TOUCH</p>
              <h2>Beautifully simple.</h2>
            </div>
            <p className="section-description">
              A personal approach, with thoughtful attention at every step.
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
              <article key={step.title}>
                <span className="process-number">0{i + 1}</span>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </article>
            ))}
          </div>
          <Link href="#inquiry" className="text-link">
            Let’s start with your home <MoveRight size={19} />
          </Link>
        </div>
      </section>
      <Reviews />
      <section className="section wrap faq-section">
        <div>
          <p className="eyebrow">A FEW THINGS TO KNOW</p>
          <h2>
            Before we <em>begin.</em>
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
            <details key={item.q}>
              <summary>
                {item.q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{item.a}</p>
            </details>
          ))}
        </div>
      </section>
      <InquirySection />
    </main>
  );
}

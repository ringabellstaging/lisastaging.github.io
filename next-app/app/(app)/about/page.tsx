import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "About Our Home Staging Team",
  "Meet Oaktime Staging, a Stouffville-based team bringing thoughtful property styling, furniture placement and staging to homes across Toronto and the GTA.",
  "/about",
);
export default function AboutPage() {
  return (
    <main id="main" className="section wrap">
      <div className="about-grid">
        <div className="about-image">
          <Image
            src="/images/house36/img1.jpg"
            alt="A bright open-plan home staged by the Oaktime team"
            fill
            sizes="(max-width: 520px) 92vw, 45vw"
            priority
          />
        </div>
        <div className="about-copy">
          <p className="eyebrow">THE PEOPLE BEHIND THE SPACES</p>
          <h1>
            A thoughtful eye.
            <br />
            <em>A personal touch.</em>
          </h1>
          <p>
            At Oaktime Staging, we believe a well-presented home helps people
            imagine what comes next. We bring furniture, texture and thoughtful
            details together to make each space feel welcoming.
          </p>
          <p>
            Based in Stouffville, our team works with homeowners and real estate
            professionals across Toronto and the GTA. From the first
            conversation to furniture placement and the finishing touches, we
            take a considered approach to every home.
          </p>
          <p>
            Oaktime Staging is operated by Oak Time Inc. Our team can help you
            in English and Mandarin.
          </p>
          <Link href="/#inquiry" className="button button-dark">
            Tell us about your home <ArrowUpRight size={17} />
          </Link>
        </div>
      </div>
    </main>
  );
}

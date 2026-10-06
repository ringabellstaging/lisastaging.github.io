import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { contactInfo } from "@/lib/contact";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap footer-main">
        <div>
          <Link href="/" className="wordmark">
            oaktime<span>STAGING & STYLING</span>
          </Link>
          <p>
            Thoughtful spaces.
            <br />
            Memorable first impressions.
          </p>
        </div>
        <div>
          <p className="eyebrow">Explore</p>
          <Link href="/#services">Our services</Link>
          <Link href="/projects">Our work</Link>
          <Link href="/about">Our story</Link>
          <Link href="/contact">
            Get in touch <ArrowUpRight size={13} />
          </Link>
        </div>
        <div>
          <p className="eyebrow">Let’s talk</p>
          <a href={contactInfo.englishPhoneHref}>
            {contactInfo.englishPhone} <small>English</small>
          </a>
          <a href={contactInfo.mandarinPhoneHref}>
            {contactInfo.mandarinPhone} <small>中文</small>
          </a>
          <a href={`mailto:${contactInfo.email}`}>{contactInfo.email}</a>
        </div>
        <div>
          <p className="eyebrow">Based in Stouffville</p>
          <address>{contactInfo.address}</address>
          <p>Serving Toronto & the GTA</p>
        </div>
      </div>
      <div className="wrap footer-bottom">
        <span>
          © {new Date().getFullYear()} Oaktime Staging · Oak Time Inc.
        </span>
        <Link href="/privacy">Privacy</Link>
        <a href="#top">Back to top ↑</a>
      </div>
    </footer>
  );
}

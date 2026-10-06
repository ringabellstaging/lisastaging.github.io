"use client";
import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="header-inner wrap">
        <Link
          href="/"
          className="wordmark"
          aria-label="Oaktime Staging home"
          onClick={() => setOpen(false)}
        >
          oaktime<span>STAGING & STYLING</span>
        </Link>
        <button
          className="menu-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="main-navigation"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
        <nav
          id="main-navigation"
          aria-label="Main navigation"
          className={open ? "navigation is-open" : "navigation"}
          onClick={() => setOpen(false)}
        >
          <Link href="/#services">Our services</Link>
          <Link href="/projects">Our work</Link>
          <Link href="/#project-map">Project map</Link>
          <Link href="/about">About us</Link>
          <Link href="/#inquiry" className="button button-dark nav-quote">
            Request a quote <ArrowUpRight size={16} />
          </Link>
        </nav>
      </div>
    </header>
  );
}

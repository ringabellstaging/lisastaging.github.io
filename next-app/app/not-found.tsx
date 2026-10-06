import Link from "next/link";
export default function NotFound() {
  return (
    <main id="main" className="section wrap">
      <div className="page-heading">
        <p className="eyebrow">404 · PAGE NOT FOUND</p>
        <h1>
          A different <em>direction.</em>
        </h1>
        <p>
          This project or page is no longer available. You can explore our
          current portfolio or get in touch about your home.
        </p>
      </div>
      <Link href="/projects" className="button button-dark">
        Explore our work ↗
      </Link>
    </main>
  );
}

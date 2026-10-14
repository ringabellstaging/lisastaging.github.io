// Read-only checks against a production build; no HTTP calls or email delivery.
// Run after building with SITE_URL=https://www.oaktime.ca and VERCEL_ENV=production.
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const built = resolve(root, ".next/server/app");
const origin = "https://www.oaktime.ca";
const sitemap = await readFile(resolve(built, "sitemap.xml.body"), "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map(
  (match) => match[1],
);
assert.ok(urls.length > 200, "Build must have an indexable production sitemap");
assert.equal(new Set(urls).size, urls.length, "Duplicate sitemap URLs");
const pages = new Map();
for (const url of urls) {
  assert.equal(new URL(url).origin, origin, `Unexpected origin: ${url}`);
  const pathname = new URL(url).pathname;
  const html = await readFile(
    resolve(built, `${pathname === "/" ? "index" : pathname.slice(1)}.html`),
    "utf8",
  );
  pages.set(pathname, html);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  assert.equal(canonical && new URL(canonical).href, url, `Canonical: ${url}`);
  assert.ok(
    html.includes('<meta name="robots" content="index, follow"'),
    `Robots: ${url}`,
  );
  assert.equal([...html.matchAll(/<h1(?:\s|>)/g)].length, 1, `One H1: ${url}`);
  assert.match(html, /<title>[^<]+Oaktime Staging<\/title>/, `Title: ${url}`);
  assert.match(
    html,
    /<meta name="description" content="[^"]+"/,
    `Description: ${url}`,
  );
  const base = pathname.replace(/^\/(zh-hant|zh)(?=\/|$)/, "") || "/";
  for (const [prefix, lang] of [
    ["", "en-CA"],
    ["/zh", "zh-Hans"],
    ["/zh-hant", "zh-Hant"],
  ]) {
    const alternate = origin + prefix + (base === "/" && prefix ? "" : base);
    const tag = [...html.matchAll(/hrefLang="([^"]+)" href="([^"]+)"/g)].find(
      (match) => match[1] === lang,
    );
    assert.equal(
      tag && new URL(tag[2]).href,
      new URL(alternate).href,
      `Hreflang ${lang}: ${url}`,
    );
  }
  for (const match of html.matchAll(
    /<script type="application\/ld\+json">(.*?)<\/script>/g,
  )) {
    JSON.parse(match[1]);
  }
}
for (const prefix of ["", "/zh", "/zh-hant"]) {
  const html = pages.get(`${prefix}/home-staging-gta`);
  assert.ok(html, `Missing service area route: ${prefix}`);
  assert.ok(html.includes('"@type":"Service"'), "Missing Service entity");
  assert.ok(html.includes('"@type":"BreadcrumbList"'), "Missing breadcrumbs");
  for (const match of html.matchAll(/href="([^"]*\/house\d+)"/g)) {
    assert.ok(pages.has(match[1]), `Broken project link: ${match[1]}`);
    assert.ok(
      match[1].startsWith(`${prefix}/house`),
      "Project link changes language",
    );
  }
  for (const match of html.matchAll(/<img\s[^>]+>/g)) {
    assert.ok(
      match[0].includes('loading="lazy"'),
      "Region photos must load lazily",
    );
  }
  for (const region of [
    "toronto",
    "york-region",
    "peel-region",
    "durham-region",
    "halton-region",
  ]) {
    assert.ok(html.includes(`id="${region}"`), `Missing region: ${region}`);
  }
}
assert.ok(
  (await readFile(resolve(built, "robots.txt.body"), "utf8")).includes(
    `Sitemap: ${origin}/sitemap.xml`,
  ),
);
assert.equal(
  (
    await readFile(resolve(root, "public/google06bc8259bbb1d8f0.html"), "utf8")
  ).trim(),
  "google-site-verification: google06bc8259bbb1d8f0.html",
);
console.log(
  `SEO build checks passed for ${urls.length} canonical URLs, three languages, region links, schema and lazy images.`,
);

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
assert.equal(
  urls.length,
  21,
  "Only the seven main pages in three languages belong in the sitemap",
);
assert.equal(new Set(urls).size, urls.length, "Duplicate sitemap URLs");
const pages = new Map();
const projects = JSON.parse(
  await readFile(resolve(root, "data/projects.json"), "utf8"),
);
const { headers: headerRules } = JSON.parse(
  await readFile(resolve(root, ".next/routes-manifest.json"), "utf8"),
);
const hasNoindexHeader = (pathname) =>
  headerRules.some(
    (rule) =>
      new RegExp(rule.regex).test(pathname) &&
      rule.headers.some(
        (header) =>
          header.key.toLowerCase() === "x-robots-tag" &&
          /\bnoindex\b/i.test(header.value),
      ),
  );
async function checkPage(url, indexable) {
  assert.equal(new URL(url).origin, origin, `Unexpected origin: ${url}`);
  const pathname = new URL(url).pathname;
  const html = await readFile(
    resolve(built, `${pathname === "/" ? "index" : pathname.slice(1)}.html`),
    "utf8",
  );
  pages.set(pathname, html);
  assert.ok(
    !html.includes("lisa4169393962"),
    `Only the WeChat QR should be published: ${url}`,
  );
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)?.[1];
  assert.equal(canonical && new URL(canonical).href, url, `Canonical: ${url}`);
  assert.ok(
    html.includes(
      `<meta name="robots" content="${indexable ? "index" : "noindex"}, follow"`,
    ),
    `Robots: ${url}`,
  );
  assert.equal(
    hasNoindexHeader(pathname),
    !indexable,
    `HTTP indexing rule: ${url}`,
  );
  if (!indexable) {
    assert.ok(
      html.includes('<meta name="googlebot" content="noindex, follow"'),
      `Googlebot must not inherit index from the layout: ${url}`,
    );
    assert.ok(!urls.includes(url), `Internal project in sitemap: ${url}`);
  }
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
for (const url of urls) await checkPage(url, true);
for (const prefix of ["", "/zh", "/zh-hant"]) {
  for (const path of [
    "",
    "/projects",
    "/home-staging-gta",
    "/furniture",
    "/about",
    "/contact",
    "/privacy",
  ]) {
    const pathname = `${prefix}${path}` || "/";
    assert.ok(pages.has(pathname), `Missing indexable page: ${pathname}`);
  }
  const portfolio = pages.get(`${prefix}/projects`);
  assert.ok(portfolio, `Missing portfolio: ${prefix}`);
  const furniture = pages.get(`${prefix}/furniture`);
  assert.ok(
    furniture.includes('"@type":"Service"'),
    "Furniture page needs Service schema",
  );
  assert.ok(
    furniture.includes('src="/images/brand/wechat-lisa.jpg"'),
    "Furniture page needs the local original WeChat QR image",
  );
  assert.ok(
    pages.get(prefix || "/").includes(`href="${prefix}/furniture"`),
    "Furniture page needs an ordinary homepage link",
  );
  for (const project of projects) {
    const path = `${prefix}/${project.id}`;
    await checkPage(`${origin}${path}`, false);
    assert.ok(
      portfolio.includes(`href="${path}"`),
      `Project link missing from server-rendered portfolio: ${path}`,
    );
  }
  for (const id of [
    "house6",
    "house8",
    "house10",
    "house33",
    "house34",
    "house37",
  ])
    assert.ok(
      !pages.has(`${prefix}/${id}`),
      `Disabled project is indexable: ${id}`,
    );
  const html = pages.get(`${prefix}/home-staging-gta`);
  assert.ok(html, `Missing service area route: ${prefix}`);
  assert.ok(html.includes('"@type":"Service"'), "Missing Service entity");
  assert.ok(html.includes('"@type":"BreadcrumbList"'), "Missing breadcrumbs");
  assert.ok(
    html.includes('id="service-coverage"'),
    "Service areas should share one coverage section",
  );
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
assert.deepEqual(
  [
    ...(await readFile(resolve(built, "robots.txt.body"), "utf8")).matchAll(
      /^Disallow:\s*(\S+)/gm,
    ),
  ].map((match) => match[1]),
  ["/api/"],
  "Do not block crawlers from reading project noindex rules",
);
assert.equal(
  (
    await readFile(resolve(root, "public/google06bc8259bbb1d8f0.html"), "utf8")
  ).trim(),
  "google-site-verification: google06bc8259bbb1d8f0.html",
);
console.log(
  `SEO build checks passed: ${urls.length} indexable URLs, ${projects.length * 3} noindex project pages, three languages, HTTP headers, region links, schema and lazy images.`,
);

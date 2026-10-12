import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import sharp from "sharp";

// One-time migration; edit data/projects.json thereafter. Legacy files remain as a backup.
const source = fs.readFileSync("components/Map/Map.jsx", "utf8");
const locations = new Map(
  [
    ...source.matchAll(
      /\{id:\s*(\d+),\s*lat:\s*([\d.]+),\s*lng:\s*(-?[\d.]+),\s*addr:\s*"([^"]+)"\}/g,
    ),
  ].map((m) => [
    `house${m[1]}`,
    {
      latitude: Number(Number(m[2]).toFixed(2)),
      longitude: Number(Number(m[3]).toFixed(2)),
      street: m[4].replace(/^xx\s+/, ""),
    },
  ]),
);
const selected = [
  "house38",
  "house36",
  "house68",
  "house35",
  "house60",
  "house62",
];
const descriptions = {
  house38:
    "Soft textures and a balanced furniture arrangement bring warmth to a bright living room with a striking stone fireplace.",
  house36:
    "A considered mix of furniture and soft neutral tones connects the living and dining spaces in this light-filled home.",
  house68:
    "A light palette, layered textiles and carefully placed seating make this living room feel open and welcoming.",
  house35:
    "Classic furniture and warm textures complement the wood panelling and architectural character of this home.",
  house60:
    "Elegant seating and coordinated accents echo the traditional detailing of this warm and inviting living space.",
  house62:
    "Thoughtful styling draws attention to the natural light and architectural details throughout this home.",
};
const projects = [];
for (const file of fs.readdirSync("_posts").filter((f) => f.endsWith(".md"))) {
  const id = path.basename(file, ".md");
  const { data } = matter(fs.readFileSync(path.join("_posts", file), "utf8"));
  if (data.disabled === true) continue;
  const location = locations.get(id);
  if (!location) throw new Error(`Missing location: ${id}`);
  const manifest = JSON.parse(
    fs.readFileSync(`public/images/${id}/meta.json`, "utf8"),
  );
  const images = [];
  for (const fileName of manifest.images) {
    const src = `/images/${id}/${fileName}`;
    const { width, height } = await sharp(`public${src}`).metadata();
    images.push({
      src,
      width,
      height,
      alt: `Home staging at ${location.street} — project photograph ${images.length + 1}`,
    });
  }
  const cover =
    images.find((image) => image.src === data.highlight_image) || images[0];
  projects.push({
    id,
    city: data.tags?.[0] || "Greater Toronto Area",
    ...location,
    title: location.street,
    description:
      descriptions[id] ||
      `Explore the staging details at our ${location.street} project, from furniture placement to the finishing touches.`,
    featured: selected.includes(id),
    cover,
    images,
  });
}
projects.sort((a, b) => {
  const ai = selected.indexOf(a.id),
    bi = selected.indexOf(b.id);
  if (ai !== -1 || bi !== -1)
    return (ai === -1 ? 999 : ai) - (bi === -1 ? 999 : bi);
  return Number(b.id.slice(5)) - Number(a.id.slice(5));
});
fs.mkdirSync("data", { recursive: true });
fs.writeFileSync(
  "data/projects.json",
  JSON.stringify(projects, null, 2) + "\n",
);
console.log(
  `Migrated ${projects.length} projects with neighbourhood-level coordinates.`,
);

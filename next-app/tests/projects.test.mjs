import fs from "node:fs";
import test from "node:test";
import assert from "node:assert/strict";
const projects = JSON.parse(
  fs.readFileSync(new URL("../data/projects.json", import.meta.url), "utf8"),
);
test("every migrated project has real images, a unique URL and approximate coordinates", () => {
  assert.equal(projects.length, 67);
  assert.equal(new Set(projects.map((p) => p.id)).size, projects.length);
  assert.equal(projects.filter((p) => p.featured).length, 6);
  for (const p of projects) {
    assert.match(p.id, /^house\d+$/);
    assert.ok(p.images.length);
    assert.equal(p.latitude, Number(p.latitude.toFixed(2)));
    assert.equal(p.longitude, Number(p.longitude.toFixed(2)));
    assert.ok(!/^\d/.test(p.street));
    assert.ok(p.city);
    for (const image of [p.cover, ...p.images]) {
      assert.ok(image.width > 0 && image.height > 0);
      assert.ok(image.src.startsWith(`/images/${p.id}/`));
      assert.ok(
        fs.existsSync(new URL(`../public${image.src}`, import.meta.url)),
      );
    }
  }
});
test("disabled legacy projects stay unavailable", () => {
  for (const id of [
    "house6",
    "house8",
    "house10",
    "house33",
    "house34",
    "house37",
  ])
    assert.ok(!projects.some((p) => p.id === id));
});

import test from "node:test";
import assert from "node:assert/strict";
import {
  preferredLanguage,
  savedLanguage,
} from "../lib/language-preference.ts";

test("browser language distinguishes English, Simplified and Traditional Chinese", () => {
  for (const [header, locale] of [
    ["en-CA,en;q=0.9,zh-CN;q=0.8", "en"],
    ["zh-CN,zh;q=0.9,en;q=0.8", "zh"],
    ["zh-SG", "zh"],
    ["zh", "zh"],
    ["zh-TW,zh;q=0.9,en;q=0.8", "zh-hant"],
    ["zh-HK", "zh-hant"],
    ["zh-MO", "zh-hant"],
    ["zh-Hant", "zh-hant"],
    ["zh-Hans-HK", "zh"],
    ["zh-Hant-CN", "zh-hant"],
    ["ZH-hAnT", "zh-hant"],
    ["fr-CA,zh-Hant;q=0.8,en;q=0.7", "zh-hant"],
    ["en;q=0.6,zh-TW;q=0.9", "zh-hant"],
    ["en;q=0.8,zh;q=0.8", "en"],
    ["zh;q=0.8,en;q=0.8", "zh"],
  ])
    assert.equal(preferredLanguage(undefined, header), locale, header);
});

test("a saved manual choice always wins over browser preferences", () => {
  assert.equal(preferredLanguage("en", "zh-Hant"), "en");
  assert.equal(preferredLanguage("zh", "en-CA"), "zh");
  assert.equal(preferredLanguage("zh-hant", "en-CA"), "zh-hant");
  assert.equal(preferredLanguage("not-a-language", "zh-TW"), "zh-hant");
  for (const value of [undefined, "", "EN", "zh-TW", "../zh", "invalid"])
    assert.equal(savedLanguage(value), undefined);
});

test("missing, unsupported or unusable preferences fall back to English", () => {
  for (const header of [
    null,
    "",
    "fr-CA,fr;q=0.9",
    "*",
    "zh;q=0",
    "zh;q=bad",
    "zh;q=2",
    "zh;q=-1",
  ])
    assert.equal(preferredLanguage(undefined, header), "en", String(header));
  assert.equal(preferredLanguage(undefined, "zh;q=0,en;q=0.5"), "en");
  assert.equal(
    preferredLanguage(undefined, "zh;q=bad,zh-Hant;q=0.7"),
    "zh-hant",
  );
});

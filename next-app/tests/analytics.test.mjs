import test from "node:test";
import assert from "node:assert/strict";
import { publicPageView } from "../lib/analytics.ts";

test("traffic statistics keep language and public page paths without URL secrets", () => {
  for (const prefix of ["", "/zh", "/zh-hant"]) {
    for (const path of [
      "",
      "/contact",
      "/home-staging-gta",
      "/furniture",
      "/house38",
    ]) {
      const clean = `https://www.oaktime.ca${prefix}${path || (prefix ? "" : "/")}`;
      assert.deepEqual(
        publicPageView({
          type: "pageview",
          url: `${clean}?email=customer%40example.test&address=private#phone`,
        }),
        { type: "pageview", url: clean },
      );
    }
  }
});

test("traffic statistics reject custom events, nonpublic paths and malformed URLs", () => {
  assert.equal(
    publicPageView({ type: "event", url: "https://www.oaktime.ca/contact" }),
    null,
  );
  for (const url of [
    "not-a-url",
    "javascript:alert(1)",
    "https://www.oaktime.ca/api/inquiries",
    "https://www.oaktime.ca/zh/api/inquiries",
    "https://www.oaktime.ca/private/customer-address",
    "https://www.oaktime.ca/zhish",
  ])
    assert.equal(publicPageView({ type: "pageview", url }), null);
});

import test from "node:test";
import assert from "node:assert/strict";
import {
  localizedPath,
  htmlLanguage,
  locales,
  translator,
  cityLabel,
} from "../lib/i18n.ts";
import { pageText, projectDescription } from "../lib/page-copy.ts";
import { validateInquiry, buildEmails } from "../lib/inquiry-core.ts";
import { inquiryError } from "../lib/inquiry-messages.ts";

test("language URLs round-trip the current page, query and anchor without changing existing English URLs", () => {
  for (const path of [
    "/",
    "/projects",
    "/house68",
    "/contact?ref=portfolio#inquiry",
    "/?city=Toronto#project-map",
    "/zhish",
  ]) {
    const zh = localizedPath(path, "zh");
    assert.equal(localizedPath(zh, "zh"), zh);
    assert.equal(localizedPath(zh, "en"), path);
  }
  assert.equal(localizedPath("/", "zh"), "/zh");
  assert.equal(htmlLanguage("en"), "en-CA");
  assert.equal(htmlLanguage("zh"), "zh-Hans");
  assert.equal(htmlLanguage("zh-hant"), "zh-Hant");
  for (const path of [
    "/",
    "/projects",
    "/house38?ref=map#gallery",
    "/zh-hantish",
  ]) {
    for (const from of locales) {
      for (const to of locales) {
        assert.equal(
          localizedPath(localizedPath(path, from), to),
          localizedPath(path, to),
        );
      }
    }
  }
});

test("Traditional Chinese renders distinct copy, city names and project descriptions", () => {
  assert.equal(
    translator("zh-hant")("Quote", "获取报价", "獲取報價"),
    "獲取報價",
  );
  assert.equal(cityLabel("Toronto", "zh-hant"), "多倫多");
  assert.equal(cityLabel("Markham", "zh-hant"), "萬錦");
  assert.equal(pageText("zh-hant", "Request a quote"), "獲取報價");
  assert.match(
    projectDescription(
      { id: "house38", street: "Ardmore Rd", description: "English" },
      "zh-hant",
    ),
    /客廳空間/,
  );
  assert.match(
    projectDescription(
      { id: "house1", street: "Test Rd", description: "English" },
      "zh-hant",
    ),
    /瀏覽 Test Rd/,
  );
  assert.equal(
    inquiryError("Please enter a valid email address.", "zh-hant"),
    "請填寫有效的電子郵箱。",
  );
  assert.match(inquiryError(undefined, "zh-hant"), /網絡連接後重試/);
});

test("Traditional Chinese inquiry emails retain customer details and separate recipients", () => {
  const input = {
    requestId: "a05eec14-4515-4d19-8d08-e5aab8396b1d",
    address: "100 Example Road",
    email: "customer@example.test",
    phone: "4165550100",
    name: "测试客户",
    message: "请保留原文",
    consent: true,
    budget: "unsure",
    locale: "zh-hant",
  };
  const { data, error } = validateInquiry(input);
  assert.equal(error, undefined);
  assert.equal(data.locale, "zh-hant");
  const { team, customer } = buildEmails(
    data,
    "from@example.test",
    "team@example.test",
  );
  assert.match(customer.subject, /我們已收到您的房屋佈置詢價/);
  assert.match(customer.text, /設計師/);
  assert.match(customer.text, /詢價編號/);
  assert.match(team.text, /Website language: Traditional Chinese/);
  assert.ok(team.text.includes(input.name));
  assert.ok(team.text.includes(input.message));
  assert.deepEqual(customer.to, [input.email]);
  assert.deepEqual(team.to, ["team@example.test"]);
  assert.ok(!customer.text.includes(input.address));
});

test("Chinese inquiries receive a Chinese acknowledgement with both phone lines and unchanged recipients", () => {
  const input = {
    requestId: "a05eec14-4515-4d19-8d08-e5aab8396b1d",
    address: "100 Example Road",
    email: "customer@example.test",
    phone: "4165550100",
    name: "测试客户",
    message: "",
    consent: true,
    budget: "unsure",
    locale: "zh",
  };
  const { data, error } = validateInquiry(input);
  assert.equal(error, undefined);
  assert.equal(data.locale, "zh");
  const { team, customer } = buildEmails(
    data,
    "Oaktime <hello@example.test>",
    "team@example.test",
  );
  assert.deepEqual(team.to, ["team@example.test"]);
  assert.deepEqual(customer.to, ["customer@example.test"]);
  assert.match(customer.subject, /已收到/);
  assert.match(customer.text, /设计师/);
  assert.match(customer.text, /877-1878/);
  assert.match(customer.text, /939-3962/);
  assert.ok(!customer.text.includes(input.address));
  assert.equal(customer.reply_to, "team@example.test");
  assert.ok(validateInquiry({ ...input, locale: "invalid" }).error);
  assert.ok(validateInquiry({ ...input, locale: { language: "zh" } }).error);
  assert.match(
    buildEmails(
      validateInquiry({ ...input, locale: undefined }).data,
      "from@example.test",
      "team@example.test",
    ).customer.subject,
    /received/,
  );
});

test("Chinese form failures are understandable, including an unknown server error", () => {
  assert.equal(
    inquiryError(
      "Online inquiries are temporarily unavailable. Please contact our team directly.",
      "zh",
    ),
    "在线询价暂时不可用，请直接联系团队。",
  );
  assert.match(inquiryError("Unexpected server response", "zh"), /重试/);
  assert.equal(
    inquiryError("Please enter your property address.", "en"),
    "Please enter your property address.",
  );
});

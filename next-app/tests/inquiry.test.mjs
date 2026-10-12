import test from "node:test";
import assert from "node:assert/strict";
import {
  validateInquiry,
  buildEmails,
  isAllowedOrigin,
} from "../lib/inquiry-core.ts";
import { deliverInquiry } from "../lib/inquiry-delivery.ts";

const valid = {
  requestId: "a05eec14-4515-4d19-8d08-e5aab8396b1d",
  address: "123 Example Street, Toronto",
  budget: "unsure",
  email: "customer@example.com",
  phone: "(416) 555-0123",
  name: "Test Customer",
  message: "",
  consent: true,
  website: "",
};
test("same-site submissions work behind Next.js while foreign and malformed origins fail", () => {
  assert.equal(
    isAllowedOrigin(
      "http://127.0.0.1:3100",
      "http://localhost:3100/api/inquiries",
      "127.0.0.1:3100",
    ),
    true,
  );
  assert.equal(
    isAllowedOrigin(
      "https://preview.example.test",
      "http://localhost:3000/api/inquiries",
      "preview.example.test",
    ),
    true,
  );
  assert.equal(
    isAllowedOrigin(
      "https://oaktime.example.test",
      "https://deployment.example.test/api/inquiries",
      "deployment.example.test",
      "https://oaktime.example.test",
    ),
    true,
  );
  for (const origin of [
    null,
    "null",
    "invalid",
    "https://evil.example.test",
    "https://preview.example.test.evil.test",
    "https://preview.example.test:444",
    "https://preview.example.test/path",
    "https://user@preview.example.test",
    "http://preview.example.test",
  ]) {
    assert.equal(
      isAllowedOrigin(
        origin,
        "https://preview.example.test/api/inquiries",
        "preview.example.test",
      ),
      false,
      origin,
    );
  }
});
test("valid inquiry normalizes fields without requiring optional name or notes", () => {
  const { data } = validateInquiry({
    ...valid,
    email: " CUSTOMER@EXAMPLE.COM ",
    name: "",
    message: "",
  });
  assert.equal(data.email, "customer@example.com");
  assert.equal(data.name, "");
  assert.equal(data.budget, "unsure");
});
test("malformed JSON values cannot crash validation or pass as contact details", () => {
  for (const body of [
    null,
    [],
    "text",
    4,
    { ...valid, address: 2 },
    { ...valid, email: [] },
    { ...valid, phone: {} },
    { ...valid, budget: "__proto__" },
    { ...valid, name: null },
    { ...valid, message: "x".repeat(2001) },
  ])
    assert.ok(validateInquiry(body).error);
});
test("consent, email, phone, size limits and bot trap are enforced", () => {
  for (const update of [
    { consent: false },
    { consent: "true" },
    { email: "bad" },
    { email: "first,second@example.com" },
    { email: "name;other@example.com" },
    { email: "name\u0000@example.com" },
    { phone: "a".repeat(10) },
    { requestId: "../unsafe" },
    { address: "x".repeat(301) },
    { website: "spam" },
    { name: "test\r\nBcc: victim@example.com" },
  ])
    assert.ok(validateInquiry({ ...valid, ...update }).error);
});
test("emails have separate recipients, safe subjects and customer-specific Reply-To", () => {
  const data = validateInquiry({
    ...valid,
    message: "<script>alert(1)</script>",
  }).data;
  const emails = buildEmails(
    data,
    "Oaktime <hello@example.com>",
    "team@example.com",
  );
  assert.deepEqual(emails.team.to, ["team@example.com"]);
  assert.equal(emails.team.reply_to, valid.email);
  assert.deepEqual(emails.customer.to, [valid.email]);
  assert.equal(emails.customer.reply_to, "team@example.com");
  assert.ok(!emails.customer.text.includes(valid.address));
  assert.ok(!emails.customer.text.includes("<script>"));
  assert.match(emails.customer.text, /designer will review/i);
  assert.equal(emails.team.html, undefined);
});

test("delivery persists partial success, retries only the missing email, and deduplicates completion", async () => {
  const oldFetch = globalThis.fetch;
  const envNames = [
    "UPSTASH_REDIS_REST_URL",
    "UPSTASH_REDIS_REST_TOKEN",
    "RESEND_API_KEY",
    "INQUIRY_FROM",
  ];
  const oldEnv = Object.fromEntries(
    envNames.map((key) => [key, process.env[key]]),
  );
  Object.assign(process.env, {
    UPSTASH_REDIS_REST_URL: "https://storage.example.test",
    UPSTASH_REDIS_REST_TOKEN: "test",
    RESEND_API_KEY: "test",
    INQUIRY_FROM: "Oaktime <hello@example.test>",
  });
  const job = {
    data: validateInquiry(valid).data,
    digest: "test",
    createdAt: Date.now(),
    teamSent: false,
    customerSent: false,
    attempts: 0,
  };
  const values = new Map([
    [`oaktime:inquiry:${valid.requestId}`, JSON.stringify(job)],
  ]);
  const sends = [];
  let failCustomer = true;
  globalThis.fetch = async (url, options) => {
    if (url === "https://api.resend.com/emails") {
      sends.push({
        data: JSON.parse(options.body),
        key: options.headers["Idempotency-Key"],
      });
      return new Response("{}", {
        status:
          failCustomer && sends.at(-1).data.to[0] === valid.email ? 503 : 200,
      });
    }
    assert.equal(url, "https://storage.example.test");
    const [command, ...args] = JSON.parse(options.body);
    let result = 1;
    if (command === "GET") result = values.get(args[0]) || null;
    else if (command === "SET") {
      values.set(args[0], args[1]);
      result = "OK";
    } else if (command === "EVAL") {
      values.delete(args[2]);
    } else assert.ok(["ZREM", "ZADD"].includes(command));
    return Response.json({ result });
  };
  try {
    assert.equal(await deliverInquiry(valid.requestId), false);
    assert.equal(
      JSON.parse(values.get(`oaktime:inquiry:${valid.requestId}`)).teamSent,
      true,
    );
    failCustomer = false;
    assert.equal(await deliverInquiry(valid.requestId), true);
    assert.equal(await deliverInquiry(valid.requestId), true);
    assert.equal(sends.filter((s) => s.data.to[0] !== valid.email).length, 1);
    assert.equal(sends.filter((s) => s.data.to[0] === valid.email).length, 2);
    assert.equal(sends[1].key, sends[2].key);
  } finally {
    globalThis.fetch = oldFetch;
    for (const key of envNames) {
      if (oldEnv[key] === undefined) delete process.env[key];
      else process.env[key] = oldEnv[key];
    }
  }
});

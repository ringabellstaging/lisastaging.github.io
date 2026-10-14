import test from "node:test";
import assert from "node:assert/strict";
import {
  validateInquiry,
  buildEmails,
  isAllowedOrigin,
} from "../lib/inquiry-core.ts";
import { deliverInquiry, emailConfigured } from "../lib/inquiry-delivery.ts";
import { createJob, getJob } from "../lib/inquiry-store.ts";
import { encryptRecord } from "../lib/inquiry-crypto.ts";
import {
  MARKETING_CONSENT_VERSION,
  marketingConsentText,
  recordMarketingPreference,
} from "../lib/marketing-consent.ts";

const testEncryptionKey = Buffer.alloc(32, 7).toString("base64");

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
test("marketing consent is optional, explicit and tied to the displayed wording", () => {
  const legacy = validateInquiry(valid).data;
  assert.equal(Object.hasOwn(legacy, "marketingConsent"), false);
  assert.equal(Object.hasOwn(legacy, "marketingConsentVersion"), false);
  for (const marketingConsent of [true, false]) {
    const result = validateInquiry({
      ...valid,
      marketingConsent,
      marketingConsentVersion: MARKETING_CONSENT_VERSION,
      marketingPreference: { optedIn: true, recordedAt: "1999-01-01" },
    });
    assert.equal(result.error, undefined);
    assert.equal(result.data.marketingConsent, marketingConsent);
    assert.equal(Object.hasOwn(result.data, "marketingPreference"), false);
    assert.ok(validateInquiry({ ...result.data, consent: false }).error);
  }
  for (const marketingConsent of ["true", "false", "on", 1, null, [], {}])
    assert.ok(
      validateInquiry({
        ...valid,
        marketingConsent,
        marketingConsentVersion: MARKETING_CONSENT_VERSION,
      }).error,
    );
  for (const marketingConsentVersion of [undefined, "old-version", 20261013])
    assert.ok(
      validateInquiry({
        ...valid,
        marketingConsent: true,
        marketingConsentVersion,
      }).error,
    );
  assert.ok(
    validateInquiry({
      ...valid,
      marketingConsentVersion: MARKETING_CONSENT_VERSION,
    }).error,
  );
});
test("team emails preserve translated consent evidence and never infer opt-in from inquiry consent", () => {
  const timestamp = Date.parse("2026-10-13T14:00:00.000Z");
  for (const locale of ["en", "zh", "zh-hant"]) {
    for (const optedIn of [true, false]) {
      const data = validateInquiry({
        ...valid,
        locale,
        marketingConsent: optedIn,
        marketingConsentVersion: MARKETING_CONSENT_VERSION,
      }).data;
      const preference = recordMarketingPreference(optedIn, locale, timestamp);
      const emails = buildEmails(
        data,
        "from@example.test",
        "team@example.test",
        preference,
      );
      assert.match(
        emails.team.text,
        optedIn ? /Marketing email opt-in: YES/ : /Marketing email opt-in: NO/,
      );
      assert.ok(emails.team.text.includes(marketingConsentText(locale)));
      assert.ok(emails.team.text.includes("2026-10-13T14:00:00.000Z"));
      assert.ok(emails.team.text.includes(MARKETING_CONSENT_VERSION));
      assert.ok(emails.team.text.includes("13036 McCowan Rd"));
      // A transactional receipt never becomes a marketing message.
      assert.ok(!emails.customer.text.includes(marketingConsentText(locale)));
    }
  }
  assert.notEqual(marketingConsentText("zh"), marketingConsentText("zh-hant"));
  const legacy = buildEmails(
    validateInquiry(valid).data,
    "from@example.test",
    "team@example.test",
  );
  assert.ok(!legacy.team.text.includes("Marketing email opt-in:"));
  assert.ok(
    legacy.team.text.endsWith(
      "The customer agreed to be contacted about this inquiry. Reply to this email to reach them.",
    ),
  );
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
    "INQUIRY_TO",
    "INQUIRY_ENCRYPTION_KEY",
  ];
  const oldEnv = Object.fromEntries(
    envNames.map((key) => [key, process.env[key]]),
  );
  Object.assign(process.env, {
    UPSTASH_REDIS_REST_URL: "https://storage.example.test/",
    UPSTASH_REDIS_REST_TOKEN: "test",
    RESEND_API_KEY: "test",
    INQUIRY_FROM: "Oaktime <hello@example.test>",
    INQUIRY_TO: "info@oaktime.ca",
    INQUIRY_ENCRYPTION_KEY: testEncryptionKey,
  });
  const job = {
    data: validateInquiry(valid).data,
    digest: "test",
    createdAt: Date.now(),
    teamSent: false,
    confirmationRequested: true,
    customerSent: false,
    attempts: 0,
  };
  const values = new Map([
    [
      `oaktime:inquiry:${valid.requestId}`,
      encryptRecord(`oaktime:inquiry:${valid.requestId}`, job),
    ],
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
    assert.equal(url, "https://storage.example.test/");
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
    assert.equal((await getJob(valid.requestId)).teamSent, true);
    failCustomer = false;
    assert.equal(await deliverInquiry(valid.requestId), true);
    assert.equal(await deliverInquiry(valid.requestId), true);
    assert.equal(sends.filter((s) => s.data.to[0] !== valid.email).length, 1);
    assert.equal(sends.filter((s) => s.data.to[0] === valid.email).length, 2);
    assert.equal(sends[1].key, sends[2].key);
    assert.deepEqual(sends[1].data, sends[2].data);
    assert.deepEqual(
      sends[0].data,
      buildEmails(job.data, process.env.INQUIRY_FROM, process.env.INQUIRY_TO)
        .team,
    );
  } finally {
    globalThis.fetch = oldFetch;
    for (const key of envNames) {
      if (oldEnv[key] === undefined) delete process.env[key];
      else process.env[key] = oldEnv[key];
    }
  }
});

test("forwarding only requires configured recipients, retries safely and never emails the customer", async () => {
  const oldFetch = globalThis.fetch;
  const configured = {
    UPSTASH_REDIS_REST_URL: "https://storage.example.test/",
    UPSTASH_REDIS_REST_TOKEN: "test",
    RESEND_API_KEY: "test",
    INQUIRY_FROM: "Oaktime Staging <inquiries@example.test>",
    INQUIRY_TO: "info@oaktime.ca",
    INQUIRY_SEND_CONFIRMATION: "false",
    INQUIRY_ENCRYPTION_KEY: testEncryptionKey,
  };
  const oldEnv = Object.fromEntries(
    Object.keys(configured).map((key) => [key, process.env[key]]),
  );
  const values = new Map();
  const sends = [];
  const queued = new Set();
  let failSend = true;
  Object.assign(process.env, configured);
  globalThis.fetch = async (url, options) => {
    if (url === "https://api.resend.com/emails") {
      sends.push({
        data: JSON.parse(options.body),
        key: options.headers["Idempotency-Key"],
      });
      return new Response("{}", { status: failSend ? 503 : 200 });
    }
    assert.equal(url, configured.UPSTASH_REDIS_REST_URL);
    const [command, ...args] = JSON.parse(options.body);
    let result = 1;
    if (command === "GET") result = values.get(args[0]) || null;
    else if (command === "SET") {
      if (args.includes("NX") && values.has(args[0])) result = null;
      else {
        values.set(args[0], args[1]);
        result = "OK";
      }
    } else if (command === "EVAL" && args[0].includes("EXISTS")) {
      if (values.has(args[2])) result = 0;
      else {
        values.set(args[2], args[4]);
        queued.add(args[7]);
      }
    } else if (command === "EVAL" && args[0].includes("DEL")) {
      if (values.get(args[2]) === args[3]) values.delete(args[2]);
    } else if (command === "ZREM") queued.delete(args[1]);
    else if (command === "ZADD") queued.add(args[2]);
    else assert.fail(`Unexpected Redis command: ${command}`);
    return Response.json({ result });
  };
  try {
    assert.equal(emailConfigured(), true);
    delete process.env.INQUIRY_TO;
    assert.equal(emailConfigured(), false);
    process.env.INQUIRY_TO = configured.INQUIRY_TO;

    // Missing or false confirmation settings both mean team-only forwarding.
    delete process.env.INQUIRY_SEND_CONFIRMATION;
    const data = validateInquiry({
      ...valid,
      locale: "zh-hant",
      marketingConsent: true,
      marketingConsentVersion: MARKETING_CONSENT_VERSION,
    }).data;
    const before = Date.now();
    const job = await createJob(data);
    assert.equal(job.marketingPreference.optedIn, true);
    assert.equal(
      job.marketingPreference.recordedAt,
      new Date(job.createdAt).toISOString(),
    );
    assert.ok(job.createdAt >= before && job.createdAt <= Date.now());
    assert.equal(
      job.marketingPreference.statement,
      marketingConsentText("zh-hant"),
    );
    const duplicate = await createJob(data);
    assert.deepEqual(duplicate.marketingPreference, job.marketingPreference);
    assert.equal(job.confirmationRequested, false);
    assert.equal(queued.has(valid.requestId), true);
    const encrypted = values.get(`oaktime:inquiry:${valid.requestId}`);
    for (const privateValue of [valid.address, valid.email, valid.phone])
      assert.equal(encrypted.includes(privateValue), false);

    assert.equal(await deliverInquiry(valid.requestId), false);
    assert.equal(queued.has(valid.requestId), true);
    assert.equal((await getJob(valid.requestId)).teamSent, false);

    // Changing the default does not send an acknowledgement for an existing job.
    process.env.INQUIRY_SEND_CONFIRMATION = "true";
    failSend = false;
    assert.equal(await deliverInquiry(valid.requestId), true);
    assert.equal(await deliverInquiry(valid.requestId), true);
    assert.equal(queued.has(valid.requestId), false);
    assert.equal(sends.length, 2);
    assert.equal(sends[0].key, sends[1].key);
    assert.deepEqual(sends[0].data, sends[1].data);
    assert.match(sends[0].data.text, /Marketing email opt-in: YES/);
    for (const { data } of sends) {
      assert.deepEqual(data.to, ["info@oaktime.ca"]);
      assert.equal(data.from, configured.INQUIRY_FROM);
      assert.equal(data.reply_to, valid.email);
      assert.ok(data.text.includes(valid.address));
      assert.ok(data.text.includes(valid.phone));
    }
    const stored = await getJob(valid.requestId);
    assert.equal(stored.teamSent, true);
    assert.equal(stored.customerSent, false);
    assert.deepEqual(stored.marketingPreference, job.marketingPreference);

    // Older records without the flag must not unexpectedly send customer mail.
    delete stored.confirmationRequested;
    values.set(
      `oaktime:inquiry:${valid.requestId}`,
      encryptRecord(`oaktime:inquiry:${valid.requestId}`, stored),
    );
    assert.equal(await deliverInquiry(valid.requestId), true);
    assert.equal(sends.length, 2);

    const enabled = await createJob({
      ...validateInquiry(valid).data,
      requestId: "e6ec019d-d28b-4498-aedb-090693e023f3",
    });
    assert.equal(enabled.confirmationRequested, true);
    assert.equal(enabled.marketingPreference, undefined);
  } finally {
    globalThis.fetch = oldFetch;
    for (const [key, value] of Object.entries(oldEnv)) {
      if (value === undefined) delete process.env[key];
      else process.env[key] = value;
    }
  }
});

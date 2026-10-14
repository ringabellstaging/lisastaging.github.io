# Oaktime Staging

Next.js website for Oak Time Inc. The active application is this `next-app` directory. The repository-root Jekyll website and unused legacy components are preserved for reference; they are not imported by the new site.

## Local development

Use Node.js 22.20 or newer in the Node 22 release line.

From the repository root, run `npm run setup` once, then `npm run dev`. The root scripts forward to this application directory.

Alternatively, run the following commands **inside `next-app`**:

```sh
npm ci
npm run dev
```

`npm run build` produces a normal Next.js deployment. `npm start` serves that build. Static export is no longer used: the site needs the image optimizer and inquiry API. Keep Vercel's output-directory setting at the Next.js default, not `out`.

For a realistic local speed check, run `npm run build`, then `npm start -- --port 3102`, and browse `http://localhost:3102`. Rebuild to see subsequent edits. `npm run dev` uses Turbopack and compiles routes on demand, so first visits are not representative of deployed performance. Development writes to `.next-dev`; production uses `.next`, preventing concurrent dev/preview servers from overwriting one another's chunks.

## Content

- `data/projects.json`: the single source for the 67 active projects, approximate map coordinates, covers and photo dimensions. Six projects are featured. City labels were migrated from the original content; review them when updating a project. Public coordinates are rounded to two decimal places and addresses contain street names only.
- Original `/houseN` URLs remain valid; the six disabled projects remain unavailable. All projects also have crawlable links on `/projects`.
- `data/reviews.ts`: intentionally empty. Only add a review after verifying its quotation, author and source URL. Nothing renders until a verified review is present. Never add placeholder reviews, invented ratings or sales statistics.
- `lib/contact.ts`: public email, English/Mandarin telephone numbers and company address.
- `scripts/migrate-projects.mjs`: one-time migration from legacy Markdown and map code. Do not rerun after editing the new JSON because it overwrites it. Original photo files are retained and served through `next/image`.

The main page contains the hero, services, six selected projects, the map/list explorer, the process, verified reviews when available, FAQs and the inquiry form. The map module mounts only as the explorer enters the viewport. Full-size gallery images are requested only when the viewer is opened. Photos retain existing watermarks and credits.

Homepage and portfolio cards show city names, including their accessible labels and photo descriptions. Individual project pages and the map keep their street references and approximate locations.

## Image and navigation performance

- Serve WebP through `next/image` to reduce first-request encoding latency. Cards, the hero and inline gallery images share quality 75; map thumbnails use 65 and the lightbox uses 90 only when opened. This avoids separately encoding the same photo at several nearly identical quality settings. Original files remain unchanged.
- Responsive image sizes follow the actual grid breakpoints and maximum content width. Offscreen photos retain native lazy loading; only the hero or first project photo is prioritized.
- Featured cards prefetch their routes when visible. Long project lists prefetch on hover, keyboard focus or touch, avoiding a burst of requests for every project. Map popup links use client navigation and prefetch when opened.
- Measure a production build separately from dev compilation, and distinguish the first image request from a cached request. Recheck real mobile network performance on Vercel after deployment; local response times are not a production load-time guarantee.

Implementation references: [Next.js image formats](https://nextjs.org/docs/15/app/api-reference/components/image#formats), [prefetching](https://nextjs.org/docs/15/app/guides/prefetching), and [production builds](https://nextjs.org/docs/15/app/api-reference/cli/next#next-build-options).

## Languages

English keeps the existing URLs (`/`, `/projects`, `/house38`, etc.); Simplified Chinese uses `/zh` and Traditional Chinese uses `/zh-hant`. The header's **简 / 繁 / EN** links switch the current page and preserve its query and anchor. Navigation within each language stays in that language. A bookmarked URL or refresh retains the language without requiring cookies or browser-side translation.

All three versions are rendered as static HTML with the correct document language (`en-CA`, `zh-Hans`, `zh-Hant`), localized metadata, reciprocal `hreflang` links and sitemap alternatives once `SITE_URL` is configured. The thin page wrappers live in `app/(en)`, `app/(zh)/zh` and `app/(zh-hant)/zh-hant`; shared page content lives in `components/pages`. `lib/page-copy.ts` contains editorial translations and Chinese project descriptions; interactive controls use `lib/i18n.ts` helpers and explicit English, Simplified and Traditional copy. Translations are checked into the source; no conversion library or large Chinese font is downloaded by visitors. Street names and the official business name remain unchanged. Review quotations and customer input remain in their original wording.

`components/PhoneContacts.tsx` keeps the English and Chinese phone lines equally prominent and aligned in the inquiry section and footer. Both use the same number formatting and typography. With `INQUIRY_SEND_CONFIRMATION=true`, Chinese submissions receive an acknowledgement in the chosen script; the internal team notification records the website language. Submissions without a locale use English.

Separate root documents keep the HTML language correct without making pages dynamic. The `globalNotFound` option enables Next.js 15's shared 404 document for these layouts; unavailable projects still return 404. References: [Next.js internationalization](https://nextjs.org/docs/15/app/guides/internationalization) and [global not-found pages](https://nextjs.org/docs/15/app/api-reference/file-conventions/not-found).

## Production setup

Set Vercel **Root Directory** to `next-app`, **Framework** to Next.js, **Build Command** to `npm run build`, and leave **Output Directory** at its default. A Pro plan is needed for the commercial site and the 15-minute retry cron in `vercel.json`.

Copy `.env.example` to `.env.local` for local configuration; never commit credentials. Required environment variables:

| Variable                   | Purpose                                                                                                          |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `SITE_URL`                 | Chosen, verified production origin, e.g. `https://your-domain.example`. Leave blank until the domain is decided. |
| `RESEND_API_KEY`           | Sending-only Resend key scoped to the verified Oaktime sending domain.                                           |
| `INQUIRY_FROM`             | `Oaktime Staging <info@oaktime.ca>` after verifying `oaktime.ca` in Resend. A hosted mailbox is not required.      |
| `INQUIRY_TO`               | `info@oaktime.ca`. Server-controlled forwarding destination, separate from the public contact address.          |
| `INQUIRY_SEND_CONFIRMATION` | Set `true` to send the requested automatic customer acknowledgement. Omitted/false means team notification only. |
| `UPSTASH_REDIS_REST_URL`   | Managed Redis REST endpoint for durable records, shared rate limits and retry jobs.                              |
| `UPSTASH_REDIS_REST_TOKEN` | Private server-side token for that database.                                                                     |
| `INQUIRY_ENCRYPTION_KEY`  | Separate random 32-byte key encoded as base64, stored as a Production secret. Encrypts inquiry records before Redis storage. |
| `CRON_SECRET`              | Long random secret; Vercel supplies it as the retry route's bearer token.                                        |

No standalone server is required. Use a dedicated database for Oaktime and do not copy another project's secrets into the repository. Keep inquiry environments isolated; preview development should not point at production credentials. The team recipient comes only from server-side `INQUIRY_TO`; it cannot be overridden by form input. The public contact email in `lib/contact.ts` remains independent.

The native Vercel Upstash integration supplies `KV_REST_API_URL` and `KV_REST_API_TOKEN` as sensitive variables. These are supported as alternatives to the `UPSTASH_REDIS_REST_*` names, so no manual copying of database tokens is needed. Connect only Production. Other integration-provided variables (`KV_URL`, `REDIS_URL`, read-only token) are not used by the application.

`info@oaktime.ca` is a forwarding address, which is sufficient as the notification recipient and customer acknowledgement Reply-To. Resend provides outbound delivery; a hosted mailbox or SMTP password is not required. Verify an Oaktime sending domain in Resend with its exact DNS records in Porkbun. Keep the existing root MX records (`fwd1.porkbun.com` and `fwd2.porkbun.com`) so receiving/forwarding continues to work. Do not enable Resend inbound receiving on the root domain or replace the existing root SPF record with an unrelated value. Use Resend's specified sending/return-path subdomain records and DKIM selector. Disable open/click tracking for these transactional emails.

The domain-specific DNS records generated on 2026-10-13 are recorded in `docs/oaktime-resend-dns.txt` with Chinese setup instructions. They contain only public DNS values. DNS changes are handled separately by the domain owner; verify the live Resend status before enabling real delivery.

Configure the required mail/storage/encryption/retry variables plus `INQUIRY_SEND_CONFIRMATION=true` in Vercel **Production**, then redeploy; environment changes do not update an already-built deployment. Verify the Resend domain, existing forwarding destination, both email deliveries, and the authenticated retry route before calling the form live. A Resend `delivered` event for the forwarding address proves acceptance by Porkbun, not necessarily final placement in the destination inbox; also check that destination inbox.

Until all email, storage and retry credentials are configured, the form returns a clear 503 error with a direct-email alternative. It does **not** simulate successful receipt. This is intentional for previews. No real email has been sent by the automated tests.

## Inquiry delivery

1. Validate types, lengths, budget, address, email, phone, consent, honeypot and exact request origin. Payloads are capped at 12 KB.
2. Shared Redis limits: eight requests per IP per ten minutes, three new inquiries per email per day and forty total new inquiries per day. The global cap leaves headroom for two emails per inquiry; review against the account's actual Resend quota, especially if sharing it with the drone business.
3. Encrypt the entire inquiry record with AES-256-GCM before atomically saving and enqueueing it. Each write uses a fresh random 12-byte nonce and a 16-byte authentication tag; the Redis record key is authenticated to prevent swapping records. A UUID plus keyed payload digest protects retries and prevents reusing an ID with changed data. IP/email rate-limit keys use HMAC rather than public hashes. Records expire after 30 days. Do not write customer details into application logs.
4. Send the team notification first, with the customer's Reply-To. If requested, send a separate acknowledgement to the customer with `INQUIRY_TO` as Reply-To. This setting is captured when the inquiry is saved so changing it later cannot unexpectedly email older customers. Neither message uses customer input as email HTML or as a recipient list.
5. Persist each delivery result independently. Stable Resend idempotency keys and a shared lock prevent concurrent resends. Browser retries of the same unchanged form reuse the same ID.
6. The authenticated Vercel cron retries up to five pending inquiries each run. Retry only missing emails; stop after ten attempts or 23 hours to remain inside Resend's 24-hour idempotency window. The record remains available for manual follow-up until its retention expires. Check Vercel logs for `needs manual delivery review`; configure an operational alert before launch. Do not blindly resend a job older than 24 hours—check provider logs first.

An API success means the inquiry is durably recorded. The response separately reports whether a customer acknowledgement was requested and accepted by the provider; the frontend only shows acknowledgement status when one was requested. Delivery to an inbox still depends on DNS verification, provider status and recipient filtering. An API/provider acceptance is not an inbox-delivery guarantee. Configure SPF/DKIM/DMARC on the chosen sending domain and verify final inbox receipt during the launch check.

The Upstash connection requires HTTPS and refuses redirects. The encryption key stays outside Redis, in Vercel Production; HKDF derives separate encryption and fingerprint keys. Missing/invalid keys fail closed, and plaintext legacy records are not accepted. Keep this key stable and backed up in an approved secret manager: replacing or losing it makes existing inquiry records unreadable. Rotation requires an explicit migration before changing the active key. Application encryption protects stored record contents if database credentials are exposed, but cannot protect a compromised application server or mailbox. Queue IDs, timestamps, TTLs and usage counters remain visible to the storage provider. Disable database eviction and automatic paid upgrades; do not share production credentials with preview deployments.

## Optional mailing list consent

The inquiry form has a separate, initially unchecked email marketing checkbox in English, Simplified Chinese and Traditional Chinese. Declining it never prevents a quote request; it does not consent to SMS or phone marketing. New submissions must supply a boolean choice and the displayed wording version. Older submissions without the field remain valid and grant no marketing permission.

At first acceptance, the server freezes the choice, UTC timestamp, language, source, version, displayed statement and business contact in the encrypted 30-day inquiry record. Retries reuse that evidence. The team notification also includes it, so **retain those notification emails as consent evidence** when building a mailing list; the website database is not a permanent subscriber registry. No new environment variables or DNS changes are needed. Old pending jobs keep their original email content and idempotency behavior.

This collects permission only: it does not add Resend Contacts, schedule campaigns or send promotions. Before sending a campaign, use a mailing list tool with an unsubscribe mechanism, retain the original consent evidence, and apply any later withdrawals/suppression list. The current withdrawal contact is `info@oaktime.ca`; monitor that forwarding inbox and action requests within 10 business days. An unchecked box in a later inquiry is not itself an unsubscribe request. Do not import all inquiry senders as subscribers. Keep the existing Resend key scoped to transactional sending.

Consent wording is versioned in `lib/marketing-consent.ts`; change the version when changing that disclosure. If old forms must remain accepted across a future wording change, retain a versioned copy lookup rather than silently attributing new wording to an older form. See [CRTC consent guidance](https://crtc.gc.ca/eng/archive/2012/2012-548.htm) and [CASL FAQ](https://crtc.gc.ca/eng/com500/faq500.htm).

## SEO and launch checks

With no `SITE_URL`, or on a Vercel preview, pages are `noindex` and sitemap output is empty. `robots.txt` permits page crawling so crawlers can read the noindex instruction. After choosing the production domain, set `SITE_URL` and rebuild: canonical URLs, sitemap and social images will use that origin. Do not add an expired domain or preview URL as the canonical. Confirm production HTML is indexable before submitting its sitemap to Search Console.

Page titles/descriptions, LocalBusiness data and project breadcrumbs are implemented. No invented ratings or opening hours are included. Verify actual city labels and public business details, then update Google Business Profile separately. Recover an old domain before attempting old-domain redirects.

## Validation

```sh
npm test
npm run lint
npm run build
```

Tests cover malformed submissions, consent, email recipients, partial email failure/retry, deduplication, image references, approximate coordinates and disabled projects. Delivery tests mock every network call. For browser checks, test desktop and narrow mobile layouts, city filters, marker popups, map/list switching, gallery keyboard controls, required-field errors and the unconfigured-service response. Before publishing, use an explicitly approved test submission to verify both real emails and the scheduled retry in the configured environment.

Official service references: [Vercel Functions](https://vercel.com/docs/functions), [Resend domains](https://resend.com/docs/dashboard/domains/introduction), [Resend idempotency](https://resend.com/docs/dashboard/emails/idempotency-keys).

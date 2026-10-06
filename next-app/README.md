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

## Content

- `data/projects.json`: the single source for the 67 active projects, approximate map coordinates, covers and photo dimensions. Six projects are featured. City labels were migrated from the original content; review them when updating a project. Public coordinates are rounded to two decimal places and addresses contain street names only.
- Original `/houseN` URLs remain valid; the six disabled projects remain unavailable. All projects also have crawlable links on `/projects`.
- `data/reviews.ts`: intentionally empty. Only add a review after verifying its quotation, author and source URL. Nothing renders until a verified review is present. Never add placeholder reviews, invented ratings or sales statistics.
- `lib/contact.ts`: public email, English/Mandarin telephone numbers and company address.
- `scripts/migrate-projects.mjs`: one-time migration from legacy Markdown and map code. Do not rerun after editing the new JSON because it overwrites it. Original photo files are retained and served through `next/image`.

The main page contains the hero, services, six selected projects, the map/list explorer, the process, verified reviews when available, FAQs and the inquiry form. The map module mounts only as the explorer enters the viewport. Full-size gallery images are requested only when the viewer is opened. Photos retain existing watermarks and credits.

## Languages

English keeps the existing URLs (`/`, `/projects`, `/house38`, etc.); Simplified Chinese uses `/zh` (`/zh/projects`, `/zh/house38`, etc.). The header's **中 / EN** links switch the current page and preserve its query and anchor. Navigation within each language stays in that language. A bookmarked URL or refresh retains the language without requiring cookies or browser-side translation.

Both versions are rendered as static HTML with the correct document language, localized metadata, reciprocal `hreflang` links and sitemap alternatives once `SITE_URL` is configured. The thin page wrappers live in `app/(en)` and `app/(zh)/zh`; shared page content lives in `components/pages`. `lib/page-copy.ts` contains editorial translations and Chinese project descriptions; interactive controls use `lib/i18n.ts` helpers. Street names and the official business name remain unchanged. Review quotations remain in their original wording.

`components/PhoneContacts.tsx` keeps the English and Chinese phone lines equally prominent and aligned in the inquiry section and footer. Both use the same number formatting and typography. Chinese submissions receive a Chinese acknowledgement; the internal team notification records the website language. Old submissions without a locale still receive English acknowledgements.

Separate root documents keep the HTML language correct without making pages dynamic. The `globalNotFound` option enables Next.js 15's shared 404 document for these layouts; unavailable projects still return 404. References: [Next.js internationalization](https://nextjs.org/docs/15/app/guides/internationalization) and [global not-found pages](https://nextjs.org/docs/15/app/api-reference/file-conventions/not-found).

## Production setup

Set Vercel **Root Directory** to `next-app`, **Framework** to Next.js, **Build Command** to `npm run build`, and leave **Output Directory** at its default. A Pro plan is needed for the commercial site and the 15-minute retry cron in `vercel.json`.

Copy `.env.example` to `.env.local` for local configuration; never commit credentials. Required environment variables:

| Variable                   | Purpose                                                                                                          |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| `SITE_URL`                 | Chosen, verified production origin, e.g. `https://your-domain.example`. Leave blank until the domain is decided. |
| `RESEND_API_KEY`           | Sending-only Resend key scoped to the verified Oaktime sending domain.                                           |
| `INQUIRY_FROM`             | `Oaktime Staging <inquiries@your-verified-domain.example>`. Gmail cannot be the From domain.                     |
| `UPSTASH_REDIS_REST_URL`   | Managed Redis REST endpoint for durable records, shared rate limits and retry jobs.                              |
| `UPSTASH_REDIS_REST_TOKEN` | Private server-side token for that database.                                                                     |
| `CRON_SECRET`              | Long random secret; Vercel supplies it as the retry route's bearer token.                                        |

No standalone server is required. Use a dedicated database for Oaktime and do not copy another project's secrets into the repository. Keep inquiry environments isolated; preview development should not point at production credentials. The recipient is fixed to `Oaktimeinc@gmail.com` in `lib/contact.ts`; it cannot be overridden by form input.

Until all email, storage and retry credentials are configured, the form returns a clear 503 error with a direct-email alternative. It does **not** simulate successful receipt. This is intentional for previews. No real email has been sent by the automated tests.

## Inquiry delivery

1. Validate types, lengths, budget, address, email, phone, consent, honeypot and exact request origin. Payloads are capped at 12 KB.
2. Shared Redis limits: eight requests per IP per ten minutes, three new inquiries per email per day and forty total new inquiries per day. The global cap leaves headroom for two emails per inquiry; review against the account's actual Resend quota, especially if sharing it with the drone business.
3. Atomically create a private record and enqueue delivery. A UUID plus payload digest protects retries and prevents reusing an ID with changed data. Records expire after 30 days. Do not write customer details into application logs.
4. Send the team notification first, with the customer's Reply-To. Send a separate acknowledgement to the customer with the company Reply-To. Neither uses customer input as email HTML or as a recipient list.
5. Persist each delivery result independently. Stable Resend idempotency keys and a shared lock prevent concurrent resends. Browser retries of the same unchanged form reuse the same ID.
6. The authenticated Vercel cron retries up to five pending inquiries each run. Retry only missing emails; stop after ten attempts or 23 hours to remain inside Resend's 24-hour idempotency window. The record remains available for manual follow-up until its retention expires. Check Vercel logs for `needs manual delivery review`; configure an operational alert before launch. Do not blindly resend a job older than 24 hours—check provider logs first.

An API success means the inquiry is durably recorded. The response separately reports whether the customer email was accepted by the provider. Delivery to an inbox still depends on DNS verification, provider status and recipient filtering. An API/provider acceptance is not an inbox-delivery guarantee. Configure SPF/DKIM/DMARC on the chosen sending domain and verify Gmail receipt during the launch check.

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

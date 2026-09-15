# sebastiansiejek.dev

Localized portfolio built with Next.js App Router, TypeScript, next-intl,
Tailwind CSS, and shadcn/ui.

## Local development

Install dependencies and copy the environment template:

```bash
pnpm install
cp .env.local.sample .env.local
pnpm dev
```

The site is available at [http://localhost:3000](http://localhost:3000).

Required environment variables:

- `SITE_URL`: public canonical URL;
- `NEXT_PUBLIC_SENTRY_DNS`: Sentry client DSN;
- `RESEND_API_KEY`: server-only Resend API key;
- `TURNSTILE_SITE_KEY`: Cloudflare Turnstile widget key;
- `TURNSTILE_SECRET_KEY`: server-only Turnstile verification key.

Keep real values in `.env.local`. Never commit that file.

## Contact delivery

`POST /api/contact` validates the request, verifies Cloudflare Turnstile, and
sends the message through Resend. Messages use
`Portfolio <contact@sebastiansiejek.dev>` as the sender, arrive at the contact
address in `siteConfig`, and set the visitor's email as `Reply-To`.

The form also uses a honeypot, a minimum completion time, request idempotency,
client and server timeouts, and PII-free Sentry reporting. Turnstile runs only
after submit with `appearance: "interaction-only"`, so it stays hidden unless
Cloudflare requires visitor interaction. Configure a Vercel WAF rate-limit rule
for `POST /api/contact`: 5 requests per 10 minutes per IP.

Server telemetry disables incoming request-body capture and strips request data
before events are sent, keeping contact form contents out of Sentry.

Cloudflare must allow every hostname on which the form is tested, including
preview or local hostnames when applicable.

## Quality checks

```bash
pnpm lint
pnpm check-types
pnpm test --runInBand
pnpm build
```

## Routes

- `/pl` and `/en`: localized portfolio;
- `/pl/projekty/[slug]` and `/en/projects/[slug]`: case studies;
- `/pl/polityka-prywatnosci` and `/en/privacy`: privacy policy;
- `/blog` and `/blog/[slug]`: Polish articles;
- `/api/contact`: server-only contact endpoint.

The blog sits outside the `[locale]` layout and its `NextIntlClientProvider`.
Shared header and footer links use `next/link`; localized footer URLs are
generated with `getPathname` and an explicit locale so they also work on the blog.
The document language follows the resolved locale; the unlocalized blog remains
Polish. Generated `/icon/*` routes bypass locale redirects.
The blog shares the portfolio's light/dark palette. Article code blocks use
theme-aware semantic colors and horizontal scrolling; inline code uses the
primary accent.
Separate root layouts share `_app/document` to preserve static rendering and
set the correct HTML language. Navigating between the blog and portfolio loads
a new document. Global 404 pages use `experimental.globalNotFound`.

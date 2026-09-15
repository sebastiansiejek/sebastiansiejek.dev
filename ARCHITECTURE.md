# Architecture

The application follows [Feature-Sliced Design](https://feature-sliced.design/).
Next.js App Router entry points stay in `src/app`, while FSD's conflicting
layers use the `_app` and `_pages` names recommended by the FSD Next.js guide.

## Layers

- `src/app`: thin Next.js route adapters and framework-required entry points
- `src/_app`: application-wide providers, metadata, and global styles
- `src/_pages`: complete screens ready to be rendered by the router
- `src/widgets`: large, independent page sections and shared site blocks
- `src/features`: user interactions that provide business value
- `src/entities`: domain data, types, and reusable domain UI
- `src/shared`: framework integrations, configuration, generic libraries, and UI

Dependencies point down the list. A slice must not import another slice from
the same layer. Cross-slice imports use the slice's public `index.ts` API.
Server-only exports use `index.server.ts` so they cannot leak into a client
bundle.

The localized landing page is the `home` page slice. Portfolio projects are a
domain entity presented by the home page and by the `case-study` page slice.
The localized privacy policy is the `privacy` page slice.

Local MDX file access is exposed only through
`src/shared/lib/resources/index.server.ts`. Localized project and privacy URLs
are generated from `shared/i18n/navigation`, including metadata and sitemap URLs.
`src/app/[locale]/layout.tsx` and `src/app/(polish)/layout.tsx` are separate root
layouts. They pass an explicit document language to `_app/document`, keeping
portfolio and blog pages statically rendered. The `(polish)` route group does
not change `/blog` URLs. Crossing between blog and portfolio roots causes a full
document navigation; both use the same persisted theme and shared providers.
`global-not-found.tsx` renders the shared document for unmatched routes using
Next.js's `experimental.globalNotFound` support.

## Contact form boundary

The contact form is implemented in `src/features/contact-form`. Shared client
and server validation lives in its `model`, interactive UI and Turnstile
rendering live in `ui`, and server-only delivery integrations live in `server`.
Only `index.server.ts` exposes the request handler to the App Router adapter at
`src/app/api/contact/route.ts`.

The server verifies request shape, same-origin headers, honeypot and completion
time, then validates the single-use Cloudflare Turnstile token before calling
Resend. The client executes Turnstile on submit and shows it only when visitor
interaction is required. Resend receives a stable idempotency key. Sentry receives only error
codes and request IDs, never form fields, and the contact section is marked
with `data-sentry-block` to exclude it from session replay.

Server Sentry integrations disable incoming request-body capture and exclude
request data from events. The shared telemetry sanitizer also removes
`request.data` before server and edge events are sent.
Client monitoring is initialized in `src/instrumentation-client.ts`, including
the App Router navigation hook, for both Webpack and Turbopack builds.

## UI system

The shared design-system primitives are managed by shadcn/ui with Base UI as
the primitive library. `components.json` is the source of truth for the
registry style, icon library, aliases, and the Tailwind CSS entry point.

- Generated and locally owned shadcn primitives live directly in
  `src/shared/ui`.
- Product-specific compositions such as `MediaFrame`, `SectionHeading`, and
  `ArrowLink` build on those primitives and remain grouped in their existing
  shared UI slices.
- Design tokens are defined as semantic shadcn variables in
  `src/_app/styles/global.css` and exposed to Tailwind CSS v4 through
  `@theme inline`.
- Color tokens use `light-dark(light, dark)` in one `:root` block. The root
  supports both color schemes; `data-theme` selectors set only `color-scheme`
  for explicit preferences. Primary and sidebar-primary share the mint
  `#77d9b8` background and dark `#101713` foreground in both themes.
- Components use semantic utilities such as `bg-background`, `bg-card`,
  `text-muted-foreground`, `border-border`, and `ring-ring`. Feature code must
  not introduce raw palette utilities for UI states.
- Add or inspect primitives with the project's package runner, for example
  `pnpm dlx shadcn@latest add button`, and keep the configured Base UI APIs
  (`render` rather than Radix's `asChild`).

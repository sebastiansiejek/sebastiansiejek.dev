/new# Portfolio implementation brief

Status: approved by Sebastian on 2026-09-02.

This document is the source of truth for the portfolio implementation. Start from it instead of repeating the discovery interview. Ask the user only when a missing asset, credential, permission, or materially different product decision blocks progress.

## Outcome

Expand `sebastiansiejek.dev` from a minimal personal page into a professional portfolio that:

- builds Sebastian's personal brand;
- attracts selected side projects, primarily from Poland;
- presents him professionally to recruiters without publishing or duplicating his CV;
- proves that he can deliver complete digital products, not only frontend code;
- keeps modern web applications and AI-assisted automation as the future-facing direction while retaining WordPress and WooCommerce as commercially valuable expertise.

Primary audience: Polish founders and companies that need a web product, business-process automation, website, or online store. Recruiters are a secondary audience.

## Positioning and copy direction

Use **Software Engineer** as the public role.

Recommended Polish hero:

> Tworzę aplikacje, sklepy i automatyzacje od pomysłu po wdrożenie.

Supporting copy:

> Pomagam zamieniać pomysły i ręczne procesy w działające produkty cyfrowe. Łączę doświadczenie przy SaaS-ie używanym przez ponad 50 000 osób z dziesiątkami zrealizowanych projektów webowych.

Primary CTA: **Opowiedz mi, co chcesz zbudować.**

Secondary CTA: **Zobacz moje projekty.**

The English version should carry the same meaning rather than translate word for word.

Voice: direct, calm, specific, professional, and human. Prefer outcomes and decisions over stacks and buzzwords. Present AI as part of a disciplined delivery process and as an automation capability, not as a promise of cheap work.

## Homepage information architecture

Build a long-form landing page in this order:

1. Navigation with Work, Services, About, Writing, Contact, and language switcher.
2. Hero with positioning, short proof-led description, primary CTA, and secondary CTA.
3. Compact proof strip: 9+ years of commercial experience, SaaS used by 50,000+ people, 100+ delivered web projects, delivery from architecture to deployment.
4. Selected work: Upominkly, Planning Poker, and Not Bad Studio. Daily Standup appears as a smaller technical article/experiment.
5. Services: web applications and MVPs; process automation and AI solutions; WordPress and WooCommerce.
6. Working model: discovery, scoped proposal, implementation, launch.
7. About section with Sebastian's real photo and a concise professional narrative.
8. Latest writing, preserving the existing blog as a separate section.
9. Contact with email, LinkedIn, and a short working form when message delivery is configured.

Use the homepage as the conversion hub and give substantial projects their own crawlable case-study URLs. Avoid thin standalone About or Contact pages.

## Routes and language

Target structure:

- `/` redirects to the previously selected locale, then the browser language;
  fall back to `/pl` when neither resolves to a supported locale.
- `/pl` and `/en` contain complete localized landing pages.
- `/pl/projekty/upominkly` and `/en/projects/upominkly`.
- `/pl/projekty/planning-poker` and `/en/projects/planning-poker`.
- `/pl/projekty/not-bad-studio` and `/en/projects/not-bad-studio`.
- Preserve existing `/blog` and `/blog/[slug]` URLs because the current articles are Polish and may already be indexed. Link to them from both language variants with an explicit Polish-language cue in the English UI.

Add localized metadata, canonical URLs, `hreflang` alternates, Open Graph data, sitemap entries, and crawlable internal links. Each case study needs a distinct title and description. Do not create separate service routes until each can contain genuinely useful content: real examples, process, deliverables, constraints, and answers to client questions.

Initial commercial SEO themes:

1. web applications and MVP development;
2. business-process and AI automation;
3. WooCommerce stores as a secondary, proven service.

Personal-name search should clearly resolve to Sebastian and the Software Engineer positioning.

## Professional facts available for copy

Use these as evidence, not as a CV timeline.

### TimeCamp — Frontend Developer, 09.2022–present

- Develops and helps architect a SaaS application used by more than 50,000 users.
- Works in a 12-person team.
- Designs new solutions and develops product functionality.
- Works on frontend architecture and migration from AngularJS/PHP to React.
- Introduced Feature-Sliced Design.
- Develops React and TypeScript applications and Web Components.
- Develops the Design System and Storybook documentation.
- Conducts code reviews and helps define programming standards.
- Develops unit and end-to-end testing with Jest and Playwright.
- Develops CI/CD processes with GitHub Actions.
- Designs AI-assisted tools that automate team workflows.

### Empressia — Web Developer / Team Leader, 09.2019–09.2022

- Delivered dozens of web projects for business clients.
- Developed applications with React and Next.js.
- Used WordPress as a Headless CMS.
- Introduced Docker-based environments and team CLI tools.
- Conducted code reviews and developed CI/CD processes.
- Coordinated development-team work.

### Studio Kreacja — Web Developer, 06.2017–09.2022

- Developed business websites and e-commerce stores.
- Built dedicated WordPress themes and custom PHP/JavaScript features.
- Worked on performance and SEO optimization.
- Collaborated directly with clients.

The supplied CV lists overlapping dates for Studio Kreacja and Empressia. Do not present an employment timeline on the portfolio, so the overlap does not need interpretation.

Education is available on LinkedIn/CV but is not a homepage priority. Do not display a downloadable CV; link to LinkedIn for full history.

## About narrative

Recommended Polish draft:

> Jestem Software Engineerem z ponad dziewięcioletnim doświadczeniem. Zaczynałem od tworzenia dedykowanych stron i sklepów, następnie prowadziłem zespół oraz rozwijałem aplikacje w React i Next.js. Obecnie pracuję nad architekturą i rozwojem produktu SaaS używanego przez ponad 50 000 osób.
>
> Najlepiej czuję się tam, gdzie trzeba połączyć analizę problemu, decyzje architektoniczne i sprawne dostarczenie działającego rozwiązania. Wykorzystuję AI zarówno podczas tworzenia oprogramowania, jak i do budowania automatyzacji usprawniających codzienną pracę.

Use Sebastian's own professional photo. Keep the section work-focused; do not expand into private life or hobbies.

## Selected work

### Upominkly — flagship case study

- URL: `https://www.upominkly.com`.
- Fully owned and delivered by Sebastian, end to end.
- Origin: Sebastian's girlfriend's sister was organizing a baby shower. Guests did not know what to buy, and the organizers wanted gifts to be useful and avoid duplication.
- Product: event gift lists with public sharing, reservations without a guest account, purchased/reserved/available states, and group-contribution support.
- Stack supplied by Sebastian: Next.js, Supabase, Tailwind, Vercel.
- Tell the story as problem → product decisions → working solution → lessons.
- Do not expose the real family event, names, or gift list in the portfolio. Capture or create an anonymized demo.
- Do not invent traction metrics. Add aggregate counts only if Sebastian later provides verified data.

### Planning Poker — full but concise case study

- Live URL: `https://planning-poker.sebastiansiejek.dev`.
- Repository: `https://github.com/sebastiansiejek/planning-poker`.
- Origin: Sebastian's team needed a simple and fast estimation tool.
- Evidence: the team uses it during every planning session.
- Product: Scrum estimation with real-time communication.
- Stack supplied by Sebastian: Next.js, TypeScript, WebSockets, Supabase, Tailwind, Vercel.
- Emphasize fitting a recurring team workflow and continued real usage, not novelty for its own sake.

### Not Bad Studio — commercial WooCommerce case study

- URL: `https://notbadstudio.pl`.
- Sebastian implemented the complete store and deployment.
- A graphic designer supplied the Figma design; credit design separately and claim only technical implementation.
- The implementation was technically straightforward. Frame its value as reliable translation from design into a functioning e-commerce business, not as an architecture breakthrough.
- Do not claim conversion, revenue, performance, or SEO outcomes without verified data.

### Daily Standup — supporting article/experiment

- URL: `https://www.sebastiansiejek.dev/blog/daily-standup`.
- Automates summaries from Jira and TimeCamp data using Node.js CLI/n8n.
- Keep it in Writing or Experiments rather than making it a flagship case study because it is close to Sebastian's current employment context.
- The existing public article is the disclosure boundary unless Sebastian explicitly authorizes more.

Do not present projects delivered through Empressia or Studio Kreacja as Sebastian's independent client work unless explicit permission and attribution are available.

## Services and collaboration model

Present three services, in this order:

1. Web applications and MVPs.
2. Process automation and AI-enabled solutions.
3. WordPress and WooCommerce implementation and optimization.

Sebastian can also provide technical discovery, audits, performance optimization, and on-page/technical SEO. Do not position him as a branding, advertising, link-building, or guaranteed-ranking agency. Advanced visual identity work is delivered with a designer.

Preferred commercial model:

- paid discovery when scope is uncertain;
- fixed price for a well-defined implementation;
- proposals evaluated individually;
- up to roughly 15 hours per week is an internal planning constraint, never public copy.

Do not publish an `available for work` badge or weekly availability. Do not offer work on products that compete directly with TimeCamp, especially time-tracking products.

## Contact

Primary message: **Opowiedz mi, co chcesz zbudować.**

- Email: `siejeksebastian@gmail.com`.
- LinkedIn: `https://www.linkedin.com/in/sebastiansiejek/`.
- GitHub: `https://github.com/sebastiansiejek`.
- Use a short form: name, reply email, and message.
- A visible email must remain available if form delivery fails.
- Never ship a form that appears successful without actually delivering the message. If no delivery provider or credentials exist, finish the UI with an honest fallback and document the one remaining integration step.
- Calendar booking is unnecessary.

## Visual direction

Evolve the existing dark, minimalist identity instead of replacing it wholesale:

- retain the charcoal base and mint accent;
- use stronger editorial typography and layout rhythm;
- feature large, real project imagery and Sebastian's own portrait;
- use restrained motion only where it improves hierarchy or feedback;
- make evidence and project outcomes more prominent than technology badges;
- avoid terminal motifs, decorative code walls, fake dashboards, and stereotypical developer-portfolio visuals;
- maintain excellent mobile behavior, accessibility, light/dark contrast, and reduced-motion support.

No fake testimonials, fabricated clients, invented metrics, or placeholder endorsements may appear in production. Sebastian chose to omit testimonials entirely for this version.

## Existing repository context

- The current homepage is a minimal name/title/socials view in `src/app/page.tsx`.
- Blog list and detail routes already exist under `src/app/blog`.
- Blog content is local MDX under `src/content/posts`.
- Existing contact links live in `src/widgets/Socials/Socials.tsx`.
- Existing visual tokens and fonts live in `src/styles/global.css` and `src/app/layout.tsx`.
- Current navigation has Blog, About, and Contact labels, but About and Contact do not yet lead to substantive sections.

Inspect the current files before implementation and preserve unrelated user changes. Reuse the established component/content conventions when they remain appropriate; deepen them only where localized pages and project case studies justify it.

## Missing assets and non-blocking unknowns

- Sebastian must provide the final portrait; reserve the correct visual slot without generating a fake portrait.
- Project screenshots may be captured from the public products, but anonymize the Upominkly family event.
- Verified Upominkly usage metrics can improve the case study later but are not required for launch.
- Verified business outcomes for Not Bad Studio can improve the case study later but are not required for launch.
- A contact-form delivery provider/credential may be required. Do not block the rest of the page on it.

## Completion criteria for the implementation session

The first implementation is complete when:

- the localized PL/EN landing pages implement the approved section order and positioning;
- Upominkly, Planning Poker, and Not Bad Studio have substantial localized case-study pages with accurate attribution;
- existing blog URLs and content continue working;
- navigation, language switching, internal links, metadata, canonical URLs, language alternates, sitemap, and robots data are coherent;
- contact options are honest and usable, with no false form-success path;
- the design works from small mobile screens through desktop, supports keyboard navigation, and respects reduced motion;
- project claims match this document and no confidential employer/client details have been added;
- relevant lint, typecheck, tests, and production build pass;
- the final UI has been visually inspected at representative mobile and desktop sizes.

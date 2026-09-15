# Agent guidance

For portfolio, homepage, About, projects, services, localization, SEO, or contact implementation, read `.agents/workspace/portfolio-brief.md` first and treat its approved decisions as the source of truth. Continue from the brief instead of repeating discovery; ask the user only when a missing asset, credential, permission, or conflicting requirement blocks progress.

After making changes, review the project documentation and `AGENTS.md` for impact. Update them in the same change whenever behavior, architecture, commands, conventions, or agent guidance has changed.

For shared UI work, use the shadcn/ui configuration in `components.json` and
the Base UI component APIs. Prefer existing primitives in `src/shared/ui`, use
semantic Tailwind tokens from `src/_app/styles/global.css`, and add new shadcn
components through `pnpm dlx shadcn@latest` instead of recreating them.
Declare color tokens with `light-dark(light, dark)` in the global stylesheet's
single `:root` block; theme selectors only set `color-scheme`. Keep primary
backgrounds mint with dark foregrounds in both themes.

Before running any command, briefly tell the user what the command is intended
to check or change.

For route or document-layout changes, read `ARCHITECTURE.md` first.

For logo, favicon, or social-share image changes, read the Personal identity
section in `README.md` for the approved vector source and asset regeneration.

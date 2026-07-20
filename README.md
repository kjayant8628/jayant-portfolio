# AI Engineer Portfolio

A production-grade personal portfolio built with Next.js 15, TypeScript, Tailwind CSS, and Framer Motion — designed to read like a funded AI startup landing page rather than a template.

## Stack

- **Next.js 15** (App Router) + **TypeScript**
- **Tailwind CSS** with a custom dark-first design token system
- **Framer Motion** for scroll reveals, page transitions, and the animated stat counters
- Hand-built shadcn/ui-style primitives (Button, Card, Badge, Dialog, Tabs, Tooltip, Separator)
- **cmdk** for the ⌘K command palette
- **next-themes** for the dark/light toggle
- Live **GitHub REST API** integration for the open-source section

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build && npm start   # production build
npm run lint                  # lint
```

## Customize it for you

Everything personal lives in a few files — start here:

| What | Where |
|---|---|
| Name, role, tagline, email, social links, GitHub username | `lib/config.ts` |
| Project case studies | `lib/data/projects.ts` |
| Experience, timeline, stats, tech stack, blog posts | `lib/data/content.ts` |
| Resume file | replace `public/resume.pdf` (currently a placeholder) |
| Site metadata / OG tags | `app/layout.tsx` |

The **GitHub section** (`components/sections/github-section.tsx`) fetches live repositories through `app/api/github/route.ts`, using the `github` username set in `lib/config.ts` — no token required for public repos, but you'll hit the unauthenticated rate limit (60 req/hr) if you refresh constantly in development. For production, consider adding a `GITHUB_TOKEN` env var and passing it as an `Authorization` header in `lib/github.ts` if you need a higher limit.

## Structure

```
app/                  routes (home, /blog, /blog/[slug], API routes, sitemap/robots)
components/
  layout/             navbar, footer, theme provider/toggle, command palette, scroll fx
  sections/           one file per homepage section
  projects/            project card + case-study dialog
  ui/                 shared primitives
lib/
  data/               all site content (projects, experience, blog, stats, tech stack)
  config.ts           single source of truth for name/links/copy
  github.ts           GitHub API fetch helper
hooks/                small client hooks (scroll progress, active section)
types/                shared TypeScript types
```

## Notes

- Dark mode is the default; the toggle in the navbar and command palette switches to a light theme with its own token set (`app/globals.css`).
- Keyboard: `⌘K` / `Ctrl+K` opens the command palette from anywhere; `Esc` closes it.
- Motion respects `prefers-reduced-motion` throughout (hero background, ticker, page transitions).
- The GitHub API route is revalidated hourly (`next: { revalidate: 3600 }`) to stay well under rate limits in production.

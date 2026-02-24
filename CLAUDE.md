# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Dev Commands

```bash
npm run dev       # Start dev server (Turbopack)
npm run build     # Production build
npm run start     # Serve production build
npm run lint      # ESLint (flat config, no separate type-check script)
```

No test framework is configured.

## Architecture

SpacedOut is a live space intelligence dashboard built with Next.js 16 (App Router), React 19, Tailwind CSS v4, and Framer Motion.

### Data Flow: Three-Tier Fetching

1. **API Layer** (`src/lib/api/`) — Raw HTTP clients for 6 external APIs. Each function uses `fetch()` with `{ next: { revalidate: N } }` for caching. Throws on error.
2. **Data Layer** (`src/lib/data/`) — Aggregates multiple API calls with `Promise.all`. Wraps in try/catch, returns safe defaults on failure. Failed sources never block the page.
3. **Page Server Components** (`src/app/(main)/*/page.tsx`) — Async server components that call data layer functions directly and pass data as props to client components.

### Route Group `(main)`

All pages live under `src/app/(main)/` which is a non-URL route group. The `(main)/layout.tsx` provides the shared shell: `LazyStarfield` canvas background, `Header`, and `Footer`.

### Server vs Client Component Split

Pages and data fetching are server components by default. Client components (`"use client"`) are used only for: Framer Motion animations, canvas rendering, interactive UI (countdown timers, filters, terminal). Props flow one way: server → client.

### Dynamic Import Pattern

Heavy client components (canvas starfield, wireframe Earth, solar system view, terminal) use a wrapper pattern because `ssr: false` is not allowed in server components in Next.js 16:

```
src/components/canvas/lazy-starfield.tsx    → wraps starfield-canvas.tsx
src/components/sections/solar-system/lazy-solar-system.tsx → wraps planet-orbit-view.tsx
src/components/sections/terminal/lazy-terminal.tsx → wraps terminal-interface.tsx
```

Each wrapper is a `"use client"` component that calls `dynamic(() => import(...), { ssr: false })`.

### Styling: Tailwind v4 with `@theme`

`src/app/globals.css` uses Tailwind v4's CSS-first configuration — no `tailwind.config.js`. Theme tokens are defined in `@theme inline {}`. Custom utilities like `.glass`, `.text-glow`, `.border-glow`, `.shadow-glow`, `.scanlines` are plain CSS classes in the same file.

Color system: dark background `#050510`, electric blue accent `#00d4ff`, glassmorphism via `rgba(255,255,255,0.06)` + `backdrop-blur`.

### API Caching Strategy

- 30s: ISS position (near-realtime)
- 300s: Launches, crew data
- 900s: Spaceflight news
- 3600s: NASA APOD, Mars rover photos

Cache times are defined in `src/lib/constants/api-endpoints.ts` but applied as literal numbers in each API client's fetch call.

There is also a server-side API route at `src/app/api/metrics/route.ts` (`GET /api/metrics`) that returns crew count, upcoming launches, and active missions. It uses `export const revalidate = 300` for edge caching.

### Environment Variables

Only `NASA_API_KEY` is required (defaults to `DEMO_KEY`). All other APIs (Launch Library 2, Open Notify, Where The ISS At, SpaceX, Spaceflight News) are open with no auth. See `.env.local.example`.

### Key Conventions

- Path alias `@/*` maps to `./src/*` for all imports
- `cn()` from `src/lib/utils/cn.ts` (clsx + tailwind-merge) for all conditional class merging
- `src/lib/utils/date-formatter.ts` provides `formatDate`, `formatDateTime`, `formatRelativeTime`, `formatCountdown`
- Animation variants defined in `src/lib/constants/animation-presets.ts`, consumed by motion wrapper components in `src/components/motion/`
- Motion wrappers use `useIntersectionObserver` hook to trigger animations only when visible
- All API response types live in `src/types/api.ts`
- Planet data, agency data, and other static constants live in `src/lib/constants/`
- SVG-based charts (`src/components/charts/`) use Framer Motion for animation — no chart libraries
- GSAP is available (used in `bounce-cards.tsx`) but Framer Motion is the primary animation library

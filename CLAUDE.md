@AGENTS.md

# CLAUDE.md

This file is read by Claude Code at the start of every session. It provides persistent context about this project so you don't have to re-explain it.

## What this project is

**offroading.news** — a vehicle-first off-road knowledge base with AI-curated news. The user picks their machine (year/make/model/trim) and the site filters everything (repair guides, upgrade walkthroughs, trail recommendations, and breaking news) to what's actually relevant to that specific rig.

The site covers four vehicle categories:
- Jeeps and full-size 4x4s
- UTVs (Polaris RZR, Can-Am Maverick, etc.)
- ATVs (Polaris Sportsman, Can-Am Outlander, etc.)
- Dirt bikes (CRF250F, YZ250F, etc.)

The `.news` TLD positions this closer to an editorial publication than a parts blog. The voice is "friend who's done it" — not influencer, not marketing, not Wikipedia.

## Core differentiator

Almost no off-road site organizes content by *the user's actual machine* across all knowledge types. Most sites are either topic-organized (all lift kits, all trails) or single-brand (Jeep-only forums, Tacoma blogs). Our wedge is: pick your rig, get everything you need.

A trail page tells you "needs 33" tires minimum" → links to the tire upgrade guide for *your specific vehicle* → which links to a trail you can now run. The whole site becomes a connected knowledge graph.

The AI news pipeline automatically ingests off-roading news from RSS feeds, summarizes it with Claude API, tags it to relevant vehicles, and publishes it — keeping the site fresh without manual curation.

## Architecture overview

**Stack:**
- Next.js 14+ (App Router) — SSR/SSG/ISR for SEO, API routes for AI pipeline and community features
- Tailwind CSS — utility-first styling with earth-tone design tokens
- Prisma ORM + PostgreSQL (Vercel Postgres / Neon)
- NextAuth.js v4 — Google + GitHub OAuth
- Claude API (@anthropic-ai/sdk) — news summarization, categorization, vehicle tagging
- rss-parser — RSS feed ingestion
- Vercel — hosting, CDN, cron jobs

**Data flow:**
- Flat-file seed data for initial vehicle/article database
- AI pipeline (Vercel Cron) ingests RSS → Claude summarizes + tags vehicles → stores in Postgres
- ISR for content pages (homepage 5min, articles 1hr)
- Community features: comments, user submissions, rig profiles (future)

## Data model essentials

Every Article has a `compatibleVehicleIds` array. Every Trail has a `minVehicleCapability` object. The site's filtering depends entirely on these relationships being maintained.

The unified Article type has four subtypes via the `type` field:
- `fix` — repair / diagnosis / maintenance
- `upgrade` — builds / modifications / installs
- `trail` — ride locations (extends with location, difficulty, capability fields)
- `news` — AI-curated from RSS feeds (extends with sourceUrl, sourceName, aiConfidence)

See `docs/01-database-schema.md` for the full schema.

## Design system

Strict color palette (defined as Tailwind theme extensions and CSS variables):
- Background layers: dark earth tones (stone-900/950 for dark, stone-50/100 for light)
- Typography hierarchy: text, text-bright, text-muted, text-dim
- `--accent` (#d97829, orange) — primary brand
- `--accent-fix` (orange), `--accent-upgrade` (sage green), `--accent-trail` (sand), `--accent-news` (amber) — content type colors

Typography:
- Sans for UI/body (Inter via next/font)
- Serif (Georgia) for editorial headlines — class `.serif`
- Monospace for metadata, eyebrows, technical specs — class `.mono`

Dark mode supported via next-themes (system preference default).

**Don't introduce new colors or fonts without updating this section.** The aesthetic breaks fast if it gets diluted.

## Content rules

Every article (fix, upgrade, trail, news) follows a strict template. Key principles:

- Reading level: 8th-9th grade (off-roaders read on phones at trailheads)
- Always vehicle-specific — never generic guides
- Honest difficulty and cost assessments are the moat
- Real photography required — no stock photos (except AI-curated news which uses source images)
- Listicles forbidden — they rot fast and feel like content marketing

## Development workflow

```bash
npm install
npm run dev      # localhost:3000
npm run build    # production build
npx prisma studio # browse database
npx prisma db push # sync schema to database
```

When adding pages, always:
1. Use the root layout (it has nav/footer/theme wired up)
2. Use Tailwind classes with theme tokens, not hardcoded colors
3. Use semantic HTML (the site needs to be screen-reader friendly and SEO-strong)
4. Keep client-side JS to a minimum — use Server Components by default, `'use client'` only for interactive elements

## Things to NOT do

- Don't add display ads or pop-ups
- Don't introduce heavy client-side frameworks beyond React (no Vue, Svelte, etc.)
- Don't add tracking pixels or third-party social embeds without explicit ask
- Don't create generic "Top 10 X" listicles — they conflict with the brand
- Don't write content that pretends to be authoritative on a vehicle nobody on the team owns or has ridden

## Voice and writing style

When generating any content (articles, microcopy, marketing copy):
- Friend-who's-done-it tone, not influencer or marketing
- Honest about trade-offs, costs, and difficulty
- Specific numbers over vague claims ("ground clearance increases 2.5 inches" not "much more clearance")
- Sentence case for headlines, never Title Case or ALL CAPS
- No exclamation points outside of safety warnings
- Active voice ("torque the bolt to 95 lb-ft" not "the bolt should be torqued")

## When in doubt

Read the documents in `/docs` first. They contain the definitive answers on schema, content structure, and roadmap. This CLAUDE.md is the quick-reference; the docs are the source of truth.

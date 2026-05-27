# Database schema

The source of truth is `prisma/schema.prisma`. This document explains the design decisions.

## Core entities

### Vehicle
Every piece of content on the site connects back to vehicles. A vehicle is a specific year/make/model/trim combination (e.g., "2021 Jeep Wrangler Rubicon"). Vehicles belong to one VehicleCategory.

### VehicleCategory
Four top-level categories: Jeeps & 4x4s, UTVs, ATVs, Dirt Bikes. These drive the homepage category picker and top-level navigation.

### Article
The unified content type. Every article has a `type` field that determines its subtype:

- **FIX** — repair, diagnosis, maintenance guides. Has `estimatedCost`, `difficultyLevel`, `estimatedTime`.
- **UPGRADE** — builds, modifications, installs. Same cost/difficulty fields as FIX.
- **TRAIL** — ride locations. Has `trailLocation`, `trailDifficulty`, `trailMinClearance`, `trailMinTireSize`, lat/lng.
- **NEWS** — AI-curated from RSS feeds. Has `sourceUrl`, `sourceName`, `aiConfidence`.

### ArticleVehicle
Join table linking articles to compatible vehicles. This is the core filtering mechanism — when a user picks their rig, we query articles through this join.

### ContentCategory
Cross-cutting tags like "suspension", "tires", "engine", "electrical", "trail-running". An article can belong to multiple content categories.

## Key invariants

1. Every article MUST have at least one entry in ArticleVehicle (except NEWS articles, which may be vehicle-agnostic).
2. Trail articles MUST have trailDifficulty and trailLocation set.
3. NEWS articles MUST have sourceUrl and aiConfidence set.
4. Slugs are globally unique within their model.

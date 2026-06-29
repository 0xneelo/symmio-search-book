---
id: "authored-volume-snapshot-cadence"
title: "Volume Snapshot Cadence"
section: "dashboard-reference"
track: "Volume"
status: "publication-candidate-needs-operator-review"
sourceKeys: ["server-volume", "server-volume-snapshots", "server-me", "dashboard-volume", "spec-03"]
sourceUrls: ["server/volume.js", "server/volume-snapshots.js", "server/routes/me.js", "src/dashboard/volume.jsx", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["local-volume-source", "local-volume-snapshots", "local-network-depth"]
---

# Volume Snapshot Cadence

The dashboard does not treat network volume as a live tick-by-tick feed. The current implementation reads each wallet's cumulative Vibe trading volume from the backend wallet-volume API, caches the result, and then stores daily wallet snapshots that the dashboard can aggregate without making a live upstream request for every page load.

That distinction matters because the reader sees a measured operating number with intentional lag:

- `server/volume.js` normalizes the upstream `total_trade_volume` response, preserves raw fixed-point diagnostics when present, and uses a six-hour cache with stale-while-revalidate behavior.
- `server/volume-snapshots.js` persists per-wallet daily snapshots for known users and can seed a snapshot from a fresh cache entry before spending live backend quota.
- `server/routes/me.js` aggregates those snapshots across descendants, returning per-level counts, wallet counts, snapshotted counts, total volume, total points, snapshot cadence, and stale markers.
- `src/dashboard/volume.jsx` shows the total, the level breakdown, the wallet rows, each snapshot date, and a stale badge when a row is missing or older than the cadence.

## What The Lag Means

A user should not expect the Volume tab to move every time someone in their network trades. The current source is cumulative wallet volume, refreshed through cache and daily snapshots. That makes the number resilient and inexpensive to serve, but it also means the dashboard is a recent operational read rather than an instant settlement ledger.

The same caveat applies to downstream metrics. Estimated network revenue and network trading points are only as current as the volume/points snapshot feeding them.

## What Is Safe To Say Publicly

It is safe to say that the current dashboard uses backend wallet-volume readings, local cache, and daily snapshots. It is also safe to say that the UI exposes staleness rather than hiding it.

It is also safe to publish the resolved depth stance: public referral-depth accounting uses fifteen levels, and historical backfill is additive without lowering existing balances. This page should not re-open older 5-level wording as current policy.

## Sources

- `server-volume`: Wallet-volume API shape, normalization, six-hour cache, and stale-while-revalidate behavior.
- `server-volume-snapshots`: Daily snapshot persistence, stale detection, cache seeding, and scheduled refresh.
- `server-me`: `/api/me/volume` aggregation payload.
- `dashboard-volume`: Volume tab labels, table shape, stale badge, and cadence display.
- `spec-03`: Current volume source and Barometer guidance.

## Related Pages

- `authored-network-volume`
- `authored-dashboard-volume`
- `authored-estimated-network-revenue`

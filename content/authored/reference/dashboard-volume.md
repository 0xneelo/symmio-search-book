---
id: "authored-dashboard-volume"
title: "Dashboard Volume"
section: "dashboard-reference"
track: "Dashboard Views"
status: "published"
sourceKeys: ["dashboard-app", "dashboard-volume", "server-volume", "server-volume-snapshots", "server-me", "spec-03"]
sourceUrls: ["src/dashboard/app.jsx", "src/dashboard/volume.jsx", "server/volume.js", "server/volume-snapshots.js", "server/routes/me.js", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["local-volume-source", "local-volume-snapshots", "local-network-depth", "linear-subgraph-volume"]
---

# Dashboard Volume

The Volume view explains the network-volume input behind revenue and points. It is routed as `#volume`, fetches `/api/me/volume`, and shows total network trade volume, a per-level summary, and wallet-level snapshot rows.

The current UI labels volume as local wallet snapshots that refresh daily. Rows show level, account, wallet, snapshot date, trade volume, and stale-state markers. The underlying grounding spec says today's source is the Vibe backend wallet-volume API with caching, normalization, and daily snapshots, while the planned Barometer upgrade would move to Goldsky analytics subgraphs.

## Reader Implication

Volume should be documented as a measured input with lag and source status. It is not a live per-trade feed in the current implementation. Public referral depth is 15 levels, and historical backfill is additive and never lowers an existing balance.

## Implementation Boundary

`G-005` is resolved for v1 publication stance: the current source is backend REST wallet totals plus daily snapshots, and Barometer/Goldsky is the tracked accuracy upgrade. Exact subgraph endpoint and venue mapping remain implementation details, not a reason to reopen the public source wording.

## Sources

- `dashboard-app`: dashboard route registration.
- `dashboard-volume`: Volume tab UI and table shape.
- `server-volume`: current backend wallet-volume source and cache behavior.
- `server-volume-snapshots`: daily snapshot behavior.
- `server-me`: `/api/me/volume` route behavior.
- `spec-03`: current source and Barometer migration guidance.

## Related Pages

- `authored-network-volume`
- `authored-dashboard-network`
- `linear-subgraph-volume`

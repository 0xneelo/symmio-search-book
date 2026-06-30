---
id: "authored-barometer-subgraph-upgrade"
title: "Barometer Subgraph Upgrade"
section: "dashboard-reference"
track: "Volume"
status: "published"
sourceKeys: ["syn-200", "goldsky-subgraphs", "goldsky-graphql-endpoints", "server-volume", "spec-03"]
sourceUrls: ["Linear SYN-200", "https://docs.goldsky.com/subgraphs/introduction", "https://docs.goldsky.com/subgraphs/graph-endpoints", "server/volume.js", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["linear-subgraph-volume", "local-volume-source", "local-volume-snapshots"]
---

# Barometer Subgraph Upgrade

Barometer is the planned accuracy upgrade for network volume. The current dashboard reads cumulative wallet totals from the Vibe backend and snapshots them locally. The Barometer path keeps the same downstream economics, but changes the volume input: trading activity should come from indexed analytics subgraphs instead of the current backend rollup.

The important product point is narrow: Barometer changes the quality of `V` in `V x f x s`; it does not by itself change the revenue formula.

## Current Source Versus Target Source

The current implementation in `server/volume.js` is REST-first. It calls a backend wallet-volume endpoint, caches each wallet result, and exposes normalized totals to the rest of the app. The code explicitly leaves subgraph fallback out of scope for the current version.

The target direction in the grounding spec and Linear research is subgraph-backed volume. Goldsky's public docs describe subgraphs as indexed GraphQL APIs over blockchain data, and its endpoint docs explain the GraphQL access model. That supports the architecture of the upgrade: query a maintained analytics index, then aggregate per trader/wallet into the same network model the dashboard already understands.

## What Must Stay Parked

This page should not invent a final Vibe subgraph endpoint, schema, chain mapping, or venue mapping. The docs can say the intended upgrade is subgraph-backed and that Goldsky-style GraphQL subgraphs are the cited infrastructure pattern. For v1, the public stance is simple: current production source is backend REST wallet totals plus snapshots; Barometer/Goldsky subgraphs are the tracked upgrade.

## Reader Implication

When a user asks why network volume may differ from another dashboard or from a live venue screen, the answer should separate two questions:

1. Which source powers the current product today?
2. Which source is intended to improve accuracy later?

Today the answer is backend wallet totals plus snapshots. The planned answer is subgraph-backed Barometer volume once the implementation and endpoint mapping are confirmed.

## Sources

- `syn-200`: Product research for switching network-volume source from backend rollup to subgraphs.
- `goldsky-subgraphs`: Public subgraph/indexing architecture.
- `goldsky-graphql-endpoints`: Public GraphQL endpoint model.
- `server-volume`: Current REST-first implementation and subgraph fallback note.
- `spec-03`: Grounding note that Barometer is the planned volume-source upgrade.

## Related Pages

- `authored-network-volume`
- `authored-volume-snapshot-cadence`
- `authored-estimated-network-revenue`

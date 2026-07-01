---
id: "authored-symmio-meta-solvers-clearing-layers"
title: "Symmio Meta-Solvers And Clearing Layers"
section: "protocol-reference"
track: "Source Ingestion"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["superflow-she-openapi", "symmio-foundation-metasolver", "symmio-foundation-clearing-layers", "spec-04"]
sourceUrls: ["https://dev.superflow.exchange/openapi.json", "https://docs.symmio.foundation/roadmap-and-vision/symmios-endgame/introducing-meta-solvers", "https://docs.symmio.foundation/roadmap-and-vision/symmios-endgame/blockchains-are-clearing-layers", "_specs/app-docs/04-sources.md"]
relatedGeneratedPages: ["authored-superflow-she-api-boundary", "authored-symmio-clearing-house-layer", "authored-symmio-solver-operations-and-hedging"]
---

# Symmio Meta-Solvers And Clearing Layers

The reconciled v1 SSHE source boundary is the operator-provided SuperFlow/SHE OpenAPI source plus the Symmio Foundation Meta-Solvers material.

The SuperFlow/SHE OpenAPI source proves a hybrid-exchange API surface: markets, orders, account state, positions, funding, authentication, WebSocket streams, and dev/admin controls. The Meta-Solvers source gives the longer-range architecture behind that family of ideas: localized matching nodes, global arbitrage between local pools, and settlement or verification on robust clearing layers rather than a single central matching authority.

The important distinction is physical. A global order book has to fight latency and co-location incentives. The Meta-Solvers source instead treats locality as a design constraint: local order matching can be fast, while global arbitrage and settlement layers keep the system coherent.

## Publication Boundary

The v1 source-completeness claim is narrow:

- `superflow-she-openapi` covers the SHE API surface supplied by the operator;
- `symmio-foundation-metasolver` covers the Meta-Solvers endgame framing;
- `symmio-foundation-clearing-layers` covers the clearing-layer companion framing.

Do not turn this into a claim that every SHE endpoint is live, public, or used by Vibe. Do not infer production credentials, route ownership, venue mapping, or solver obligations from the source boundary. Treat Meta-Solvers as Symmio endgame architecture context unless implementation-specific sources are added later.

## Reader Implication

When readers ask what SSHE means in this source map, answer with the bounded v1 definition: the registered SHE API source plus Symmio Foundation Meta-Solvers and clearing-layer context. That is enough for v1 source completeness, but not enough to document a live integration contract.

## Sources

- `superflow-she-openapi`: operator-provided SHE OpenAPI source.
- `symmio-foundation-metasolver`: Symmio Foundation Meta-Solvers page.
- `symmio-foundation-clearing-layers`: Symmio Foundation clearing-layer companion page.
- `spec-04`: required source-family list naming SuperFlow / SSHE.

## Related Pages

- `authored-superflow-she-api-boundary`
- `authored-symmio-clearing-house-layer`
- `authored-symmio-solver-operations-and-hedging`

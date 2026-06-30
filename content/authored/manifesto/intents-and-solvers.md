---
id: "authored-intents-and-solvers"
title: "Intents And Solvers"
section: "manifesto"
track: "04 — Mechanism"
status: "published"
sourceKeys: ["vibe-architecture", "symmio-core", "symmio-intent-lifecycle"]
sourceUrls: ["https://docs.vibe.trading/architectural-overview.md", "https://docs.symm.io/getting-started/core-concepts.md", "https://docs.symm.io/liquidity-provider-documentation/core-concepts/intent-lifecycle-and-event-monitoring.md"]
relatedGeneratedPages: ["vibe-architecture-amfq", "symmio-core-concepts", "symmio-intent-lifecycle"]
---

# Intents And Solvers

An intent is a user's expressed trading objective before a final counterparty has accepted it. In the Symmio and Vibe framing, the user asks for a trade, solvers evaluate the request, and the accepted path proceeds through the protocol's settlement and lifecycle machinery.

The solver is not decorative infrastructure. It is the actor that prices flow, takes or routes risk, monitors lifecycle events, and decides whether the requested trade is worth accepting. Public Vibe architecture material describes an intent-based quotation flow with solver offers and on-chain execution. Symmio's core concepts and lifecycle documentation supply the protocol vocabulary around PartyA, PartyB, collateral, and event monitoring.

The product challenge is that this architecture can feel less direct than clicking into a live book. The payoff is that it can support markets that do not yet have a clean book. The docs should explain both sides plainly: intents introduce routing and solver UX, but they also let a market exist before synchronous liquidity is mature.

## Reader Implication

Traders should understand that they are requesting a priced outcome. Solvers and LPs should understand that their job is not only to quote, but to operate risk infrastructure around lifecycle events.

## Sources

- `vibe-architecture`: Vibe architectural overview.
- `symmio-core`: Symmio core concepts.
- `symmio-intent-lifecycle`: Symmio intent lifecycle and event monitoring.

## Related Pages

- `authored-symmio-party-a-party-b`
- `authored-vibe-trade-flow`
- `symmio-intent-lifecycle`

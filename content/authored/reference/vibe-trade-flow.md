---
id: "authored-vibe-trade-flow"
title: "Vibe Trade Flow"
section: "product-reference"
track: "Trading Flow"
status: "published"
sourceKeys: ["vibe-architecture", "symmio-core", "symmio-intent-lifecycle"]
sourceUrls: ["https://docs.vibe.trading/architectural-overview.md", "https://docs.symm.io/getting-started/core-concepts.md", "https://docs.symm.io/liquidity-provider-documentation/core-concepts/intent-lifecycle-and-event-monitoring.md"]
relatedGeneratedPages: ["vibe-architecture-amfq", "symmio-core-concepts", "symmio-intent-lifecycle"]
---

# Vibe Trade Flow

The user-facing flow is simple: a trader expresses what they want, solvers respond with executable terms, and the accepted trade proceeds into the protocol lifecycle. The implementation details are deeper, but the mental model is request, quote, accept, settle, monitor.

Vibe's public architecture source frames the front half as an intent-based quotation process. Symmio's protocol sources frame the settlement side with PartyA, PartyB, collateral, and lifecycle events. The compendium should connect those two layers on every trading page: Vibe makes the product legible; Symmio gives the trade its protocol structure.

This also explains why solver quality matters to UX. A better solver path can quote faster, hedge better, handle more markets, and produce a tighter experience. A weak solver path creates delay, rejection, poor pricing, or brittle lifecycle handling.

## Reader Implication

For a trader, "trade flow" should answer what happens after submitting an intent. For a solver, it should identify where quoting, risk checks, event monitoring, hedging, and settlement responsibility enter the system.

## Sources

- `vibe-architecture`: Vibe architectural overview.
- `symmio-core`: Symmio core concepts.
- `symmio-intent-lifecycle`: Symmio intent lifecycle and event monitoring.

## Related Pages

- `authored-intents-and-solvers`
- `authored-symmio-party-a-party-b`
- `vibe-architecture-amfq`

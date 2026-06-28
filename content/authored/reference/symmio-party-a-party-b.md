---
id: "authored-symmio-party-a-party-b"
title: "PartyA And PartyB"
section: "protocol-reference"
track: "Symmio Core"
status: "publication-candidate"
sourceKeys: ["symmio-core", "symmio-intent-lifecycle"]
sourceUrls: ["https://docs.symm.io/getting-started/core-concepts.md", "https://docs.symm.io/liquidity-provider-documentation/core-concepts/intent-lifecycle-and-event-monitoring.md"]
relatedGeneratedPages: ["symmio-core-concepts", "symmio-intent-lifecycle"]
---

# PartyA And PartyB

Symmio names the two sides of an intent-based derivatives trade with protocol roles. PartyA is the trader/requester side. PartyB is the solver or counterparty side that accepts, prices, hedges, and manages the other side of the position.

That vocabulary matters because it prevents the docs from flattening the protocol into "user versus exchange." Symmio is better understood as a clearing and settlement layer where applications can present different products while the protocol tracks roles, collateral, margin, and lifecycle state.

For Vibe, the PartyA/PartyB model explains why solvers are central. The user-facing product can feel like a trading app, but the market is sustained by professional counterparties deciding what flow to accept and how to manage the exposure after acceptance.

## Reader Implication

When a page says "trader", ask whether it means PartyA. When it says "solver", "market maker", or "counterparty", ask whether it means PartyB. The distinction controls how margin, settlement, liquidation, hedging, and responsibility should be explained.

## Sources

- `symmio-core`: Symmio core concepts.
- `symmio-intent-lifecycle`: Symmio intent lifecycle and event monitoring.

## Related Pages

- `authored-intents-and-solvers`
- `authored-vibe-trade-flow`
- `symmio-core-concepts`

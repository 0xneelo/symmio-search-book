---
id: "authored-liquidations-as-inventory-reallocation"
title: "Liquidations As Inventory Reallocation"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/03-core-concepts#the-core-invariant-why-vibe-is-different"]
relatedGeneratedPages: ["section-15-funding-model-15-docs-03-core-concepts-the-core-invariant-why-vibe-is-different", "neelo-15-funding-model-15-docs-03-core-concepts", "authored-funding-core-invariant"]
---

# Liquidations As Inventory Reallocation

Neelo's funding model frames Vibe's core invariant this way: liquidations are inventory reallocations, not automatic loss events.

That phrasing should be handled carefully. It does not mean liquidation is pleasant for the trader. It does not mean every market is profitable for LPs. It means the source model is not using the same risk intuition as a lending protocol where liquidation failure can directly create bad debt. In the Vibe framing, liquidations can transfer collateral and position inventory through the solver or LP stack, which then manages exposure with fees, funding, spreads, hedging, and defense layers.

The useful distinction is between system solvency and user outcome. A trader can lose margin while the system becomes safer. A liquidation can reduce dangerous exposure rather than create a new hole. Faster liquidation can therefore be a risk-control feature when the market is designed so the resulting inventory is absorbed, priced, or unwound through the solver-side stack.

## Why It Changes The Funding Story

If readers import the wrong analogy, they will think aggressive funding or liquidation activity is always a solvency-warning siren. Neelo's model says the more precise question is: what does liquidation do to inventory, exposure, and residual risk after the event?

If liquidation reduces uncovered exposure and moves inventory into a managed stack, it can support the control loop. If liquidation leaves the system with unhedged, illiquid, or improperly priced exposure, then additional defenses are needed. The invariant is not "liquidations are good." It is "liquidations must be understood as inventory and risk movement inside the market-control system."

## Publication Boundary

Final public docs should connect this concept to actual Vibe and Symmio liquidation mechanics only after implementation review confirms thresholds, collateral movement, solver rights, LP exposure, and accounting treatment. Until then, this page is a source-model explanation.

## Sources

- `vibe-papers`: Neelo, "The Core Invariant: Why Vibe Is Different".

## Related Pages

- `authored-funding-core-invariant`
- `authored-funding-risk-inversion`
- `authored-loss-waterfall-and-profit-caps`

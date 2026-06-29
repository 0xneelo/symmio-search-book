---
id: "authored-perp-framework-implications"
title: "What The Perp Framework Implies"
section: "manifesto"
track: "01 - Perps Categories & Bootstrap Trilemma"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-02-bootstrap-and-proof-of-value"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/02-framework#2-6-framework-implications"]
relatedGeneratedPages: ["section-01-perp-classes-zscore-01-docs-02-framework-2-6-framework-implications"]
---

# What The Perp Framework Implies

The framework implications section turns taxonomy into strategy. Its core claim is that no static quadrant solves permissionless market creation, capital efficiency, and reliable counterparty support at the same time.

That is why the source moves from categorization to lifecycle. A bootstrap market may need asynchronous execution and stronger collateralization because there is not enough natural flow yet. As the market matures, the same market should be able to move toward tighter netting, better efficiency, and eventually order-book-style execution.

Insurance topology follows the same lifecycle logic. New markets should be isolated enough that a bad long-tail listing does not infect the rest of the system. Proven markets can justify more shared collateral or cross-margin behavior because there is more evidence that their risk is legible.

The industry gap follows from this. If order-book systems are efficient but cannot create first liquidity, and collateralized systems can support one-sided flow but struggle to scale, then the missing architecture is dynamic traversal between states.

## Publication Boundary

This page states the source's architecture implication. Do not turn it into a live claim about final Vibe graduation thresholds, automatic market movement, Hyperliquid/GMX current listing policy, or production insurance rules without operator/product/risk review.

## Sources

- `vibe-papers`: Neelo, "Section 2: A Framework for Categorizing Perpetual Protocols: 2.6 Framework Implications".

## Related Pages

- `authored-temporal-separation-of-concerns`
- `authored-four-transitions`
- `authored-market-maturation-state-map`
- `authored-bootstrap-trilemma`

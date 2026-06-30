---
id: "authored-market-maturation-z-score"
title: "Market Maturation And The Z-Score"
section: "manifesto"
track: "06 — Market Creation Architecture"
status: "published"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/05-vibe-architecture#5-4-the-market-maturation-process", "https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/05-vibe-architecture#5-5-the-z-score-measuring-market-maturity"]
relatedGeneratedPages: ["section-01-perp-classes-zscore-01-docs-05-vibe-architecture-5-4-the-market-maturation-process", "section-01-perp-classes-zscore-01-docs-05-vibe-architecture-5-5-the-z-score-measuring-market-maturity"]
---

# Market Maturation And The Z-Score

The Z-score gives the market-creation thesis a measurable axis. Instead of treating launch and listing as binary events, Neelo's model tracks how much a market still depends on the solver as residual counterparty.

In the source model, the Z-score compares net solver exposure to total open interest. A high score means the market is one-sided and solver-dependent. A low score means trader flow is naturally balancing and the solver's residual role is shrinking.

That metric supports a maturation story:

- bootstrap markets are functional but heavily solver-dependent;
- early growth markets start to show natural flow;
- growth markets have enough offsetting interest to tighten spreads;
- mature markets become candidates for order-book activation;
- fully netted markets can behave more like conventional high-efficiency venues.

## Publication Note

This is a vision metric unless the operator confirms where, if anywhere, it appears in the live product. The current compendium should explain Z-score as Neelo's market-maturity model, not as a live dashboard number.

## Sources

- `vibe-papers`: Neelo, "Section 5: Vibe Trading Architecture: 5.4 The Market Maturation Process".
- `vibe-papers`: Neelo, "Section 5: Vibe Trading Architecture: 5.5 The Z-Score: Measuring Market Maturity".

## Related Pages

- `authored-four-transitions`
- `authored-solver-owned-market-maker`
- `authored-volume-02-bootstrap-and-proof-of-value`

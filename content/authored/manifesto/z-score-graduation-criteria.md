---
id: "authored-z-score-graduation-criteria"
title: "Z-Score Graduation Criteria"
section: "manifesto"
track: "06 — Market Creation Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-02-bootstrap-and-proof-of-value"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/05-vibe-architecture#5-5-the-z-score-measuring-market-maturity", "https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/07-industry-implications"]
relatedGeneratedPages: ["section-01-perp-classes-zscore-01-docs-05-vibe-architecture-5-5-the-z-score-measuring-market-maturity", "section-01-perp-classes-zscore-01-docs-07-industry-implications-7-2-transforming-the-listing-process", "authored-market-maturation-z-score"]
---

# Z-Score Graduation Criteria

The Z-score is Neelo's proposed way to measure whether a market still depends on the solver as residual counterparty. The source defines it as net solver exposure divided by total open interest. A high score means the market is one-sided and solver-dependent. A low score means natural trader flow is doing more of the balancing work.

That makes the Z-score a graduation signal. If a market shows sustained low solver dependency, adequate volume, enough unique traders, manageable liquidation behavior, and stable funding dynamics, it can move toward tighter spreads, greater netting, and eventually order-book readiness.

## What It Should Not Do

The Z-score should not be presented as a live public dashboard number unless product owners confirm the implementation. The source provides the model, ranges, and maturity story, but exact thresholds, time windows, and transition rules still require calibration against real markets.

The docs should therefore explain two layers:

- the thesis layer: solver dependency should fall as markets mature;
- the product layer: any live graduation metric needs confirmed formula, source, update cadence, and publication status.

## Reader Implication

This page gives market creators and exchanges a concrete question to ask: is demand balanced enough that the market has earned its next execution layer? That is stronger than asking whether a listing committee feels confident.

## Sources

- `vibe-papers`: Neelo, "Section 5: Vibe Trading Architecture: 5.5 The Z-Score".
- `vibe-papers`: Neelo, "Section 7: Industry Implications".

## Related Pages

- `authored-market-maturation-z-score`
- `authored-vibe-as-discovery-layer`
- `section-01-perp-classes-zscore-01-docs-05-vibe-architecture-5-5-the-z-score-measuring-market-maturity`

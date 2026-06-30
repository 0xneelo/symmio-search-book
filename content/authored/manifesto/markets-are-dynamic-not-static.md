---
id: "authored-markets-are-dynamic-not-static"
title: "Markets Are Dynamic, Not Static"
section: "manifesto"
track: "01 - Perps Categories & Bootstrap Trilemma"
status: "published"
volumeId: "volume-02-bootstrap-and-proof-of-value"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/09-conclusion#9-2-key-insights"]
relatedGeneratedPages: ["section-01-perp-classes-zscore-01-docs-09-conclusion-9-2-key-insights", "authored-market-maturation-state-map", "authored-temporal-separation-of-concerns"]
---

# Markets Are Dynamic, Not Static

The key insight in Neelo's conclusion is that markets change state. A new market needs a defined counterparty, asynchronous access, provided capital, and contained risk. A mature market can tolerate more netting, synchronized execution, optimized capital, and distributed risk.

That is the reason static perp architecture is brittle. An order book can be excellent after a market has two-sided flow, but weak when the first trader arrives before the other side. A collateralized vault can make a market available early, but it pays for that availability with capital drag and risk concentration. A design that treats every market as if it were already mature or permanently immature misprices the lifecycle.

Vibe's architecture thesis is therefore not only "hybrid." It is state-aware. It asks what the market needs now, what it can earn later, and what evidence should trigger a change.

## Reader Implication

When a reader asks why Vibe needs solvers, Z-score, isolated risk, or eventual order-book graduation, start here. Those are not separate features. They are responses to changing market maturity.

## Sources

- `vibe-papers`: Neelo, "Section 9: Conclusion: 9.2 Key Insights".

## Related Pages

- `authored-market-maturation-state-map`
- `authored-temporal-separation-of-concerns`
- `authored-order-books-as-graduation-layer`

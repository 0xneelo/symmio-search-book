---
id: "authored-rfq-before-order-book"
title: "RFQ Before Order Book"
section: "manifesto"
track: "04 — Ode to OrderBooks"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-03-listing-power-and-orderbooks"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/04-ode-to-the-orderbook/04-docs/03-vibe-as-bootstrap-layer", "https://0xneelo.github.io/vibe_docs/docs/04-ode-to-the-orderbook/04-docs/09-conclusion"]
relatedGeneratedPages: ["neelo-04-ode-to-the-orderbook-04-docs-03-vibe-as-bootstrap-layer", "neelo-04-ode-to-the-orderbook-04-docs-09-conclusion", "authored-intents-complete-order-books"]
---

# RFQ Before Order Book

The conclusion of the Ode to OrderBooks source is compact: the future is not RFQ versus order book. It is RFQ before order book.

That sequence matters. A new market does not need perfect market structure on day one. It needs executable liquidity, a counterparty model, risk-aware pricing, and a way to discover whether derivatives demand exists. A solver-based intent or RFQ layer can answer that earlier than a full central limit order book.

Vibe's bootstrap layer changes the first question from "can this market support a full book today?" to "can this market start trading and prove itself?" If the market attracts sustained demand, healthier two-sided flow, and lower residual solver dependency, then the order-book question becomes easier and more evidence-based.

## What To Avoid

Do not present RFQ as a permanent replacement for mature execution. The source is sharper than that. RFQ is the early-market mechanism that gives the market time to become worthy of a book.

## Publication Note

Specific routing through internal, external, or intermediate venues needs implementation and operator review. The publishable thesis is the sequence: bootstrap first, graduate later.

## Sources

- `vibe-papers`: Neelo, "Section 3: Vibe as Bootstrap Layer".
- `vibe-papers`: Neelo, "Section 9: Conclusion".

## Related Pages

- `authored-intents-complete-order-books`
- `authored-hybrid-solver-liquidity-waterfall`
- `authored-z-score-graduation-criteria`

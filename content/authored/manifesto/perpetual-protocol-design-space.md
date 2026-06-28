---
id: "authored-perpetual-protocol-design-space"
title: "The Perpetual Protocol Design Space"
section: "manifesto"
track: "03 — Market Argument"
status: "publication-candidate"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/02-framework"]
relatedGeneratedPages: ["neelo-01-perp-classes-zscore-01-docs-02-framework", "authored-bootstrap-trilemma", "authored-four-transitions", "authored-order-books-as-graduation-layer"]
---

# The Perpetual Protocol Design Space

The compendium should not describe perpetual protocols as if they differ only by branding. Neelo's framework gives readers the vocabulary needed to compare designs: matching engine, collateralization, and insurance topology.

The matching engine asks how trades execute. Synchronous systems, such as order books, need counterparties present at the same time. They are capital efficient and familiar when two-sided flow exists, but they struggle to bootstrap thin markets. Asynchronous systems let a trader execute against a persistent counterparty such as a solver or vault. They can serve one-sided demand, but the counterparty must price and manage the risk.

Collateralization asks who pays winning traders. Netted systems are efficient because longs and shorts pay each other, but they require balanced flow. Fully collateralized systems can handle one-sided flow because an LP or vault backs payouts, but they demand much more capital. Insurance topology asks whether risk is isolated per market or shared across markets. Isolation is safer for new markets; cross-margin becomes attractive after maturity.

The resulting thesis is a lifecycle thesis. Early markets need bootstrap reliability more than maximum efficiency. Mature markets can move toward tighter spreads, better netting, and deeper order-book behavior. Vibe's argument sits in that transition: start where a market can exist, then graduate as the market proves itself.

## Reader Implication

Readers should leave this page able to ask the right architecture questions: is the market synchronous or asynchronous, netted or collateralized, isolated or cross-margin, and is that choice appropriate for the market's maturity?

## Sources

- `vibe-papers`: Neelo, "Section 2: A Framework for Categorizing Perpetual Protocols".

## Related Pages

- `authored-bootstrap-trilemma`
- `authored-four-transitions`
- `authored-order-books-as-graduation-layer`

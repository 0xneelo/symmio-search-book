---
id: "authored-percolator-one-market-one-slab-accounting"
title: "Percolator One-Market-One-Slab Accounting"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/02-percolator-architecture"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-02-percolator-architecture", "authored-slab-isolation-capital-inefficiency", "authored-percolator-engineering-vs-economics"]
---

# Percolator One-Market-One-Slab Accounting

Percolator's basic accounting unit is the slab: one market, one isolated instance.

In Neelo's source, each market has its own slab account, header and config, in-place risk engine, user accounts, LP accounts, and token collateral vault. The key property is isolation. No cross-margin exists across markets, and each market is locally reasoned about through its own balance sheet.

That is a strength for auditability. A local market can be inspected without tracing a global tangle of balances. It is also the root of a capital-design question: if every long-tail market needs separately committed collateral and cannot net risk across markets, breadth can become expensive.

## Reader Implication

"One market, one slab" should be documented as an accounting boundary, not as a complete liquidity strategy. It answers where balances live and how local safety is checked. It does not by itself answer whether many isolated markets can attract enough capital or pay winners under one-sided flow.

## Publication Boundary

Use the slab model as source-level architecture. Do not infer current vault balances, market count, risk settings, or cross-market netting behavior outside the cited source.

## Sources

- `vibe-papers`: Neelo, "Section 2: Percolator Architecture".

## Related Pages

- `authored-slab-isolation-capital-inefficiency`
- `authored-percolator-engineering-vs-economics`
- `authored-long-tail-perp-model-map`

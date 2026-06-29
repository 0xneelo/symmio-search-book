---
id: "authored-vibe-percolator-defense-hierarchy-comparison"
title: "Vibe And Percolator Defense Hierarchy Comparison"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/09-vibe-vs-percolator"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-09-vibe-vs-percolator", "authored-funding-defense-hierarchy", "authored-adl-haircut-controlled-crash"]
---

# Vibe And Percolator Defense Hierarchy Comparison

Neelo's Section 9 compares passive invariant checking with active defense hierarchy.

Percolator's defense path is narrow. Margin is checked, local accounting is conserved, and when imbalance or stress exceeds what the market can handle, ADL or payout haircut becomes the safety valve. The market can remain formally consistent, but the user-facing guarantee can degrade quickly.

Vibe's source model inserts multiple layers before ADL: netting, token inventory, local insurance, global insurance, and only then forced loss socialization. It also adds active controls such as spread widening, funding changes, borrow pricing, size caps, and quote refusal.

## Why Layers Matter

The number of layers matters because long-tail markets fail through clusters, not isolated variables. A volatile token can move fast, oracle confidence can fall, one side of flow can dominate, liquidity can vanish, and hedge execution can degrade at the same time.

A passive system waits for invariant failure or liquidation eligibility. An active defense stack can reduce exposure earlier, make toxic flow more expensive, and decide which resource should absorb the next unit of risk.

## The Caveat

More layers also mean more policy. Docs must eventually explain which layer is used first, which capital belongs to which market, when global insurance can be touched, and when a market is isolated or halted. Until those production rules are approved, this page should stay at the architecture-comparison level.

## Reader Implication

When a reader asks why Vibe treats ADL as last resort, route here. The answer is that ADL is not a primary risk strategy in the Vibe thesis; it is what remains after active pricing, netting, inventory, and insurance fail to absorb the stress.

## Sources

- `vibe-papers`: Neelo, "Section 9: Vibe vs. Percolator - Full Comparison", "9.5 Risk Management and Defense" and "9.7 Capital Efficiency and Liquidation".

## Related Pages

- `authored-funding-defense-hierarchy`
- `authored-adl-haircut-controlled-crash`
- `authored-cross-market-risk-mutualization`

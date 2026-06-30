---
id: "authored-percolator-low-utilization-necessity"
title: "Percolator Low Utilization Is A Safety Signal"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/04-lp-economics-and-leverage"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-04-lp-economics-and-leverage", "authored-one-x-leverage-ceiling", "authored-pump-bankruptcy-arithmetic"]
---

# Percolator Low Utilization Is A Safety Signal

Neelo's Percolator source gives a source-time utilization example: roughly `251.7M` PERC in the vault, roughly `24.7M` PERC of open interest, and about `9.8%` utilization. Treat those figures as an illustrative snapshot from the source, not current live Percolator state.

The source's interpretation is important. Low utilization is not presented as a simple market failure. In a token-margined inverse system, conservative utilization can be a mathematical necessity. If open interest grows too close to token collateral, a relatively small adverse move can consume the LP's collateral.

## Low Utilization Versus Capital Efficiency

This is the tension behind the 1x leverage ceiling. The safer the token-margined vault tries to be, the less capital-efficient it becomes. The more capital-efficient it tries to be, the closer it can move to insolvency under a pump where longs win.

That is why headline vault size is insufficient. A vault can look large, but if safe OI must remain a small fraction of the token inventory, the system may not deliver the leverage or market depth that traders expect from perpetuals.

## Reader Implication

Docs should avoid treating utilization as a one-directional growth metric. In this architecture, low utilization may be evidence of risk containment. The public question is whether the resulting market is economically useful enough after the safety constraint is applied.

## Publication Boundary

Do not publish current PERC vault size, open interest, utilization, deployment status, or live safety state without fresh primary-source review. The durable source-backed lesson is that low utilization can be a safety requirement in token-margined inverse systems, not automatically a product failure.

## Sources

- `vibe-papers`: Neelo, "Section 4: LP Economics and the 1x Leverage Constraint", "4.4.3 Percolator SOV in Practice".

## Related Pages

- `authored-one-x-leverage-ceiling`
- `authored-systemic-leverage-comparison`
- `authored-risk-adjusted-efficiency-multiplier`

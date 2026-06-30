---
id: "authored-risk-alignment-matrix"
title: "The Risk Alignment Matrix"
section: "manifesto"
track: "13 — Proof of Value Framework"
status: "published"
volumeId: "volume-02-bootstrap-and-proof-of-value"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/13-framework-value-permissionless-perps/13-docs/02-framework", "https://0xneelo.github.io/vibe_docs/docs/13-framework-value-permissionless-perps/13-docs/05-economic-clarity"]
relatedGeneratedPages: ["section-13-framework-value-permissionless-perps-13-docs-02-framework-2-2-value-alignment", "section-13-framework-value-permissionless-perps-13-docs-05-economic-clarity-5-2-decomposition-of-perp-fills", "authored-economic-clarity-for-permissionless-perps"]
---

# The Risk Alignment Matrix

The Proof of Value framework does not only ask whether Vibe creates value. It asks whether each risk sits with the party best positioned to understand and manage it.

That is the difference between a useful market and a brittle market. A USDC vault can look simple in a diagram while asking stablecoin LPs to absorb low-cap directional risk they do not naturally want. A token-margined design can look capital efficient until the same asset becomes collateral, inventory, and liability. A permissionless perp market needs a cleaner assignment of responsibilities.

Neelo's framework separates the main risk buckets. Token price exposure belongs closest to token holders or projects that already hold the asset and want the market to exist. Execution and hedging risk belongs with the solver because that is the operational actor pricing, warehousing, and reducing residual imbalance. Trader directional PnL belongs with traders when flow is netted. Liquidation shortfall and tail losses need explicit insurance and ADL rules instead of hidden socialization. USDC deployment belongs with the solver or protocol-operated settlement layer, not a generic pool of yield-seeking stablecoin LPs.

## Why The Matrix Matters

This matrix is the answer to a due-diligence question: who pays when the market moves?

If a long and a short are netted, the answer is trader-to-trader. If the market is imbalanced, the answer is temporarily trader-to-solver, backed by hedging and disclosed liquidity resources. If the move becomes a tail event, the answer should route through the published defense stack. None of those cases should be described with the same vague phrase.

The docs should therefore distinguish inventory risk, settlement risk, hedge execution risk, trader PnL risk, and emergency loss allocation. Vibe's thesis is stronger when these are named separately. The system is not risk-free; it is trying to assign each risk to a more natural bearer.

## Publication Boundary

Exact vault terms, solver funding policy, insurance eligibility, revenue share, and ADL allocation remain operator-review items. This page documents the source-backed risk-allocation framework, not final production parameters.

## Sources

- `vibe-papers`: Neelo, "Section 2: A Framework for Value Dimensions".
- `vibe-papers`: Neelo, "Section 5: Economic Clarity".

## Related Pages

- `authored-economic-clarity-for-permissionless-perps`
- `authored-netting-state-risk-transfer`
- `authored-loss-waterfall-and-profit-caps`

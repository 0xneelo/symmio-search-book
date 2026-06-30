---
id: "authored-internal-netting-before-external-execution"
title: "Internal Netting Before External Execution"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-as-residual-counterparty/solver-as-residual-counterparty"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-solver-as-residual-counterparty-solver-as-residual-counterparty", "authored-residual-counterparty-hedge-first", "authored-netting-state-risk-transfer", "authored-funding-defense-hierarchy"]
---

# Internal Netting Before External Execution

The residual-counterparty DDQ source names opposing trader flow as a hedge source. If longs and shorts exist at the same time, the solver can net those positions internally and reduce how much must be bought or sold through external liquidity.

This is not a cosmetic optimization. In low-cap markets, every unnecessary external hedge can create price impact, reveal demand, or invite adverse selection. Internal netting lets the system reduce residual delta before it touches a thinner venue.

## Partial Netting Is Normal

The practical case is usually partial. Some flow can net against opposing demand, while the remaining imbalance still needs inventory, controlled external execution, wider pricing, or tighter risk limits.

That is why the docs should distinguish two questions. "Who bears PnL?" is the netting-state risk-transfer question. "How much external execution is needed?" is the execution question. Internal netting helps with both, but it does not remove all residual exposure when the market is one-sided.

## Reader Implication

When a user asks why Vibe-style markets can operate before a deep order book exists, one answer is internal offsetting. The system can use actual opposing trader flow first, then route only the unresolved residual through inventory or external venues.

## Publication Boundary

This page explains the DDQ model for netting before external execution. It should not publish final netting engine rules, external venue routing, TWAP parameters, solver inventory limits, or execution guarantees without operator, implementation, risk, and security review.

## Sources

- `vibe-papers`: Neelo DDQ, "Solver as residual counterparty".

## Related Pages

- `authored-netting-state-risk-transfer`
- `authored-residual-counterparty-hedge-first`
- `authored-funding-defense-hierarchy`

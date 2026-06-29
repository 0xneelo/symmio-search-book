---
id: "authored-two-mode-utilization-rationale"
title: "Why The Funding Model Needs Two Utilization Modes"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/05-utilization-modes#why-two-modes", "https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/05-utilization-modes#comparison-two-mode-system"]
relatedGeneratedPages: ["section-15-funding-model-15-docs-05-utilization-modes-why-two-modes", "section-15-funding-model-15-docs-05-utilization-modes-comparison-two-mode-system", "authored-utilization-modes-inventory-insurance"]
---

# Why The Funding Model Needs Two Utilization Modes

Neelo's funding model uses two utilization modes because a single number cannot tell the system which defense layer is actually binding.

The first mode measures exposure against token inventory. This is the normal inventory constraint: how much market exposure is being carried relative to the tokens or market-specific inventory available to manage it. It is immediate, operational, and useful for ordinary pricing pressure.

The second mode measures expected loss against insurance budget. This is a tail-risk constraint. It matters when exposure has moved beyond the ordinary inventory frame and the question becomes whether local or eligible shared insurance can absorb the modeled stress. The source comparison treats this mode as more aggressive: it can activate insurance spend and ADL consideration where token-inventory mode does not.

## Why One Mode Is Not Enough

If the system only measured token inventory, it would struggle to distinguish "slightly past inventory but still defensible" from "insurance is nearly exhausted." If it only measured insurance, it would overuse tail-risk language for ordinary inventory pressure.

The two-mode design lets the market communicate state. Inside inventory, spreads and funding can respond moderately to utilization. When insurance becomes the binding constraint, the system can shift to stronger responses: sharper pricing, active insurance use, or ADL proximity.

For traders, the implication is that costs can rise before a hard emergency because the market is trying to move flow away from danger. For LPs and treasuries, the implication is that inventory contribution and insurance contribution are separate risk roles. For solvers, the implication is that the system needs to know whether it is managing ordinary imbalance or tail exposure.

## Publication Boundary

This page should not publish live utilization thresholds, ADL triggers, insurance allocations, or spread formulas without implementation and operator review. The source-backed public claim is the structural one: token inventory and insurance budget are different constraints, so the funding model tracks them separately.

## Sources

- `vibe-papers`: Neelo, "Why Two Modes?".
- `vibe-papers`: Neelo, "Comparison: Two-Mode System".

## Related Pages

- `authored-utilization-modes-inventory-insurance`
- `authored-funding-adl-trigger-and-target`
- `authored-funding-stress-demand-and-insurance-spend`

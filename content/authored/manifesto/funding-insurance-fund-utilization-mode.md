---
id: "authored-funding-insurance-fund-utilization-mode"
title: "Funding Insurance-Fund Utilization Mode"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/05-utilization-modes#mode-2-insurance-fund-utilization", "https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/05-utilization-modes#mode-switching-logic"]
relatedGeneratedPages: ["section-15-funding-model-15-docs-05-utilization-modes-mode-2-insurance-fund-utilization", "section-15-funding-model-15-docs-05-utilization-modes-mode-switching-logic", "authored-utilization-modes-inventory-insurance"]
---

# Funding Insurance-Fund Utilization Mode

Insurance-fund utilization is the second mode in Neelo's two-mode funding model. It activates when exposure exceeds token inventory and the system must ask whether the remaining modeled loss can be absorbed by insurance capacity.

The source defines this mode as an exposure-loss estimate divided by an insurance budget. The loss estimate can use Aenigma, volatility adjustment, or another reviewed risk horizon. The insurance budget can combine local insurance and any eligible global allocation, subject to risk fractions and spend caps.

This mode is more urgent than ordinary token-inventory utilization. Once the market is beyond token coverage, the question is no longer only "how scarce is inventory?" It becomes "how much of the defense budget would the modeled stress consume?" That is why the source treats insurance mode as a zone for aggressive pricing, active insurance use, and proximity to ADL if utilization approaches or exceeds the budget.

## Why Mode Switching Uses The Binding Constraint

The source's mode-switching logic uses token-inventory utilization while exposure is inside token coverage. Once exposure exceeds coverage, it considers insurance-fund utilization and uses the more urgent constraint for pricing. This prevents the system from underpricing stress simply because one metric still looks manageable.

For traders, insurance mode explains why terms can become sharply directional after inventory coverage is exceeded. For LPs, it explains why insurance is not a guarantee of normal operation; it is a scarce defense layer. For operators, it identifies the state where public risk language needs to be especially careful.

## Publication Boundary

This page should not publish live insurance fractions, loss-estimate formulas, safety quantiles, eligible global allocation rules, or ADL thresholds without operator and implementation review. It explains the source-model state transition from inventory pressure to defense-budget pressure.

## Sources

- `vibe-papers`: Neelo, "Mode 2: Insurance Fund Utilization".
- `vibe-papers`: Neelo, "Mode Switching Logic".

## Related Pages

- `authored-utilization-modes-inventory-insurance`
- `authored-funding-insurance-safety-budgets`
- `authored-funding-adl-trigger-and-target`

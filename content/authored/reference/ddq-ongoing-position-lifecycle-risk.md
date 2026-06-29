---
id: "authored-ddq-ongoing-position-lifecycle-risk"
title: "DDQ Ongoing Position Lifecycle Risk"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/tl-dr-economic-outcomes"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-tl-dr-economic-outcomes", "authored-vibe-account-health-and-liquidations", "authored-funding-defense-hierarchy"]
---

# DDQ Ongoing Position Lifecycle Risk

After execution and imbalance management, the DDQ walkthrough describes the ongoing position lifecycle: mark-to-market, funding, liquidations, and extreme-condition controls.

During normal operation, risk is primarily with traders through margin, account balance, funding payments, and liquidation. A position that moves against the trader consumes margin. If it breaches maintenance requirements, liquidation can reduce or close the exposure.

## Solver And LP Exposure Is Residual

The source is careful not to say the solver or LPs are always bearing every live position. Solver and LP exposure is tied to residual hedge imperfections and system-tail events.

That means ongoing risk has two layers:

- ordinary position risk, where traders' margin and liquidation rules handle directional PnL;
- residual system risk, where imperfect hedges, liquidity gaps, discontinuities, or tail events can reach solver resources, LP capacity used for hedging, insurance, or last-resort exposure controls.

This framing is important for public docs because it avoids both extremes. It does not pretend that traders are insulated from their own leverage, and it does not hide that a permissionless long-tail market needs backstops for abnormal states.

## Reader Implication

When readers ask who holds risk while a trade is open, answer by state. If the position is ordinary and margin is sufficient, the trader is the primary risk holder. If the market has residual imbalances, hedge imperfections, or tail stress, the solver/LP/waterfall layers matter according to the documented risk model.

## Publication Boundary

Do not publish final mark-price formulas, funding cadence, liquidation thresholds, ADL availability, insurance triggers, hedge-quality metrics, or position-lifecycle automation without operator and implementation review. The source-backed claim is the allocation of ordinary position risk to traders and residual system risk to the solver-side risk stack.

## Sources

- `vibe-papers`: Neelo DDQ, "TL;DR economic outcomes".

## Related Pages

- `authored-vibe-account-health-and-liquidations`
- `authored-funding-defense-hierarchy`
- `authored-market-tier-loss-limits`
- `neelo-08-due-diligence-questionnaire-08-docs-tl-dr-economic-outcomes`

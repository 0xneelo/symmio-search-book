---
id: "authored-lp-vault-capacity-exposure-boundary"
title: "LP Vault Capacity Exposure Boundary"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/risk-walkthrough/a-bearer-of-losses/i-bearer-of-losses", "https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/tl-dr-economic-outcomes", "https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/attractiveness-for-lps/attractiveness-for-lps"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-risk-walkthrough-a-bearer-of-losses-i-bearer-of-losses", "neelo-08-due-diligence-questionnaire-08-docs-tl-dr-economic-outcomes", "neelo-08-due-diligence-questionnaire-08-docs-attractiveness-for-lps-attractiveness-for-lps", "authored-token-lp-attractiveness-model"]
---

# LP Vault Capacity Exposure Boundary

The DDQ does not make LP vault capacity an abstract yield source. It can be part of the economic backing for residual exposure when the solver uses vault liquidity under the system's risk rules.

That boundary should be stated carefully. LP vault capacity is not the first loss layer. Losing traders pay first through margin and balance. The solver's hedging resources come next. LP capacity becomes relevant to the extent the solver has borrowed, used, or relied on vault liquidity for hedging operations. It is therefore tied to documented vault terms and protocol risk limits, not an unlimited claim on LP assets.

## Why The Boundary Matters

For LPs, the central diligence question is not only "what yield do I earn?" It is "when can my capacity be economically exposed?"

The source model answers that exposure comes from the residual, un-netted part of the market. If trader flow is naturally netted, PnL transfers between traders. If the solver must warehouse an imbalance, it may use inventory and vault capacity to back or hedge the position. In a sharp adverse move, any vault capacity used in that hedge stack can be part of the buffer before insurance is touched.

## Not The Same As A Generic USDC Pool

This boundary also supports the broader Vibe LP thesis. The DDQ LP material distinguishes solver-funded stablecoin operations from token-side vault participation. The public docs should avoid collapsing those into one generic "LP pays losses" story.

The safer answer is conditional: LP vault capacity can be exposed when it is actually used to support the solver's residual exposure, and only according to the risk rules and vault terms that govern that market.

## Publication Boundary

Exact vault borrowing rights, withdrawal rules, covered-call exposure, liquidation rights, collateral priority, insurance offsets, and LP loss-ordering remain operator and implementation review items. This page documents the DDQ boundary, not final vault legal or production terms.

## Sources

- `vibe-papers`: Neelo DDQ, "Bearer of Losses".
- `vibe-papers`: Neelo DDQ, "TL;DR economic outcomes".
- `vibe-papers`: Neelo DDQ, "Attractiveness for LPs".

## Related Pages

- `authored-token-lp-attractiveness-model`
- `authored-solver-hedging-resource-buffer`
- `authored-loss-waterfall-and-profit-caps`

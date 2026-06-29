---
id: "authored-symm-lp-economic-channels"
title: "SYMM LP Economic Channels"
section: "protocol-reference"
track: "Solver And LP Economics"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/02-case-context-and-setup", "https://0xneelo.github.io/vibe_docs/docs/12-case-study-symm-lp/12-docs/03-performance-and-unit-economics"]
relatedGeneratedPages: ["section-12-case-study-symm-lp-12-docs-02-case-context-and-setup-2-6-economic-channels-in-scope", "section-12-case-study-symm-lp-12-docs-03-performance-and-unit-economics-3-6-revenue-attribution-qualitative", "authored-symm-lp-unit-economics"]
---

# SYMM LP Economic Channels

The SYMM LP case-study setup names four economic channels in scope: trader directional losses, funding transfers from persistent long positioning, trading fees from activity, and liquidation-related cashflows.

The important point is that the case is not only a fee-volume story. The source reports low total volume relative to the headline result, so the reader has to understand skew, funding, and user-side PnL transfer as part of the mechanism.

## Channel By Channel

Trader directional losses are the dominant case-study intuition. In a long-skew market where price declines, long traders can lose and the LP side can benefit.

Funding transfers matter when positioning is persistent. A crowded side can pay the other side or the solver-side system depending on the funding design and market state.

Trading fees still matter, but the source warns against explaining this case only through high turnover. Activity was not large enough to make simple fee volume the full story.

Liquidation-related cashflows can matter when leveraged positions cross thresholds, but final public wording needs implementation and accounting review before treating liquidation revenue as a settled live LP claim.

## Reader Implication

When readers ask where the LP result came from, avoid a one-factor answer. The case-study mechanism is a stack of channels. A mature report should separate directional PnL transfer, funding, trading fees, liquidation cashflows, and marked versus realized components.

That separation is what turns the case from marketing into diligence material.

## Publication Boundary

Do not publish final attribution percentages, liquidation-revenue treatment, funding-share terms, fee-share terms, tax/accounting treatment, or live LP distribution rules without operator/accounting/legal review. The source-backed claim is the set of channels in scope for interpreting the case.

## Sources

- `vibe-papers`: Neelo, "Case Context and Setup".
- `vibe-papers`: Neelo, "Performance and Unit Economics".

## Related Pages

- `authored-symm-lp-unit-economics`
- `authored-symm-lp-low-volume-driver`
- `authored-lp-profit-and-dynamic-pricing`
- `section-12-case-study-symm-lp-12-docs-02-case-context-and-setup-2-6-economic-channels-in-scope`

---
id: "authored-loss-waterfall-and-profit-caps"
title: "Loss Waterfall And Tail-Event Profit Caps"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "publication-candidate-needs-operator-review"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/risk-walkthrough/a-bearer-of-losses/i-bearer-of-losses", "https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/risk-walkthrough/a-bearer-of-losses/ii-balancing-ux-vs-risk", "https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/10-defense-hierarchy"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-risk-walkthrough-a-bearer-of-losses-i-bearer-of-losses", "neelo-08-due-diligence-questionnaire-08-docs-risk-walkthrough-a-bearer-of-losses-ii-balancing-ux-vs-risk", "authored-funding-defense-hierarchy", "authored-solver-hedging-failure-modes"]
---

# Loss Waterfall And Tail-Event Profit Caps

The DDQ loss waterfall answers a hard question: who bears losses when a market moves sharply against expectations?

The model starts with losing traders. In normal operation, trader margin and balances on the losing side pay the winning side. If the move is too fast or too discontinuous for that to cover the imbalance, losses can move into solver hedging resources, LP vault capacity used for hedging, local insurance, and then the market's allocation of global insurance.

## Tail-Event Profit Caps

The DDQ explicitly treats profit caps as tail-event tools, not normal UX. The cap exists for catastrophic gaps, manipulation, discontinuous pricing, or other states where standard liquidation and hedging cannot safely clear.

The key economic idea is bounded loss propagation. A permissionless system cannot promise unlimited payouts from markets that may be adversarial, newly launched, or extremely thin. If a market has limited liquidity, limited local insurance, and no global insurance allocation, the maximum realizable payout should be bounded by the resources actually available to that market.

## Maturation Path

The same source gives a useful maturity model. New markets can begin close to fully backed protocol-side collateralization, then become more capital efficient as liquidity, liquidation history, price formation, and market integrity improve. Better UX should be earned by market behavior, not assumed at launch.

## Publication Note

This page should not publish exact production caps, percentages, global-insurance allocation rules, or market-tier policy without operator review. It documents the source model and the reader-facing risk vocabulary.

## Sources

- `vibe-papers`: Neelo DDQ, "Bearer of Losses" and "Balancing UX vs Risk".
- `vibe-papers`: Neelo funding model, "Defense Hierarchy".

## Related Pages

- `authored-funding-defense-hierarchy`
- `authored-solver-hedging-failure-modes`
- `authored-economic-clarity-for-permissionless-perps`
- `neelo-08-due-diligence-questionnaire-08-docs-risk-walkthrough-a-bearer-of-losses-i-bearer-of-losses`

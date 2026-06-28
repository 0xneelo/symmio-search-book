---
id: "authored-strategic-unhedged-exposure-boundary"
title: "Strategic Unhedged Exposure Boundary"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-worst-case-scenarios/b-hedging-risks/hedging-risk-considerations", "https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/risk-walkthrough/a-bearer-of-losses/ii-balancing-ux-vs-risk"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-b-hedging-risks-hedging-risk-considerations", "neelo-08-due-diligence-questionnaire-08-docs-risk-walkthrough-a-bearer-of-losses-ii-balancing-ux-vs-risk", "authored-market-maturation-risk-posture"]
---

# Strategic Unhedged Exposure Boundary

The DDQ source separates two ideas that should not be collapsed: a solver failing to hedge, and a solver intentionally carrying limited exposure.

Failure means the solver is trapped in risk it cannot safely back, price, or unwind. Strategic unhedged exposure means the solver chooses, inside defined limits, to warehouse some risk because the market is mature enough, inventory is sufficient, or expected PnL justifies the balance-sheet use.

## Why It Is Not The VibeCap Baseline

The source is clear that newly listed low-cap markets are hedge-first. The solver should price risk, establish backing inventory, or refuse before accepting residual exposure. Strategic unhedged exposure belongs, if anywhere, in higher-integrity markets where the solver has stronger data and explicit risk limits.

This is also how the collateralization mental model fits. A market can begin closer to fully backed protocol-side exposure and then become more capital efficient as liquidity, liquidation history, price integrity, and confidence improve. Unhedged exposure is a maturity privilege, not an early-market default.

## Reader Implication

For LPs, the boundary prevents a false guarantee and a false fear. The system is not promising that no solver ever holds risk. It is also not saying every cold market is allowed to run naked exposure from day one.

For traders, this explains why mature markets can feel more permissive than new markets. Better market evidence can support looser terms; fragile markets should remain tighter.

## Publication Boundary

Do not publish final unhedged-exposure allowances, solver inventory limits, confidence scores, leverage schedules, or market-maturity thresholds without operator and implementation review. The source-backed claim is the boundary: unhedged exposure is strategic and limited, not the default failure state for VibeCaps.

## Sources

- `vibe-papers`: Neelo DDQ, "Solver Hedging Risk Considerations".
- `vibe-papers`: Neelo DDQ, "Balancing UX vs Risk".

## Related Pages

- `authored-market-maturation-risk-posture`
- `authored-conservative-launch-collateralization`
- `authored-solver-hedging-failure-modes`
- `neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-b-hedging-risks-hedging-risk-considerations`

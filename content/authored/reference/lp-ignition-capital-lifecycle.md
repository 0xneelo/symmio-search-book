---
id: "authored-lp-ignition-capital-lifecycle"
title: "LP Deposits As Ignition Capital"
section: "protocol-reference"
track: "Solver And LP Economics"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/attractiveness-for-lps/attractiveness-for-lps"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-attractiveness-for-lps-attractiveness-for-lps", "authored-token-lp-attractiveness-model", "authored-market-maturation-risk-posture"]
---

# LP Deposits As Ignition Capital

The DDQ's LP section frames LP deposits as ignition capital. At launch, deposits provide the initial liquidity and hedging capacity that lets a market quote before it has deep two-sided flow.

That role is stage-specific. In the bootstrapped stage, execution is more asynchronous, conservative risk limits matter more, and the solver may rely more heavily on LP capacity and inventory. In the maturing stage, more longs and shorts can net against each other, liquidity improves, and protocol-side collateralization can decrease. In the mature stage, the market should look more like trader-to-trader settlement, with the solver focused on pricing, matching, and risk controls rather than acting as the balance sheet for every fill.

## Why This Matters

This distinction prevents a misleading LP story. The goal is not for every market to remain permanently dependent on fresh LP deposits. The healthier path is for LP deposits to help a market start, then for real trading activity and opposing flow to reduce the system's balance-sheet burden.

That is why the source compares Vibe's role to a market bootstrapping engine. LP capital helps a permissionless market exist early, but market maturation should make the system more capital efficient over time.

## Reader Implication

For LPs, the relevant question is not only expected yield. It is where the market sits in its lifecycle. A new market may need more inventory support and tighter limits. A proven market can justify looser terms because more PnL clears between traders.

For project teams, LP deposits are not merely passive collateral. They are the first piece of market infrastructure that helps the solver safely open the market and collect the data needed to improve its terms.

## Publication Boundary

Do not publish final launch-stage definitions, required deposit amounts, leverage bands, collateralization schedules, or graduation thresholds without operator and implementation review. This page documents the source-backed lifecycle role of LP deposits.

## Sources

- `vibe-papers`: Neelo DDQ, "Attractiveness for LPs".

## Related Pages

- `authored-token-lp-attractiveness-model`
- `authored-market-maturation-risk-posture`
- `authored-conservative-launch-collateralization`

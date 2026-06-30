---
id: "authored-ddq-perpetuals-layer-role"
title: "DDQ Perpetuals Layer Role"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/ddq-general-introduciton", "https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/risk-walkthrough/risk-walthrough"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-ddq-general-introduciton", "neelo-08-due-diligence-questionnaire-08-docs-risk-walkthrough-risk-walthrough", "authored-netting-state-risk-transfer"]
---

# DDQ Perpetuals Layer Role

The DDQ introduction names a perpetuals protocol as a separate primitive from margin trading. Its job is to make the position lifecycle continuous: open exposure, mark it, fund it, close it, liquidate it, and route PnL through the correct counterparty path.

The source then explains the key execution shape: the solver manages the perpetuals layer as an asynchronous matching engine. It looks for long and short trader flow that can offset internally. When opposing flow exists, traders pay each other. When opposing flow is missing, the solver may temporarily act as residual counterparty under defined constraints.

## Why It Is Not Just A Margin Loan

A simple margin loan can define collateral, but it does not automatically create a durable derivatives market. A perpetual position needs ongoing risk transfer. The price can move after entry, funding can shift incentives, and closeout may need either internal netting or executable external liquidity.

That is why the DDQ pairs margin mechanics with perpetual mechanics. Margin constrains the trader's solvency. The perpetuals layer defines who bears PnL at each state and how the system tries to keep the market close to balanced.

## Reader Implication

For traders, the practical question is "who am I economically facing right now?" If the flow is netted, the answer is another trader. If the flow is un-netted, the answer is the solver and the liquidity resources backing that residual exposure.

For LPs and solvers, the perpetuals layer is where market maturity becomes visible. More netting means less balance-sheet burden. Less netting means more reliance on solver inventory, hedging, spreads, funding, limits, and tail controls.

## Publication Boundary

Do not publish final mark-price rules, funding formulas, closeout mechanics, liquidation thresholds, or netting guarantees without operator and implementation review. The source-backed claim is the layer's role: perpetual mechanics define the ongoing lifecycle and PnL routing that margin alone cannot provide.

## Sources

- `vibe-papers`: Neelo DDQ, "DDQ - General Introduction".
- `vibe-papers`: Neelo DDQ, "Risk Walkthrough".

## Related Pages

- `authored-netting-state-risk-transfer`
- `authored-internal-netting-before-external-execution`
- `authored-executable-closeout-pricing`
- `neelo-08-due-diligence-questionnaire-08-docs-risk-walkthrough-risk-walthrough`

---
id: "authored-ddq-hybrid-liquidity-model"
title: "DDQ Hybrid Liquidity Model"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/ddq-general-introduciton", "https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/attractiveness-for-lps/attractiveness-for-lps"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-ddq-general-introduciton", "neelo-08-due-diligence-questionnaire-08-docs-attractiveness-for-lps-attractiveness-for-lps", "authored-token-lp-attractiveness-model"]
---

# DDQ Hybrid Liquidity Model

The DDQ introduction describes Vibe's solution as a hybrid liquidity model that blends margin mechanics with perpetuals mechanics. The goal is to improve capital efficiency for LPs while supporting lower trading costs for traders.

That hybrid framing matters because it prevents two oversimplifications. Vibe is not just a margin vault where every market needs full stablecoin backing. It is also not just a free-floating netting engine where winning positions can exist without a credible payer. The architecture combines collateral discipline, perpetual lifecycle, solver risk checks, and market-specific inventory.

## What The Hybrid Model Blends

The margin side defines account health, collateral, liquidation semantics, and loss boundaries. The perpetuals side defines continuing exposure, funding, mark and close logic, and PnL routing. The solver layer coordinates quote acceptance, residual exposure, dynamic spreads, hedge feasibility, and maturity controls.

User vaults add token-side inventory so projects and token holders can help bootstrap markets without requiring outside USDC LPs to underwrite every low-cap asset. As flow matures, more exposure can net between traders, reducing the need for the solver to warehouse residual imbalance.

## Reader Implication

For LPs, the hybrid model is the core risk-allocation argument. Capital should be used where it is most aligned: token inventory for market-specific exposure, solver or protocol stablecoin operations for settlement and hedging, and insurance or buffers for tail states.

For traders, the model explains why capacity, spreads, and closeout behavior may change across market maturity. A newly listed market can be more conservative because the solver must protect the backing path. A mature market can become more efficient as two-sided flow and risk data improve.

## Publication Boundary

Do not publish final LP yield targets, fee splits, vault terms, collateral ratios, funding formulas, stablecoin balances, or exact market-maturity triggers without operator, accounting, risk, and implementation review. The source-backed claim is structural: Vibe blends margin and perpetual mechanics to reduce reliance on static full backing.

## Sources

- `vibe-papers`: Neelo DDQ, "DDQ - General Introduction".
- `vibe-papers`: Neelo DDQ, "Attractiveness for LPs".

## Related Pages

- `authored-token-lp-attractiveness-model`
- `authored-lp-ignition-capital-lifecycle`
- `authored-ddq-token-vault-liquidity-role`
- `neelo-08-due-diligence-questionnaire-08-docs-ddq-general-introduciton`

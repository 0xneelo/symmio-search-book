---
id: "authored-vibe-percolator-settlement-collateral-comparison"
title: "Vibe And Percolator Settlement Collateral Comparison"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/09-vibe-vs-percolator"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-09-vibe-vs-percolator", "authored-usdc-margin-breaks-double-hit", "authored-linear-pnl-versus-hyperbolic-payout"]
---

# Vibe And Percolator Settlement Collateral Comparison

Neelo's full comparison starts with the settlement unit because it controls the whole stress path.

Percolator is described as token-settled and token-collateralized. The traded asset, trader collateral, inventory vault, fee unit, payout unit, and insurance denomination can all collapse toward the same volatile token. That creates maximum correlation between exposure and protection.

Vibe is described as separating the roles. Traders settle and margin in USDC, while token inventory remains a market-specific resource rather than the unit used to settle every trader PnL obligation. The result is not risk removal. It is risk separation.

## Why The Difference Matters

In Percolator's model, a token crash can attack the margin base and the obligation base together. A winning short is owed value at the same time the unit backing the market is weakening. The system can stay technically conserved and still become less credible to traders because the payout unit and insurance unit are under stress.

In Vibe's model, the underlying token can still be volatile, illiquid, or hard to hedge. But trader PnL is legible in a stable unit. That lets the solver, insurance layer, and market limits reason about dollar-denominated liabilities instead of inverse token obligations.

## Reader Implication

When a reader asks whether the difference is only "USDC versus token UX," route here. The difference is structural: Percolator concentrates settlement, collateral, inventory, and insurance risk in the same asset; Vibe separates settlement from inventory so the market can manage each risk explicitly.

## Sources

- `vibe-papers`: Neelo, "Section 9: Vibe vs. Percolator - Full Comparison", "9.3 Settlement and Collateral".

## Related Pages

- `authored-usdc-margin-breaks-double-hit`
- `authored-linear-pnl-versus-hyperbolic-payout`
- `authored-usdc-settlement-inventory-separation`

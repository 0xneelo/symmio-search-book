---
id: "authored-pass-through-execution-boundary"
title: "Pass-Through Execution Boundary"
section: "manifesto"
track: "14 - Information and Trade Convergence"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/14-information-trade-convergence/14-docs/06-hybrid-solver-model"]
relatedGeneratedPages: ["neelo-14-information-trade-convergence-14-docs-06-hybrid-solver-model", "section-14-information-trade-convergence-14-docs-06-hybrid-solver-model-6-5-pass-through-execution", "authored-whale-vault-risk-tranching"]
---

# Pass-Through Execution Boundary

The pass-through execution section sketches how a vault-backed market can separate trader payout, token inventory, and protocol price exposure.

In the source model, a trader win can be paid by selling token inventory and passing the resulting cash through to the trader. The protocol's role is not to become a discretionary spot speculator. It uses inventory and execution rules to settle the liability created by the perp position.

The reverse case matters too. When the protocol-side position wins, the model uses controlled buyback into the vault rather than an immediate price-insensitive market action. The point is to rebalance inventory without making the protocol's own execution push the market against itself.

This is an architecture boundary, not final public accounting. Exact inventory custody, execution venue, slippage assignment, cashflow ordering, solver responsibility, and legal terms require operator and implementation review. The source-backed idea is that execution should pass market risk through a defined inventory pathway rather than hiding it inside a generic pool.

## Reader Implication

Pass-through execution is the answer to "who ultimately pays or rebalances?" It points readers toward inventory, execution, and settlement boundaries instead of a vague promise that the protocol absorbs everything.

## Sources

- `vibe-papers`: Neelo, "Section 6: The Hybrid Solver Model: 6.5 Pass-Through Execution".

## Related Pages

- `authored-whale-vault-risk-tranching`
- `authored-usdc-settlement-inventory-separation`
- `authored-token-inventory-risk-localization`

---
id: "authored-trader-compensation-continuity-model"
title: "Trader Compensation And Continuity Model"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "publication-candidate-needs-operator-review"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-worst-case-scenarios/c-solver-default/ii-trader-compensation", "https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-worst-case-scenarios/c-solver-default/i-solver-default"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-c-solver-default-ii-trader-compensation", "neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-c-solver-default-i-solver-default", "authored-solver-default-and-continuity"]
volumeId: "volume-05-solver-lp-and-protocol-operations"
---

# Trader Compensation And Continuity Model

The DDQ's trader-compensation answer is intentionally not a simple "default payout" story. It separates protocol-owned solver depletion from third-party solver default, then makes trade continuity the design objective.

For a protocol-owned solver in the bootstrapping configuration, the source says conventional account-level default is not the intended frame. A catastrophic depletion event would require the layered protections to be exhausted: token-side LP deposits, solver inventory, global insurance, local insurance, parameter tightening, and ADL-style exposure reduction. If every layer failed, positions would settle under system-level rules rather than through ordinary third-party liquidation.

For third-party solvers, the source uses a more conventional counterparty-risk model. Solvers post CVA and maintenance margin. If a solver is liquidated, those buffers can compensate counterparties. The preferred path, however, is not merely to pay a buffer and force users out. A healthy solver, including the protocol-owned solver as last resort in the model, can buy out distressed positions and become the new counterparty.

## Why Continuity Matters

Traders care about position lifecycle, not only compensation tokens after failure. If a solver default forces every trader to close and re-open manually, users inherit slippage, timing, and market-access risk during the disruption.

The DDQ's continuity model tries to keep margin, funding, PnL, and position state intact where possible by moving counterparty responsibility from the distressed solver to a healthy one.

## Publication Boundary

This page should not publish exact CVA percentages, buyout probability, auction rules, solver reputation tiers, protocol-owned solver liquidation flags, or "practically unreachable" depletion claims as current guarantees. It is a source-backed design model awaiting operator and implementation confirmation.

## Sources

- `vibe-papers`: Neelo DDQ, "Trader Compensation - Solver default".
- `vibe-papers`: Neelo DDQ, "Solver default".

## Related Pages

- `authored-solver-default-and-continuity`
- `authored-collateral-margin-cva`
- `authored-funding-defense-hierarchy`
- `neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-c-solver-default-ii-trader-compensation`

---
id: "authored-strict-solver-liquidation-mode"
title: "Strict Solver Liquidation Mode"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers", "symmio-core"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-worst-case-scenarios/c-solver-default/i-solver-default", "https://docs.symm.io/getting-started/core-concepts.md"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-c-solver-default-i-solver-default", "authored-solver-default-and-continuity", "authored-collateral-margin-cva"]
---

# Strict Solver Liquidation Mode

The DDQ's strict solver-liquidation mode treats a solver like a counterparty that must maintain collateral against its obligations.

In that model, if the solver falls below required margin, it can become liquidatable. The source names maintenance margin, liquidation fees, and a locked CVA-style buffer as the relevant accounting concepts. The intent is to restore solvency and compensate affected counterparties according to defined liquidation rules.

Strict liquidation is the clearest default mode for third-party or ordinary solver accounts because it does not rely on special protocol discretion. It says: the solver has obligations, posts buffers, and can be liquidated if those obligations are undercollateralized.

The source also leaves room for continuity. Another solver may be allowed to buy out or assume distressed positions instead of forcing the trader into an immediate close. That continuity path should be documented separately from the liquidation trigger itself.

## Publication Boundary

This page does not publish live maintenance-margin thresholds, liquidation fees, CVA sizes, liquidation timing, or which solver accounts are currently subject to strict liquidation. Those details require current implementation and operator review.

## Sources

- `vibe-papers`: Neelo DDQ, "Solver default: Mode 1 - Strict liquidation".
- `symmio-core`: protocol vocabulary for collateral, margin, CVA, and counterparty roles.

## Related Pages

- `authored-solver-default-and-continuity`
- `authored-collateral-margin-cva`
- `authored-distressed-position-buyout-continuity`

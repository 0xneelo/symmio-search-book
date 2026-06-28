---
id: "authored-solver-cva-compensation-buffer"
title: "Solver CVA Compensation Buffer"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers", "symmio-core"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-worst-case-scenarios/c-solver-default/ii-trader-compensation", "https://docs.symm.io/getting-started/core-concepts.md"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-c-solver-default-ii-trader-compensation", "authored-collateral-margin-cva", "authored-solver-default-and-continuity"]
---

# Solver CVA Compensation Buffer

The DDQ trader-compensation page uses CVA as the default-specific compensation buffer for solver counterparty risk.

In the source model, third-party solvers post a CVA buffer on trades they participate in. The buffer is collateral earmarked for counterparties if the solver falls below maintenance margin and is liquidated. The DDQ also says the CVA requirement can vary with trust level or reputation: a newer solver may need more default insurance than an established one.

CVA is not the whole continuity model. It is the collateral buffer. The preferred operating outcome may still be that another solver buys out the distressed positions and continues the trade lifecycle. CVA matters because it gives the system a defined buffer if continuity cannot fully absorb the default event.

This lets the docs answer a common diligence question: traders should not be asked to trust a solver only because it is allowed to quote. The solver needs collateralized obligations, liquidation rules, and a default buffer.

## Publication Boundary

This page should not publish exact CVA percentages, trust-tier formulas, distribution priority, or current solver admission policy until those are confirmed against live implementation and operator-approved wording.

## Sources

- `vibe-papers`: Neelo DDQ, "Trader Compensation - CVA".
- `symmio-core`: protocol vocabulary for CVA, collateral, margin, and solver obligations.

## Related Pages

- `authored-collateral-margin-cva`
- `authored-solver-default-and-continuity`
- `authored-distressed-position-buyout-continuity`

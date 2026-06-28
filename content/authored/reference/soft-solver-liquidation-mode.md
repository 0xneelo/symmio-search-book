---
id: "authored-soft-solver-liquidation-mode"
title: "Soft Solver Liquidation Mode"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-worst-case-scenarios/c-solver-default/i-solver-default"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-c-solver-default-i-solver-default", "authored-solver-default-and-continuity", "authored-market-maturation-risk-posture"]
---

# Soft Solver Liquidation Mode

The DDQ also sketches a softer solver-liquidation path for higher-reputation solvers or later-stage reputation systems.

Instead of jumping immediately from shortfall to full liquidation, the source describes a margin-call style flow. The solver receives a notice or opportunity to restore collateral within defined constraints. If the shortfall is not cured, the system can progressively de-risk, slash, or converge toward full liquidation.

The design purpose is continuity. Volatile markets can create temporary stress that a solvent, trusted solver may be able to cure. Soft liquidation gives the system a way to reduce unnecessary disruption while still enforcing solvency over time.

That distinction matters for docs because "soft" must not mean "optional." The safe public interpretation is: reputation can affect process, but the end state still needs collateral restoration, de-risking, or liquidation if the solver remains undercollateralized.

## Publication Boundary

This page should not claim a live solver reputation system, margin-call window, slashing schedule, or soft-liquidation eligibility rule until the operator confirms current implementation. It documents the DDQ source model.

## Sources

- `vibe-papers`: Neelo DDQ, "Solver default: Mode 2 - Soft liquidation".

## Related Pages

- `authored-solver-default-and-continuity`
- `authored-market-maturation-risk-posture`
- `authored-strict-solver-liquidation-mode`

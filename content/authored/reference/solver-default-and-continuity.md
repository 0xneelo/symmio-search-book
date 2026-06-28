---
id: "authored-solver-default-and-continuity"
title: "Solver Default And Trade Continuity"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "publication-candidate-needs-operator-review"
sourceKeys: ["vibe-papers", "symmio-core"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-worst-case-scenarios/c-solver-default/i-solver-default", "https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-worst-case-scenarios/c-solver-default/ii-trader-compensation", "https://docs.symm.io/getting-started/core-concepts.md"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-c-solver-default-i-solver-default", "neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-c-solver-default-ii-trader-compensation", "authored-collateral-margin-cva", "authored-solver-owned-market-maker"]
---

# Solver Default And Trade Continuity

Solver default is a solvency question: the solver is undercollateralized relative to obligations as a counterparty. The DDQ describes different resolution modes depending on solver type, reputation, and system maturity.

For standard or third-party solvers, the model includes strict liquidation, CVA-style buffers, maintenance margin, and optional position buyout by another solver. For higher-reputation solvers, the DDQ describes a softer margin-call style path that can de-risk progressively before full liquidation.

## Protocol-Operated Solver

The same DDQ distinguishes the bootstrapping protocol-operated solver from ordinary third-party solvers. In that configuration, the protocol-operated solver may be treated as not liquidatable in the conventional account-level sense. That does not mean users are ignored; it means the shortfall is handled through protocol-level buffers, insurance, ADL, and ultimately system-level settlement if every layer is exhausted.

The publication-safe wording is: the DDQ model favors trade continuity and orderly settlement over a simple credit-default payout narrative.

## Third-Party Solver Continuity

For third-party solver default, the DDQ describes CVA and maintenance margin as compensation buffers. It also describes a preferred continuity path where the protocol-operated solver or another active solver can buy out distressed positions and become the new counterparty, preserving the trader's position lifecycle where possible.

## Publication Note

This page is source-backed as a design model, not a final production guarantee. Exact solver liquidation flags, reputation rules, buyout auction behavior, and compensation percentages need current implementation and operator review before publication.

## Sources

- `vibe-papers`: Neelo DDQ, "Solver default" and "Trader Compensation - Solver default".
- `symmio-core`: protocol vocabulary for solvers, collateral, margin, and CVA.

## Related Pages

- `authored-collateral-margin-cva`
- `authored-solver-owned-market-maker`
- `authored-funding-defense-hierarchy`
- `neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-c-solver-default-i-solver-default`

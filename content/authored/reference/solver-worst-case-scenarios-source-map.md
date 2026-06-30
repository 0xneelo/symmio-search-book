---
id: "authored-solver-worst-case-scenarios-source-map"
title: "Solver Worst-Case Scenarios Source Map"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-worst-case-scenarios/solver-worst-case-scenarios"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-solver-worst-case-scenarios", "authored-solver-operational-failure-force-close", "authored-solver-hedging-failure-modes", "authored-solver-default-and-continuity", "authored-protocol-owned-solver-depletion-boundary", "authored-loss-waterfall-and-profit-caps"]
---

# Solver Worst-Case Scenarios Source Map

The solver worst-case overview is the parent route for DDQ tail-risk questions. It should not be read as one monolithic failure mode. The source separates three families of concern: operational failure, hedging failure, and solver default.

That separation is the most important editorial control. A user asking "what if the solver is offline?" should not receive the same answer as a risk reviewer asking "what if the solver cannot hedge?" or an LP asking "what if the solver is undercollateralized?"

## Operational Failure

Operational failure means the solver is unresponsive through the normal off-chain intent or RFQ path. The DDQ route for this is the Force Close escape hatch: users need a way to close specific positions without waiting indefinitely for the solver to return.

The correct authored route is `authored-solver-operational-failure-force-close`. It explains the position-level recovery path and the remaining market-movement risk during forced-close latency.

## Hedging Failure

Hedging failure is an economic or market-structure problem, not simply downtime. The solver may face thin external liquidity, basis risk, discontinuous pricing, manipulation signals, or execution constraints.

The correct authored route is `authored-solver-hedging-failure-modes`. It explains how the design uses quote-by-quote risk review, wider spreads, funding changes, lower limits, refusal, freezes, or shutdown paths instead of requiring the solver to warehouse unlimited exposure.

## Solver Default

Solver default is the solvency state: the solver is undercollateralized relative to obligations. The DDQ distinguishes ordinary third-party solver default from protocol-operated solver depletion in a bootstrapping configuration.

The correct authored routes are `authored-solver-default-and-continuity` and `authored-protocol-owned-solver-depletion-boundary`. They explain liquidation, CVA-style buffers, maintenance margin, position buyout, protocol-level buffers, insurance, ADL, and system restart boundaries as design concepts that need production review before public guarantees.

## Loss Absorption

The parent source also points to a broader loss-absorption waterfall: trader margin first, then solver or LP hedging resources as applicable, then local insurance, then global or pro rata insurance, with tail controls such as profit caps or forced de-risking.

The correct authored route is `authored-loss-waterfall-and-profit-caps`. It should be used when the reader is asking how losses are bounded and allocated rather than which solver failure state triggered the stress.

## Publication Boundary

This page is a source map, not an implementation guarantee. Do not publish exact Force Close timers, proof networks, hedge venues, risk thresholds, freeze rules, liquidation flags, buyout mechanics, compensation percentages, insurance allocation formulas, ADL triggers, or restart rules without current operator and implementation review.

## Sources

- `vibe-papers`: Neelo DDQ, "Solver Worst-Case scenarios".

## Related Pages

- `authored-solver-operational-failure-force-close`
- `authored-solver-hedging-failure-modes`
- `authored-solver-default-and-continuity`
- `authored-protocol-owned-solver-depletion-boundary`
- `authored-loss-waterfall-and-profit-caps`

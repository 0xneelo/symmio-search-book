---
id: "authored-liquidity-disappearance-protective-posture"
title: "Protective Posture When Liquidity Disappears"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-as-residual-counterparty/solver-as-residual-counterparty"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-solver-as-residual-counterparty-solver-as-residual-counterparty", "authored-solver-hedging-failure-modes", "authored-tail-event-profit-cap-emergency-brake", "authored-funding-adl-trigger-and-target"]
---

# Protective Posture When Liquidity Disappears

The DDQ source treats disappearing liquidity as a market-integrity and execution-feasibility problem. If external liquidity is near zero, an attempted hedge or unwind can create extreme price impact. In that state, the system cannot assume positions can be closed at clean theoretical prices.

The protective response is progressive. The source names widening spreads, increasing funding adjustments, lowering max leverage or open interest, enforcing stricter close and quote conditions, forced de-risking, ADL-type mechanisms where the design includes them, and closing or delisting the market if it is no longer safely tradable.

## Why The Response Must Tighten

The economic principle is blunt: traders are closed against what can be executed through netting or hedges. A system cannot sustainably pay profits that cannot be realized through opposing flow, inventory, or executable external markets.

Protective posture therefore protects more than the solver. It protects LP resources, insurance resources, and the credibility of the market. Letting one-sided exposure grow after liquidity has disappeared would turn a market-making problem into a solvency problem.

## Publication Boundary

Exact trigger thresholds, funding adjustments, leverage limits, open-interest limits, close restrictions, ADL rules, market-closing authority, and user notice workflow require implementation and operator review. This page documents the source-backed control family, not production parameter values.

## Sources

- `vibe-papers`: Neelo DDQ, "Solver as residual counterparty".

## Related Pages

- `authored-solver-hedging-failure-modes`
- `authored-tail-event-profit-cap-emergency-brake`
- `authored-funding-adl-trigger-and-target`

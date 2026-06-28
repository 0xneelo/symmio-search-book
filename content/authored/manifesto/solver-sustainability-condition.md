---
id: "authored-solver-sustainability-condition"
title: "The Solver Sustainability Condition"
section: "manifesto"
track: "13 — Proof of Value Framework"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-02-bootstrap-and-proof-of-value"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/13-framework-value-permissionless-perps/13-docs/02-framework", "https://0xneelo.github.io/vibe_docs/docs/13-framework-value-permissionless-perps/13-docs/07-validation-and-sustainability"]
relatedGeneratedPages: ["section-13-framework-value-permissionless-perps-13-docs-02-framework-2-4-sustainability-criteria", "section-13-framework-value-permissionless-perps-13-docs-07-validation-and-sustainability-7-4-conditions-for-long-term-sustainability", "authored-solver-engine-operating-loop"]
---

# The Solver Sustainability Condition

The Proof of Value framework names solver sustainability as a first-class condition. That matters because the solver is not an invisible implementation detail. In bootstrap markets, it is often the actor making execution possible before natural two-sided flow can carry the market.

A market can look attractive to traders and projects while still being impossible for the solver to support. If quotes are too tight for the risk, the solver absorbs losses. If quotes are too wide, traders leave. If hedging venues are thin, residual exposure becomes expensive. If the defense stack is unclear, every tail event becomes a trust problem.

The sustainable condition is therefore not "the solver always fills." It is that the solver can price, hedge, refuse, or widen exposure in a way that keeps markets usable without turning the solver into an unbounded subsidy.

## What Has To Be True

The source points to a practical set of requirements:

- spread, funding, and borrow charges must compensate real risk;
- hedging and short-cycle capital recycling must remain operationally feasible;
- trader losses, fees, and liquidation economics must be collected through a clear lifecycle;
- market maturity should reduce residual exposure over time;
- stress controls must intervene before ADL becomes routine.

This is where the answer engine should be careful. Users may ask whether Vibe "has liquidity." A better answer is: liquidity depends on solver pricing, token inventory, netting state, hedge availability, market maturity, and the defense stack. Liquidity is a maintained condition, not a static line item.

## Publication Note

Live solver profitability, hedge venues, USDC funding policy, quote limits, and refusal criteria remain implementation and operator-review items. The publishable principle is that solver economics must be sustainable for the market to remain open.

## Sources

- `vibe-papers`: Neelo, "Section 2: A Framework for Value Dimensions".
- `vibe-papers`: Neelo, "Section 7: Validation and Sustainability".

## Related Pages

- `authored-solver-engine-operating-loop`
- `authored-solver-funded-usdc-capital-loop`
- `authored-rfq-risk-tuning`

---
id: "authored-technical-security-model"
title: "The Technical Security Model"
section: "manifesto"
track: "07 — Technical Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/06-technical-deep-dive#6-7-security-model"]
relatedGeneratedPages: ["section-01-perp-classes-zscore-01-docs-06-technical-deep-dive-6-7-security-model", "authored-settlement-state-boundary", "authored-bootstrap-oracle-risk-tiers"]
---

# The Technical Security Model

Neelo's technical security model separates trustless settlement facts from solver-operated market functions. On-chain state handles position ownership, collateral custody, settlement finality, and insurance fund access. The solver is trusted for quote fairness, execution quality, risk parameter setting, and graduation decisions, but its power is supposed to be bounded.

That distinction should be visible in the docs. The system is not "trust the solver with everything." It is "let the solver do the fast derivatives work, then constrain what the solver can do to funds, prices, and past settlements."

## Solver Powers And Limits

The source frames the solver as able to set spreads within bounds, adjust risk parameters within bounds, execute trades at oracle-derived prices, and trigger liquidations that are verifiable on-chain.

It also states what the solver should not be able to do: steal user funds, execute at arbitrary prices, prevent withdrawals, or modify past settlements.

## Risk Mitigation Map

| Risk | Source mitigation |
| --- | --- |
| Oracle manipulation | Multi-source aggregation and circuit breakers |
| Solver misconduct | On-chain verification and bounded parameters |
| Smart-contract bugs | Audits, formal verification, and gradual rollout |
| Economic attacks | Position limits, OI caps, and insurance fund |

## Publication Boundary

This is a source-backed threat-model summary, not a final audit report. Public claims about live audits, formal verification scope, circuit-breaker behavior, withdrawal guarantees, access controls, or exact solver constraints require current security and implementation review.

## Sources

- `vibe-papers`: Neelo, "Section 6: Technical Deep Dive: 6.7 Security Model".

## Related Pages

- `authored-settlement-state-boundary`
- `authored-vibe-security-and-audits`
- `authored-bootstrap-oracle-risk-tiers`

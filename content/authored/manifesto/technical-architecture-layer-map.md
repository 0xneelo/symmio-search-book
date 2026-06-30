---
id: "authored-technical-architecture-layer-map"
title: "The Technical Architecture Layer Map"
section: "manifesto"
track: "07 — Technical Architecture"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/06-technical-deep-dive#6-1-system-architecture-overview"]
relatedGeneratedPages: ["section-01-perp-classes-zscore-01-docs-06-technical-deep-dive-6-1-system-architecture-overview", "authored-hybrid-settlement-solver-stack", "authored-settlement-state-boundary"]
---

# The Technical Architecture Layer Map

Neelo's technical deep dive maps Vibe as a multi-layer system. The user interface and API collect intent. The solver layer performs quote generation, risk checks, matching, liquidation decisions, hedging, and graduation monitoring. The settlement layer records enforceable financial state. The oracle layer supplies external price and market data.

That map is the operational version of the lifecycle thesis. A new market needs more than a frontend and a contract. It needs a quoting surface, a risk engine, a settlement boundary, and price references that can be constrained by market quality.

## Layer Responsibilities

| Layer | Responsibility |
| --- | --- |
| User interface / API / integrations | Let users and integrations express trade intent |
| Solver layer | Quote, risk-check, match, hedge, liquidate, and monitor graduation |
| Settlement layer | Maintain smart-contract state for vaults, positions, insurance, and final settlement |
| Oracle layer | Provide reference prices and external data used by the solver and settlement rules |

The important boundary is not "on-chain good, off-chain bad." The boundary is which facts must be enforceable and which calculations must be fast enough for live derivatives operation. Vibe's source architecture uses both.

## Sources

- `vibe-papers`: Neelo, "Section 6: Technical Deep Dive: 6.1 System Architecture Overview".

## Related Pages

- `authored-hybrid-settlement-solver-stack`
- `authored-settlement-contract-responsibility-map`
- `authored-technical-capability-map`

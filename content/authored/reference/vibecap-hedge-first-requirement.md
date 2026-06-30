---
id: "authored-vibecap-hedge-first-requirement"
title: "VibeCaps Hedge-First Requirement"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-worst-case-scenarios/b-hedging-risks/hedging-risk-considerations"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-b-hedging-risks-hedging-risk-considerations", "authored-residual-counterparty-hedge-first", "authored-solver-hedging-failure-modes"]
---

# VibeCaps Hedge-First Requirement

The DDQ hedging-risk source is explicit about low-cap, newly listed assets: the solver should hedge or fully back residual exposure before accepting the trade.

That requirement is stricter than a generic "solver manages risk" claim. In VibeCaps-style markets, liquidity can be thin, manipulation risk can be high, and an external hedge may move the same reference market the trade depends on. The source therefore treats hedge-first behavior as the baseline for permissionless perps, not as an optional optimization after the fill.

## Why It Enables Permissionless Listings

Permissionless listing only works if the system can reject bad risk before it becomes a liability. A solver that checks backing inventory, hedge feasibility, market integrity, and user price bounds before acceptance can support markets that would be unsafe under a blind execution model.

The source contrasts this with majors. Large, mature markets can support auctions among multiple solvers or market makers because hedge paths and depth are usually better. For VibeCaps, the safer first design is not to assume competitive depth exists; it is to require a backed or hedgeable quote before the solver commits.

## Reader Implication

For traders, the hedge-first requirement explains why a low-cap trade may receive a wider quote, lower limit, or refusal instead of instant execution. The friction is the safety mechanism.

For LPs and projects, the requirement explains why vault inventory and solver-controlled liquidity matter. The system is not promising unlimited leverage on a cold market; it is asking whether the residual exposure can be backed before the market grows into looser terms.

## Publication Boundary

Do not publish final hedge-acceptance tests, supported hedge venues, inventory custody rules, max size formulas, or exact "VibeCaps" eligibility definitions without operator and implementation review. The source-backed claim is the baseline: fragile permissionless markets are hedge-first by default.

## Sources

- `vibe-papers`: Neelo DDQ, "Solver Hedging Risk Considerations".

## Related Pages

- `authored-residual-counterparty-hedge-first`
- `authored-solver-hedging-failure-modes`
- `authored-internal-inventory-primary-hedge`
- `neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-b-hedging-risks-hedging-risk-considerations`

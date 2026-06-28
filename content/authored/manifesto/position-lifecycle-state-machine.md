---
id: "authored-position-lifecycle-state-machine"
title: "Position Lifecycle State Machine"
section: "manifesto"
track: "07 — Technical Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/06-technical-deep-dive#6-6-position-lifecycle", "https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/06-technical-deep-dive#6-5-funding-rate-mechanism"]
relatedGeneratedPages: ["neelo-01-perp-classes-zscore-01-docs-06-technical-deep-dive", "section-01-perp-classes-zscore-01-docs-06-technical-deep-dive-6-6-position-lifecycle", "section-01-perp-classes-zscore-01-docs-06-technical-deep-dive-6-5-funding-rate-mechanism"]
---

# Position Lifecycle State Machine

The technical model should be documented as a lifecycle, not only as a trade ticket. A position opens after validation, quote generation, execution, margin transfer, and on-chain position creation. It is then managed through margin operations, unrealized PnL, funding, liquidation checks, and eventual close or forced resolution.

That lifecycle language matters because it connects the trader experience to the system's accounting obligations. A user sees entry price, margin, funding, liquidation distance, and close price. The system has to maintain the corresponding state transitions so those numbers remain explainable.

## Lifecycle Steps

Opening a position requires margin sufficiency, position-size checks, and OI headroom before the solver quote becomes an accepted trade. Managing a position means tracking added or removed margin, unrealized PnL, accrued fees, funding, and maintenance requirements. Closing a position realizes PnL, applies fees and accrued funding, releases remaining margin, and updates solver exposure.

In the source, funding anchors perp price to spot and can also reflect solver inventory pressure during bootstrap. That makes funding part of lifecycle state, not a detached fee table.

## Publication Boundary

This page should not imply final live formulas for funding intervals, margin rates, liquidation thresholds, or solver inventory incentives. The source is sufficient to explain the lifecycle model; production values still require implementation confirmation.

## Sources

- `vibe-papers`: Neelo, "Section 6: Technical Deep Dive: 6.6 Position Lifecycle".
- `vibe-papers`: Neelo, "Section 6: Technical Deep Dive: 6.5 Funding Rate Mechanism".

## Related Pages

- `authored-vibe-simple-trade-flow`
- `authored-vibe-collateral-and-margining`
- `authored-vibe-fees-and-funding`

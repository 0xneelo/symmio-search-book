---
id: "authored-residual-counterparty-hedge-first"
title: "Residual Counterparty And Hedge-First Execution"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "publication-candidate-needs-operator-review"
sourceKeys: ["vibe-papers", "vibe-architecture", "symmio-intent-lifecycle"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-as-residual-counterparty/solver-as-residual-counterparty", "https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-worst-case-scenarios/b-hedging-risks/hedging-risk-considerations", "https://docs.vibe.trading/architectural-overview.md", "https://docs.symm.io/liquidity-provider-documentation/core-concepts/intent-lifecycle-and-event-monitoring.md"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-solver-as-residual-counterparty-solver-as-residual-counterparty", "neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-b-hedging-risks-hedging-risk-considerations", "authored-solver-owned-market-maker", "authored-solver-event-monitoring"]
---

# Residual Counterparty And Hedge-First Execution

Neelo's DDQ material frames the solver as a residual counterparty only after risk has been evaluated. The intent/RFQ structure means the solver does not have to blindly accept every requested fill. It can evaluate the requested market, size, direction, price bounds, inventory, and hedge feasibility before final acceptance.

That makes "hedge first" a core design idea for permissionless low-cap perps. The solver should establish backing inventory, a hedge, or a risk-adjusted quote before it becomes responsible for the residual exposure.

## Internal And External Hedge Sources

For low-cap markets, the DDQ source emphasizes internal inventory or vault-controlled liquidity as the primary backing path because open DEX liquidity may be thin, manipulable, or expensive to touch immediately. External venues can still matter for rebalancing, reducing residual delta, or unwinding exposure, but execution may need controlled methods such as TWAP-style routing to reduce price impact.

Opposing trader flow is another hedge source. If longs and shorts offset internally, the solver can net exposure before reaching external liquidity.

## Reader Implication

The important support answer is not "the solver always takes the other side." It is: the solver may intermediate an imbalanced market, but the intent model gives it a risk check before acceptance. If liquidity or hedge feasibility deteriorates, the quote should widen, the trade can be refused, or market-level controls can tighten.

## Sources

- `vibe-papers`: Neelo DDQ, "Solver as residual counterparty" and "Solver Hedging Risk Considerations".
- `vibe-architecture`: Vibe intent quotation context.
- `symmio-intent-lifecycle`: solver event monitoring, risk checks, locking, and collateral allocation.

## Related Pages

- `authored-solver-owned-market-maker`
- `authored-solver-event-monitoring`
- `authored-vibe-oi-and-liquidity`
- `neelo-08-due-diligence-questionnaire-08-docs-solver-as-residual-counterparty-solver-as-residual-counterparty`

---
id: "authored-solver-hedging-failure-modes"
title: "Solver Hedging Failure Modes"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "publication-candidate-needs-operator-review"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-worst-case-scenarios/b-hedging-risks/hedging-risk-considerations", "https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/risk-walkthrough/a-bearer-of-losses/ii-balancing-ux-vs-risk"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-b-hedging-risks-hedging-risk-considerations", "neelo-08-due-diligence-questionnaire-08-docs-risk-walkthrough-a-bearer-of-losses-ii-balancing-ux-vs-risk", "authored-residual-counterparty-hedge-first", "authored-funding-defense-hierarchy"]
---

# Solver Hedging Failure Modes

The DDQ source treats "solver cannot hedge" as a state the design should avoid by construction, not as normal operating behavior. Under the intent/RFQ model, the solver can evaluate the request before final acceptance, and low-cap VibeCaps-style markets are described as hedge-first by default.

That is different from an order-book framing where a counterparty may be hard-committed to a fixed price before external execution is complete.

## Constrained Hedging

Hedging can still become economically or mechanically constrained. The DDQ identifies several stress conditions: external liquidity is too thin for meaningful execution, price formation becomes discontinuous or unreliable, or manipulation signals appear.

In those cases the model does not ask the solver to warehouse unbounded exposure. It can widen spreads, adjust funding, reduce open interest, lower leverage, refuse new trades, freeze the market, or move to orderly shutdown depending on the market state and risk controls.

## Strategic Unhedged Exposure

The same source separates failure from strategy. A solver may intentionally hold limited unhedged exposure in a mature market if inventory, risk limits, and expected P&L make that acceptable. That is not the baseline for newly launched low-cap markets.

## Publication Note

This page summarizes the DDQ model. Final public docs should not publish exact liquidity-collapse triggers, freeze thresholds, or production market-shutdown behavior until implementation and operator review confirm them.

## Sources

- `vibe-papers`: Neelo DDQ, "Solver Hedging Risk Considerations" and "Balancing UX vs Risk".

## Related Pages

- `authored-residual-counterparty-hedge-first`
- `authored-funding-defense-hierarchy`
- `authored-liquidity-as-trader-experience`
- `neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-b-hedging-risks-hedging-risk-considerations`

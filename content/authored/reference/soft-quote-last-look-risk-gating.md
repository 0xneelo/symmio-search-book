---
id: "authored-soft-quote-last-look-risk-gating"
title: "Soft Quote And Last-Look Risk Gating"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-worst-case-scenarios/b-hedging-risks/hedging-risk-considerations"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-b-hedging-risks-hedging-risk-considerations", "authored-rfq-risk-tuning", "authored-vibe-intent-architecture"]
---

# Soft Quote And Last-Look Risk Gating

The DDQ source says "solver cannot hedge" is often an order-book framing problem. In a hard-commit order book, a counterparty can be forced into execution at a price before its external hedge is complete. That creates latency and execution risk.

Vibe's source model is different. Under the intent/RFQ flow, the user's request includes bounds, and the solver can evaluate current risk before final acceptance. The DDQ describes this as a soft commitment with last look: the solver can quote within the user's bounds, tighten terms, or refuse if the fill is not safely hedgeable.

## What Last Look Changes

Last look is not a license to ignore the user. It is the risk gate between "the user wants this trade" and "the solver has accepted this residual exposure." The solver can inspect inventory, hedge paths, market conditions, manipulation signals, and expected execution cost before becoming the counterparty.

That is why the source says normal operations should reduce forced unhedgeable fills toward zero. A solver that is not comfortable with the current state does not need to become trapped in a bad fill just because a static book price existed.

## Reader Implication

For traders, the practical consequence is that acceptable slippage and price bounds matter. A request can be expressible without being executable at the exact theoretical price. The returned quote is part of the risk check.

For protocol readers, the important distinction is that intent execution gives the solver a control surface before acceptance. The safety model is quote, check, and accept, not accept first and hope a hedge can be found later.

## Publication Boundary

Do not publish final last-look timing, quote-validity windows, rejection codes, price-bound handling, or UI wording without operator and implementation review. The source-backed claim is that intent/RFQ soft quotes let the solver gate risk before commitment.

## Sources

- `vibe-papers`: Neelo DDQ, "Solver Hedging Risk Considerations".

## Related Pages

- `authored-rfq-risk-tuning`
- `authored-vibe-intent-architecture`
- `authored-bilateral-intent-lifecycle`
- `neelo-08-due-diligence-questionnaire-08-docs-solver-worst-case-scenarios-b-hedging-risks-hedging-risk-considerations`

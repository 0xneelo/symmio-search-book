---
id: "authored-residual-counterparty-dynamic-spread"
title: "Residual Counterparty Dynamic Spread Inputs"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-as-residual-counterparty/solver-as-residual-counterparty"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-solver-as-residual-counterparty-solver-as-residual-counterparty", "authored-residual-counterparty-hedge-first", "authored-rfq-risk-tuning", "authored-safety-premium-backstop-quotes"]
---

# Residual Counterparty Dynamic Spread Inputs

The DDQ source says the solver applies a dynamic spread when it prices residual counterparty flow. That spread is not just a generic fee label. It is the mechanism that lets the quote reflect market conditions, vault depth, volatility, and expected unwind cost before the solver accepts exposure.

For low-cap markets, those inputs can change quickly. A market with deeper internal inventory, cleaner price formation, and cheaper expected unwind can support tighter execution. A market with thin inventory, high volatility, one-sided flow, or expensive expected unwind should quote wider or refuse unsafe requests.

## What The Spread Is Doing

The dynamic spread translates execution risk into the user's executable terms. It keeps the solver from pretending that a fragile market can clear at a theoretical mid price when the actual hedge, unwind, or inventory path is costly.

This is also why RFQ is central to the architecture. The solver can price the trade after seeing the requested size, direction, and market state. It can return a quote that reflects the current risk rather than inheriting a fixed curve that may already be stale.

## Publication Boundary

The source supports the spread inputs, not a production formula. Exact spread math, thresholds, solver inventory policy, market classes, and user-facing disclosures need operator and implementation review.

## Sources

- `vibe-papers`: Neelo DDQ, "Solver as residual counterparty".

## Related Pages

- `authored-rfq-risk-tuning`
- `authored-residual-counterparty-hedge-first`
- `authored-safety-premium-backstop-quotes`

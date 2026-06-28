---
id: "authored-executable-closeout-pricing"
title: "Executable Closeout Pricing"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-as-residual-counterparty/solver-as-residual-counterparty"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-solver-as-residual-counterparty-solver-as-residual-counterparty", "authored-pass-through-execution-boundary", "authored-solver-hedging-failure-modes", "authored-force-close-versus-escape-mode"]
---

# Executable Closeout Pricing

The DDQ source says a trader close is settled against what can actually be executed. When a trader asks to close, the solver has two broad paths: net the close against opposing demand if that flow exists, or unwind the needed hedge against external liquidity and return an exit price that reflects realized execution costs plus any required risk spread.

That framing is important because a close price is not only an oracle mark. In a fragile market, slippage, price impact, and the available hedge path can change what the close can safely return.

## The Market-Clearing Boundary

Executable closeout pricing is the boundary between theoretical PnL and realizable settlement. If the solver can net internally, the close can depend less on external liquidity. If the solver must unwind externally, the close has to account for the cost of doing that unwind in the real market.

This does not make every bad close a protocol failure. It means low-cap derivatives need to expose the difference between index logic, quote logic, hedge execution, and final settlement economics.

## Publication Boundary

Exact closeout formula, UI slippage language, execution venues, slippage allocation, force-close path, and implementation-specific close rules need operator and implementation review. The source-backed point is narrower: closeout economics should reflect netting or executable hedge unwind, not an unsupported theoretical price.

## Sources

- `vibe-papers`: Neelo DDQ, "Solver as residual counterparty".

## Related Pages

- `authored-pass-through-execution-boundary`
- `authored-solver-hedging-failure-modes`
- `authored-force-close-versus-escape-mode`

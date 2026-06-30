---
id: "authored-linear-pnl-versus-hyperbolic-payout"
title: "Linear PnL Versus Hyperbolic Payout"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/08-structurally-superior-alternative"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-08-structurally-superior-alternative", "authored-inverse-payoff-trap", "authored-pump-bankruptcy-arithmetic"]
---

# Linear PnL Versus Hyperbolic Payout

Neelo's Section 8 says USDC-margining fixes negative convexity because PnL becomes linear: a one-dollar price move maps to a one-dollar PnL effect, rather than an inverse payout curve that expands nonlinearly.

That distinction matters most under stress. In an inverse token-margined system, the number of tokens owed can explode as price moves against the LP. The market can be technically defined but economically hostile because the payout unit is moving through the same curve as the underlying.

Linear USDC PnL does not make the market safe by itself. It makes the obligation easier to size. The solver can quote, hedge, widen spreads, cap exposure, or refuse trades against a dollar-denominated liability instead of a hyperbolic token obligation.

## Why The Shape Matters

Risk systems can manage bounded, legible obligations more effectively than obligations whose unit count grows as the asset weakens. Linear PnL lets the market ask familiar questions: how much USDC is owed, how much collateral exists, how much hedge exists, and what exposure remains.

The inverse curve turns those questions into a moving target. The worse the token state becomes, the harder the payout denominator becomes to reason about.

## Reader Implication

When a reader asks why inverse payoff is a structural problem, route here. The issue is not only price volatility; it is the payout shape. Linear USDC PnL makes the liability legible enough for active risk controls to operate.

## Publication Boundary

The arithmetic here is source-level explanatory math, not a published live margin formula, liquidation rule, leverage offer, payout guarantee, or risk recommendation. Current contract formulas and venue terms require implementation, risk, legal, and operator review before user-facing publication.

## Sources

- `vibe-papers`: Neelo, "Section 8: The Structurally Superior Alternative", "8.2 How This Fixes Each Problem".

## Related Pages

- `authored-inverse-payoff-trap`
- `authored-pump-bankruptcy-arithmetic`
- `authored-engineering-fix-economics-limit`

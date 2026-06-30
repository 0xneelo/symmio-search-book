---
id: "authored-funding-model-control-problem"
title: "The Funding Model Is A Control Problem"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/00-informal-intro", "https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/01-abstract"]
relatedGeneratedPages: ["neelo-15-funding-model-15-docs-00-informal-intro", "neelo-15-funding-model-15-docs-01-abstract", "neelo-15-funding-model-15-docs-11-full-objective"]
---

# The Funding Model Is A Control Problem

Neelo's funding-model corpus starts with a useful warning: the math is not a claim that one formula can solve long-tail leverage.

That distinction matters for Vibe. The open problem is not only "calculate a funding rate." It is how to run leveraged markets when flow is thin, information is incomplete, trader demand is asymmetric, and the residual counterparty may need to carry risk before the market matures.

The model turns that problem into a control surface. Each market has state: open interest, netting, exposure, inventory, volatility, skew, insurance capacity, profit deviation, and residual stress. The protocol then has controls: spread, funding, borrow, buybacks, local insurance, global insurance, and ADL. The point of the derivation is to make the tension visible before the operator or solver chooses a policy.

## What It Controls

At cold start, the source frames the market as close to z-score zero. Flow is asynchronous, full natural netting may not exist, and a residual solver can sit in the middle. The conservative path is to begin with heavy hedging and lower LP efficiency, then increase effective leverage only as live data supports it.

That creates a deliberate tradeoff. Traders can receive a more familiar perp-like interface earlier, but the LP and solver side may be less capital efficient until the market proves it can support more netting. Moving "up" the spectrum is not a one-way graduation. Stress, ADL, resets, and parameter changes are part of how the system learns.

## Why It Belongs In The Manifesto

The funding model gives the compendium a language for a hard truth: permissionless derivatives are not made safe by pretending every token already has mature liquidity. They are made legible by naming the risk, exposing the controls, and explaining what happens when the controls are not enough.

That is why this page should sit near the token-margin and solver-risk material. Funding is not a fee widget. It is one part of a larger market-control loop.

## Publication Boundary

This page summarizes the source model. It does not publish live model parameters, thresholds, solver policies, effective-leverage schedules, stress/ADL triggers, insurance allocation, governance authority, or product guarantees without implementation, risk, legal, and operator review.

## Sources

- `vibe-papers`: Neelo, "Informal intro: what the derivation is for (and what it is not)".
- `vibe-papers`: Neelo, "Abstract" for the funding model objective and control surface.

## Related Pages

- `authored-funding-as-market-balancing`
- `authored-lp-profit-and-dynamic-pricing`
- `authored-z-score-graduation-criteria`

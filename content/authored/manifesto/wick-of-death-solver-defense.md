---
id: "authored-wick-of-death-solver-defense"
title: "Solver Defense Against The Wick Of Death"
section: "manifesto"
track: "14 - Information and Trade Convergence"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-02-bootstrap-and-proof-of-value"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/14-information-trade-convergence/14-docs/05-intent-based-architecture#5-5-solving-the-wick-of-death"]
relatedGeneratedPages: ["section-14-information-trade-convergence-14-docs-05-intent-based-architecture-5-5-solving-the-wick-of-death", "authored-solver-refusal-as-oracle-defense", "authored-oracle-reference-solver-quote-layer"]
---

# Solver Defense Against The Wick Of Death

The "wick of death" is the low-cap perp failure mode where a short-lived spot move or oracle spike can create an outsized derivative loss.

Neelo's source frames the historical problem simply: if a perp system relies passively on a manipulable spot oracle, an attacker can push spot briefly, force the derivative system to honor the distorted price, and extract value from the backstop.

The intent/solver answer is not "ignore oracles." It is to move price acceptance from passive oracle obedience into an active quote layer. A solver can look at the reference market, current liquidity, manipulation risk, hedge feasibility, and inventory before committing to a fill. If the price looks unsafe, the solver can widen the spread, reduce size, change terms, or refuse to quote.

## Why This Belongs In The Manifesto

This page connects the verification thesis to concrete market structure. A NO button only works if the negative side cannot cheaply exploit fake wicks. A permissionless long-tail market only works if the solver has discretion to reject prices that look mechanically unsafe.

That is the deeper architecture claim: intents let the user ask for an outcome, while solvers decide whether that outcome is safely executable under current conditions.

## Publication Boundary

Do not publish final oracle sources, manipulation thresholds, solver refusal policy, spread formulas, last-look rules, hedge checks, or guaranteed protection from wick events without current implementation and risk review. The source-backed claim is that active solver quoting can defend against oracle-manipulation patterns better than passive spot-price obedience.

## Sources

- `vibe-papers`: Neelo, "Section 5: Intent-Based Architecture: 5.5 Solving the Wick of Death".

## Related Pages

- `authored-solver-refusal-as-oracle-defense`
- `authored-oracle-reference-solver-quote-layer`
- `authored-soft-quote-last-look-risk-gating`

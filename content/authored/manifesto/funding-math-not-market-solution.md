---
id: "authored-funding-math-not-market-solution"
title: "Funding Math Is Not A Market Solution"
section: "manifesto"
track: "15 - Funding Rate Model"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/15-funding-model/15-docs/00-informal-intro#the-open-problem-is-not-solvable-by-math-alone"]
relatedGeneratedPages: ["section-15-funding-model-15-docs-00-informal-intro-the-open-problem-is-not-solvable-by-math-alone", "neelo-15-funding-model-15-docs-00-informal-intro", "authored-funding-model-control-problem"]
---

# Funding Math Is Not A Market Solution

Neelo's funding-model introduction makes a boundary that the compendium should preserve: the derivation is not claiming that low-cap leverage is solved by one formula.

That matters because a permissionless derivatives market is not a closed puzzle. The market has participants with incomplete information, uneven capital, changing incentives, adverse selection, fragile spot liquidity, and reflexive trader behavior. If those forces were fully solved by a static algorithm, there would be little reason for the market to exist as a market.

The source-backed claim is narrower and more useful. The math gives operators, solvers, LPs, and readers a way to name the control problem. It makes inventory, skew, utilization, insurance, profit, exposure, and ADL proximity legible before anyone chooses a live policy. It does not remove judgment, risk review, market observation, or governance.

## Why This Caveat Belongs Up Front

Without this caveat, readers can misread the funding model as a magic safety proof: enter parameters, launch any token, and receive safe leverage. That is the wrong lesson.

The right lesson is that Vibe's long-tail market problem is partly mathematical and partly operational. Funding rates, spreads, borrow costs, inventory usage, insurance allocation, and ADL are controls inside a living system. They help the system respond to state. They do not guarantee that a market has enough real liquidity, enough honest flow, enough price integrity, or enough capital to support every possible trade.

For traders, this means a cost curve is a signal, not a promise. For LPs, it means risk is being routed and priced, not abolished. For projects, it means a market can begin with structured safeguards while still needing evidence before it graduates into more efficient leverage.

## Publication Boundary

This page should stay conceptual until the production implementation confirms live parameters, market eligibility, supported emergency paths, and governance authority. The public docs can say that the funding model is a control framework for low-liquidity derivatives; they should not say that the framework by itself makes any low-cap market safe.

## Sources

- `vibe-papers`: Neelo, "The open problem is not solvable by math alone".

## Related Pages

- `authored-funding-model-control-problem`
- `authored-gradient-flow-market-balancing`
- `authored-funding-defense-hierarchy`

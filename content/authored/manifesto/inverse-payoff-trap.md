---
id: "authored-inverse-payoff-trap"
title: "The Inverse Payoff Trap"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/03-reflexivity-and-convexity"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-03-reflexivity-and-convexity", "section-07-token-margined-issues-perculator-07-docs-03-reflexivity-and-convexity-3-2-negative-convexity-and-the-inverse-payoff-trap", "authored-token-margined-reflexivity-risk"]
---

# The Inverse Payoff Trap

Neelo's Percolator critique separates token-margined reflexivity from a sharper payoff problem: inverse settlement can make token liabilities grow non-linearly as price falls.

In an inverse perpetual, the trader's token-denominated PnL depends on the difference between inverse prices. That means a short that is profitable in dollar terms can require more and more tokens to settle as the token approaches zero.

## Why The Payout Curve Matters

The source's example is intentionally simple. A short entered near `$1.00` earns almost the same dollar profit whether the token falls to `$0.10`, `$0.01`, or `$0.001`, but the token payout required by the protocol expands dramatically in token terms.

That is the inverse payoff trap. The vault is asked to pay the asset that is collapsing. When price falls, each remaining dollar of trader profit consumes more units of the weakening token. The liability curve gets steeper exactly when the vault is least able to absorb it.

## Linear Settlement Contrast

The source contrasts this with USDC-margined linear settlement. If a trader shorts `$1,000` of notional and the token falls by `99%`, the payout is fixed in USDC terms. The liability can still be large, but it does not become a hyperbolic token obligation.

That distinction is one reason Vibe's source corpus treats settlement unit as architecture, not accounting detail. If the settlement unit is the same unstable token as the underlying, the protocol inherits token-denominated convexity. If settlement is stable and linear, insurance, margin, and solver capital can reason about bounded dollar liabilities.

## Reader Implication

The compendium should not describe token-margined risk only as "same asset collateral." The deeper problem is that token liabilities can expand in the unit that is failing. That is why linear settlement matters for payout credibility in long-tail markets.

## Sources

- `vibe-papers`: Neelo, "Section 3: Reflexivity and Negative Convexity".

## Related Pages

- `authored-token-margined-reflexivity-risk`
- `authored-usdc-settlement-inventory-separation`
- `section-07-token-margined-issues-perculator-07-docs-03-reflexivity-and-convexity-3-2-negative-convexity-and-the-inverse-payoff-trap`

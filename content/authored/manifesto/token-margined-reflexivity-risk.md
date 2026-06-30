---
id: "authored-token-margined-reflexivity-risk"
title: "Token-Margined Reflexivity Risk"
section: "manifesto"
track: "10 — Risk Architecture"
status: "published"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/03-reflexivity-and-convexity"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-03-reflexivity-and-convexity", "authored-token-vault-perps-versus-usdc-pools", "authored-liquidity-as-trader-experience", "authored-funding-as-market-balancing"]
---

# Token-Margined Reflexivity Risk

The token-margined risk argument is about correlation between collateral and exposure. If the position and the collateral are both tied to the same asset, a price move can damage the trade and the margin base at the same time.

That creates reflexivity. A falling token price can reduce position value, reduce collateral value, accelerate liquidations, and create more sell pressure. In a thin or newly listed market, the venue can become part of the volatility engine rather than only a place where volatility is observed.

Neelo's source also highlights the inverse payoff problem. Token-denominated liabilities can expand in token terms as price falls. A short that looks bounded in dollars can require more and more tokens to settle if the token approaches zero. The important compendium point is not a single formula; it is the risk category. When collateral, payout, and underlying are all the same unstable asset, the market can contain endogenous risk that USDC-margined linear systems avoid.

This page should sit next to the token-vault and liquidity-experience pages. It explains why "permissionless derivatives" cannot mean "list anything with any collateral and hope the market works." The architecture needs to make collateral, payout, liquidation, insurance, and settlement assumptions legible.

## Reader Implication

LPs and solvers should ask whether the collateral base degrades exactly when the market needs it. Traders should ask whether the venue can settle gains without relying on a collapsing asset. Documentation should state the settlement unit and collateral risk before presenting a market as liquid.

## Sources

- `vibe-papers`: Neelo, "Section 3: Reflexivity and Negative Convexity".

## Related Pages

- `authored-token-vault-perps-versus-usdc-pools`
- `authored-liquidity-as-trader-experience`
- `authored-funding-as-market-balancing`

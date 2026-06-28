---
id: "authored-token-margined-lp-lose-lose"
title: "The Token-Margined LP Lose-Lose"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "publication-candidate"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/04-lp-economics-and-leverage"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-04-lp-economics-and-leverage", "section-07-token-margined-issues-perculator-07-docs-04-lp-economics-and-leverage-4-1-the-lp-lose-lose-quadrant", "section-07-token-margined-issues-perculator-07-docs-04-lp-economics-and-leverage-4-2-the-fee-illusion"]
---

# The Token-Margined LP Lose-Lose

Neelo's Percolator critique makes the LP problem sharper than generic "LPs take risk." In a token-margined inverse market, the LP is exposed to the token in every state: collateral, fees, funding, profit, and loss are all denominated in the same volatile asset.

That creates a lose-lose quadrant. If the token pumps and traders are long, the LP loses tokens and underperforms simple holding. If the token dumps and traders are short, the LP receives more of a collapsing token. If the LP wins fees or funding, those earnings still share the same token risk. The LP is effectively short volatility while being paid in the volatile object.

The source also names the leverage constraint. To survive meaningful pumps without bankruptcy, a token-margined LP needs collateral close to open interest. That destroys the capital efficiency that makes perps useful. A leveraged derivatives venue that can only operate safely near one-to-one collateralization starts to resemble spot with extra fragility.

This does not mean every inventory provider is irrational. A project treasury might accept inventory risk for strategic reasons. A seller may want to distribute slowly. But that is not the same thing as a scalable, general-purpose liquidity model for long-tail perps.

## Reader Implication

LPs should ask what they are paid in, what they lose in, and whether they would be better off holding or selling the token directly. Docs should not describe token-denominated fees as yield without also explaining the token-denominated loss path.

## Sources

- `vibe-papers`: Neelo, "Section 4: LP Economics and the 1x Leverage Constraint".

## Related Pages

- `authored-token-margined-reflexivity-risk`
- `authored-token-vault-perps-versus-usdc-pools`
- `authored-lp-yield-capital-efficiency-pillar`

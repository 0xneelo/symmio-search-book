---
id: "authored-token-margined-short-volatility-profile"
title: "Token-Margined LPs Are Short Volatility"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/04-lp-economics-and-leverage"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-04-lp-economics-and-leverage", "section-07-token-margined-issues-perculator-07-docs-04-lp-economics-and-leverage-4-1-the-lp-lose-lose-quadrant", "authored-token-margined-lp-lose-lose"]
---

# Token-Margined LPs Are Short Volatility

The LP lose-lose quadrant in Neelo's Percolator source can be summarized as a volatility position. The LP tends to do best when price stays relatively flat. Large moves in either direction create bad states.

On a pump, winning longs can take tokens from the LP, so the LP underperforms simple holding. On a dump, winning shorts can leave the LP with more units of a weaker token, while losing longs may transfer collateral whose dollar value has collapsed. The edge case where shorts lose into a pumping token exists, but the source treats it as less likely because shorting a fast-pumping memecoin is not the dominant flow assumption.

## Why This Is Not Ordinary Inventory Risk

Inventory risk is already familiar to market makers. The Percolator critique is narrower: the LP is short volatility while collateral, fees, funding, and settlement all share the same unstable token unit.

That means the LP is not merely exposed to price. The LP is exposed to realized market movement through trader PnL and to mark-to-market collateral value through the same asset. Volatility attacks both the liability side and the balance-sheet side.

## Reader Implication

LP docs should tell readers that token-margined LPing is a volatility-bearing position, not only a passive fee-earning position. A market can show activity and fees while still putting LPs in a payoff shape that only works under narrow price behavior.

## Sources

- `vibe-papers`: Neelo, "Section 4: LP Economics and the 1x Leverage Constraint", "4.1 The LP Lose-Lose Quadrant".

## Related Pages

- `authored-token-margined-lp-lose-lose`
- `authored-inverse-payoff-trap`
- `authored-lp-profit-decomposition-map`

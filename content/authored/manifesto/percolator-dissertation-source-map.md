---
id: "authored-percolator-dissertation-source-map"
title: "Percolator Dissertation Source Map"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/overview", "https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/dissertation", "https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/01-introduction"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-overview", "neelo-07-token-margined-issues-perculator-07-docs-dissertation", "neelo-07-token-margined-issues-perculator-07-docs-01-introduction", "authored-token-margined-reflexivity-risk", "authored-percolator-engineering-vs-economics", "authored-usdc-settlement-inventory-separation", "authored-percolator-seven-failure-mode-synthesis"]
---

# Percolator Dissertation Source Map

Neelo's Percolator dissertation is the compendium's main source for why token-margined inverse perpetuals are structurally fragile for volatile long-tail assets. The overview, single-file dissertation, and introduction all serve the same editorial job: they orient the reader before the source splits into exact failure modes.

The source's starting question is simple: what currency should collateral, PnL, fees, funding, and settlement use? In a linear USDC-margined design, trader PnL is measured in a stable unit. In an inverse token-margined design, the traded asset also becomes collateral and settlement currency. That choice is not cosmetic. It determines the risk profile of the whole market.

## How To Read The Source

Use `authored-token-margined-reflexivity-risk` when the reader asks why same-asset collateral is dangerous. That page explains the double hit: the position can move against the account while the collateral base weakens at the same time.

Use `authored-inverse-payoff-trap` or `authored-linear-pnl-versus-hyperbolic-payout` when the reader asks why inverse settlement is mathematically different. The core issue is that token-denominated liabilities can expand as the token weakens, while USDC-denominated liabilities remain linear.

Use `authored-token-margined-lp-lose-lose`, `authored-token-denominated-fee-illusion`, and `authored-one-x-leverage-ceiling` when the reader asks why LPs are structurally constrained. The source does not merely say LPs take risk. It argues that token-margined LPs can be short volatility, paid in the same unstable unit, and forced toward low utilization if the market wants to survive.

Use `authored-oracle-circuit-breaker-paradox`, `authored-spot-perp-pump-dump-attack`, and `authored-shorting-death-spiral` when the reader asks about adversarial states. Those pages cover the oracle, manipulation, and tail-payout mechanics that make low-cap inverse markets especially fragile.

Use `authored-percolator-engineering-vs-economics` when the reader asks whether the critique is about poor engineering. The answer is no. The source credits Percolator's engineering, formal verification, matcher modularity, and on-chain execution, then argues that those strengths cannot remove the economic consequences of the inverse token-margined model.

Use `authored-usdc-settlement-inventory-separation` when the reader asks what alternative the source proposes. The thesis is not "never use token inventory." It is "separate token inventory from settlement solvency." Token inventory can help bootstrap a market, but trader PnL should not depend on a collapsing payout unit.

## The Dissertation Thesis

The Percolator source is strongest when read as a structural argument:

- the same token should not simultaneously be the underlying, collateral, inventory, fee unit, insurance unit, and payout unit for volatile low-cap leverage;
- a correct state machine can still instantiate fragile market economics;
- a permissionless perp system needs active risk management and stable settlement if it wants to support assets before mature order books exist;
- Vibe's USDC-margined hybrid model is presented as a response to that market-design problem, not as a denial that Percolator has meaningful technical strengths.

That reading keeps the compendium precise. Percolator is not a strawman. It is a serious proof that a fully on-chain derivatives engine can exist. The critique is that a token-margined inverse engine is the wrong economic substrate for the long-tail market-creation problem Vibe is trying to solve.

## Publication Boundary

Percolator SOV parameters, vault balances, open interest, fee rates, oracle caps, proof counts, repository state, deployed programs, and live market behavior must be refreshed from primary sources before publication as current facts. This page preserves the source thesis and reading map; it does not publish live Percolator or Vibe production guarantees.

## Sources

- `vibe-papers`: Neelo Percolator overview, single-file dissertation, and introduction.

## Related Pages

- `authored-token-margined-reflexivity-risk`
- `authored-inverse-payoff-trap`
- `authored-percolator-engineering-vs-economics`
- `authored-usdc-settlement-inventory-separation`
- `authored-percolator-seven-failure-mode-synthesis`

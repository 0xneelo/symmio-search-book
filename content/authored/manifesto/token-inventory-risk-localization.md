---
id: "authored-token-inventory-risk-localization"
title: "Token Inventory Localizes Risk"
section: "manifesto"
track: "06 - USDC vs Token-Margined Perpetuals"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/overview", "https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/figure3"]
relatedGeneratedPages: ["neelo-06-usdc-token-perps-06-docs-overview", "neelo-06-usdc-token-perps-06-docs-figure3", "authored-token-holder-inventory-alignment"]
---

# Token Inventory Localizes Risk

The VibeCaps side of Neelo's comparison is not "no one takes risk." It is a different risk location.

Project treasuries, whales, or committed token holders already carry exposure to the asset. When some of that inventory supports a perp market, the marginal risk is closer to the risk they already chose to hold. A solver or market maker can then manage order-flow imbalance, spreads, funding, and hedging around that inventory.

Figure3 separates this from protocol-wide insolvency. Order-flow imbalance, model error, and hedge execution can create solver PnL volatility or capital drawdown. Token repricing affects the token holders who already held the asset. That is still real risk, but it is not the same as asking unrelated USDC LPs to absorb every long-tail market's bad debt.

## Reader Implication

Docs should describe token inventory as localized market support, not as a magical backstop. The key question is whether the risk is borne by capital that understands and already owns the asset, with stable settlement obligations kept separate.

## Publication Note

Exact VibeCaps vault terms, solver obligations, revenue shares, withdrawal rules, and loss ordering still need operator and implementation review before publication as product guarantees.

## Sources

- `vibe-papers`: Neelo, "USDC vs Token-Margined Perpetuals".
- `vibe-papers`: Neelo, "Figure3".

## Related Pages

- `authored-token-holder-inventory-alignment`
- `authored-usdc-settlement-inventory-separation`
- `authored-residual-counterparty-hedge-first`

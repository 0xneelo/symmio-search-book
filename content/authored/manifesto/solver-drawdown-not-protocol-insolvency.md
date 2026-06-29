---
id: "authored-solver-drawdown-not-protocol-insolvency"
title: "Solver Drawdown Is Not Protocol Insolvency"
section: "manifesto"
track: "06 - USDC vs Token-Margined Perpetuals"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/figure3"]
relatedGeneratedPages: ["neelo-06-usdc-token-perps-06-docs-figure3", "authored-token-inventory-risk-localization", "authored-token-holder-inventory-alignment", "authored-residual-counterparty-hedge-first"]
---

# Solver Drawdown Is Not Protocol Insolvency

Figure3 separates solver-level PnL volatility from protocol-wide insolvency.

In the source flow, order-flow imbalance, model/spread/funding error, and external hedge execution risk route into solver PnL volatility. That volatility can become solver capital drawdown. The diagram explicitly labels that outcome as "not protocol-wide insolvency."

This distinction is central to token-inventory market design. A solver or market maker can lose money managing inventory, hedges, funding, and spreads. That is real operating risk. But it is different from a design where generic USDC LP capital is the broad backstop for every market's bad debt and therefore where a market failure can become a pool-wide solvency problem.

Figure3 also separates protocol or smart-contract risk from SIM market risk. Protocol risk can still create systemic protocol loss. Token repricing is borne by the same holders who already held the token. The documentation should keep those buckets separate instead of saying "risk is gone."

## Reader Implication

The right claim is risk localization, not risk elimination. Docs should explain whether a loss hits solver capital, token inventory holders, protocol contracts, settlement capital, or users. Those are different questions with different mitigations.

## Publication Boundary

Do not publish this as a guarantee that solver losses can never affect users, vaults, or protocol operation. Live loss waterfalls, solver capital requirements, liquidation rules, hedge venues, insurance policy, and smart-contract risk controls need operator/risk/security/legal review.

## Sources

- `vibe-papers`: Neelo, "Figure3".

## Related Pages

- `authored-token-inventory-risk-localization`
- `authored-token-holder-inventory-alignment`
- `authored-residual-counterparty-hedge-first`

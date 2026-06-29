---
id: "authored-percolator-sov-insurance-deflation-model"
title: "Percolator SOV Insurance And Deflation Model"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/02-percolator-architecture"]
relatedGeneratedPages: ["neelo-07-token-margined-issues-perculator-07-docs-02-percolator-architecture", "authored-token-margined-reflexivity-risk", "authored-inverse-payoff-trap"]
---

# Percolator SOV Insurance And Deflation Model

Neelo's Percolator SOV section is useful because it makes the token-margined design concrete.

In the source, Percolator SOV uses PERC as collateral token, traded asset, and settlement currency. Trading fees accumulate into an on-chain insurance fund denominated in PERC. The source also notes the burned-admin-key and deflationary narrative: every trade is framed as shrinking circulating PERC supply.

The documentation risk is that an insurance fund can sound stable when its unit is the same volatile token that the market trades. A token-denominated insurance fund may grow in token count while still weakening in dollar terms during the exact market state where winners need to be paid. The deflationary narrative also does not remove the economic question of whether the vault can satisfy token-denominated liabilities during stress.

## Reader Implication

When a market says fees build insurance, docs must name the insurance unit. Token-denominated insurance can be valuable, but it is not the same thing as stable settlement capital. The unit of protection determines what stress states it can actually absorb.

## Publication Boundary

Keep SOV parameters, vault balance, open interest, fee rate, circuit breaker, and utilization figures as source-context examples unless refreshed against current primary sources. Do not present them as live numbers or legal/economic assurances.

## Sources

- `vibe-papers`: Neelo, "Section 2: Percolator Architecture".

## Related Pages

- `authored-token-margined-reflexivity-risk`
- `authored-inverse-payoff-trap`
- `authored-usdc-settlement-inventory-separation`

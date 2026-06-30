---
id: "authored-vibe-collateral-and-margining"
title: "Vibe Collateral And Margining"
section: "product-reference"
track: "Risk And Margin"
status: "published"
sourceKeys: ["vibe-collateral-margining", "vibe-margin", "symmio-core"]
sourceUrls: ["https://docs.vibe.trading/trading/collateral-and-margining.md", "https://docs.vibe.trading/trading/managing-vibecaps-margin.md", "https://docs.symm.io/getting-started/core-concepts.md"]
relatedGeneratedPages: ["vibe-collateral-margining", "vibe-vibecaps-margin", "vibe-account-health-liquidations", "authored-collateral-margin-cva"]
---

# Vibe Collateral And Margining

Vibe's current collateral guide makes USDC the base settlement and collateral unit for traders, and says solvers also deposit equivalent USDC for symmetry. It also documents CVA as a liquidation penalty paid to the non-liquidated party.

The docs should keep collateral, margin, CVA, balance, and liquidation risk separate. Treating them as synonyms makes the risk model harder to reason about.

## Cross-Margin Accounts

The official page says Vibe uses cross-margin accounts by default. In that mode, the user's overall account equity backs multiple positions. Gains on one position can offset losses on another, but the account also carries shared liquidation risk: if overall equity falls below maintenance margin, all positions can be liquidated.

This is the capital-efficiency tradeoff. Cross-margin can reduce idle collateral, but the reader must understand that risk is shared across the account.

## Isolated Margin And VibeCaps

The same official page says VibeCaps now uses isolated margin through virtual accounts. A virtual account is an isolated bucket connected to a position, market, or market direction depending on the account's isolation settings.

That means a liquidation in one isolated virtual account should not drain margin from another isolated virtual account. The companion VibeCaps margin page explains how adding margin increases the collateral buffer and moves liquidation farther away, while removing margin frees balance and moves liquidation closer.

## Reader Implication

When explaining margin, start with the mode: cross-margin shares account equity across positions; isolated margin confines risk to a virtual account or bucket. Then explain the action: adding margin increases cushion; removing margin releases balance but increases liquidation risk.

## Sources

- `vibe-collateral-margining`: official Vibe collateral, CVA, cross-margin, isolated-margin, and virtual-account descriptions.
- `vibe-margin`: VibeCaps add/remove margin behavior.
- `symmio-core`: protocol vocabulary for collateral, locked margin, CVA, and balance.

## Related Pages

- `authored-vibecaps-margin-management`
- `authored-collateral-margin-cva`
- `authored-vibe-tpsl`
- `vibe-collateral-margining`

---
id: "authored-vibecaps-margin-management"
title: "VibeCaps Margin Management"
section: "product-reference"
track: "Risk And Margin"
status: "publication-candidate"
sourceKeys: ["vibe-margin", "symmio-core"]
sourceUrls: ["https://docs.vibe.trading/trading/managing-vibecaps-margin.md", "https://docs.symm.io/getting-started/core-concepts.md"]
relatedGeneratedPages: ["vibe-vibecaps-margin", "authored-collateral-margin-cva", "authored-token-vault-perps-versus-usdc-pools"]
---

# VibeCaps Margin Management

VibeCaps margin management is a risk adjustment on an existing position, not a new trade.

The official Vibe margin page says Manage Margin lets a user add or remove collateral from an existing VibeCaps position without changing position size. That is the core support answer: margin changes the cushion, not the exposure size.

## Adding Margin

Adding margin moves more USDC from the VibeCaps account balance into the position's virtual account. The page states that this gives the position more collateral to absorb unrealized losses and moves the liquidation price farther away from the current market price.

For a long position, the liquidation price moves lower. For a short position, it moves higher. Adding margin does not increase position size, change entry price, or open a new trade.

## Removing Margin

Removing margin moves available collateral from the position's virtual account back to account balance. That frees funds, but reduces the safety buffer and moves the liquidation price closer to the current market price.

The current public docs say Vibe only allows margin removal if the position remains sufficiently collateralized after current unrealized PnL, locked margin, and pending locked margin are considered.

## Protocol Vocabulary

Symmio's core docs help explain why the buckets matter: collateral is deposited money; margin is collateral locked for a position; CVA is an additional default-protection buffer. VibeCaps pages should preserve those distinctions instead of using "funds", "balance", "margin", and "collateral" interchangeably.

## Reader Implication

When a trader asks how VibeCaps margin works, answer in terms of liquidation distance and balance buckets. More margin means more cushion and less free balance. Less margin means more free balance and less cushion. Neither action changes the position size by itself.

## Sources

- `vibe-margin`: official VibeCaps add/remove margin behavior, liquidation-distance effects, and removal constraints.
- `symmio-core`: collateral, margin, CVA, and available-balance vocabulary.

## Related Pages

- `authored-collateral-margin-cva`
- `authored-vibe-intent-architecture`
- `authored-token-vault-perps-versus-usdc-pools`
- `vibe-vibecaps-margin`

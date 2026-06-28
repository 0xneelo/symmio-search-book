---
id: "authored-symmio-cross-margin-liquidations"
title: "Symmio Cross-Margin Liquidations"
section: "protocol-reference"
track: "Symmio Operations"
status: "publication-candidate"
sourceKeys: ["symmio-liquidations", "symmio-core"]
sourceUrls: ["https://docs.symm.io/trader-documentation/how-trading-works-in-symmio/liquidations.md", "https://docs.symm.io/getting-started/core-concepts.md"]
relatedGeneratedPages: ["symmio-liquidations", "authored-collateral-margin-cva", "authored-bilateral-intent-lifecycle"]
---

# Symmio Cross-Margin Liquidations

Symmio liquidation starts from allocated collateral, not from a single isolated ticket. The official docs separate a trader's balance into pending margin, locked margin, and free balance. Pending margin is reserved for quotes waiting to be accepted. Locked margin actively backs open positions. Free balance is the remaining collateral available for new risk or withdrawal.

Every position on Symmio is cross-margin in the official liquidation description. That means PartyA's allocated balance supports the account across open positions and pending quotes. As unrealized PnL moves against the account, the protocol draws on collateral in sequence: locked margin, free balance, and pending locked amounts. If losses breach the lowest allowed threshold, the account is unsafe.

## Account-Wide Liquidation

Because the account is cross-margined, PartyA is liquidated as a whole. Open positions and outstanding quotes move into liquidation together, rather than one position being isolated from the rest of the account.

Liquidators use signed data from the Muon network to prove total losses and market prices. The protocol then closes positions, redistributes collateral between PartyA and counterparties, and pays a liquidator fee. CVA and margin are applied according to protocol rules.

## Publication Boundary

This page should teach the liquidation shape: pending versus locked versus free balance, cross-margin account treatment, Muon-backed loss proof, and liquidator execution. It should not publish current thresholds, fee amounts, or product-specific Vibe liquidation UI behavior without current implementation evidence.

## Sources

- `symmio-liquidations`: official Symmio liquidation mechanics.
- `symmio-core`: official collateral, margin, and CVA vocabulary.

## Related Pages

- `authored-collateral-margin-cva`
- `authored-vibe-collateral-and-margining`
- `authored-loss-waterfall-and-profit-caps`

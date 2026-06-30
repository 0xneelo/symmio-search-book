---
id: "authored-vibe-account-health-and-liquidations"
title: "Vibe Account Health And Liquidations"
section: "product-reference"
track: "Risk And Margin"
status: "published"
sourceKeys: ["vibe-account-health-liquidations", "vibe-collateral-margining", "symmio-liquidations"]
sourceUrls: ["https://docs.vibe.trading/trading/account-health-and-liquidations.md", "https://docs.vibe.trading/trading/collateral-and-margining.md", "https://docs.symm.io/trader-documentation/how-trading-works-in-symmio/liquidations.md"]
relatedGeneratedPages: ["vibe-account-health-liquidations", "vibe-collateral-margining", "symmio-liquidations", "authored-symmio-cross-margin-liquidations"]
---

# Vibe Account Health And Liquidations

Account health is the user-facing risk gauge for liquidation proximity. The official guide ties it to equity relative to maintenance margin/CVA, then shows the user that risk through the Account Overview tab and visual health indicator.

## Liquidation Trigger And Scope

The official Vibe account-health page says liquidation occurs when Equity Balance falls below Maintenance Margin (CVA). If liquidation happens, the CVA locked in the affected trades is forfeited to the counterparty.

Liquidation scope depends on margin mode. Cross-margin accounts can have multiple positions closed because account balance backs the shared account. VibeCaps uses isolated virtual accounts, so liquidation is scoped to the affected virtual account rather than other VibeCaps virtual accounts.

## Balance Terms

The product page gives three terms the docs should keep separate:

- Allocated Balance: the full amount designated to the account, including equity.
- Locked Margin: the portion of equity locked in open trades.
- Available for Orders: funds remaining for new positions after margin and maintenance requirements.

The public formula for equity is:

```text
Equity Balance = Allocated Balance + uPNL
```

The public formula for available order capacity is:

```text
Available for Orders = Equity Balance - Locked Margin - Maintenance Margin
```

## Reader Implication

When answering "am I close to liquidation?", do not only say "watch account health." Explain the components: equity, unrealized PnL, locked margin, maintenance margin/CVA, and margin mode. The same account-health percentage has different practical consequences under cross-margin and isolated VibeCaps virtual-account settings.

## Sources

- `vibe-account-health-liquidations`: official account-health, liquidation trigger, CVA forfeiture, equity, locked-margin, and available-for-orders formulas.
- `vibe-collateral-margining`: Vibe cross-margin, isolated margin, and virtual-account context.
- `symmio-liquidations`: protocol-level liquidation context for cross-margin PartyA accounts.

## Related Pages

- `authored-vibe-collateral-and-margining`
- `authored-vibecaps-margin-management`
- `authored-symmio-cross-margin-liquidations`
- `authored-collateral-margin-cva`

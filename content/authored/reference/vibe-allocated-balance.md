---
id: "authored-vibe-allocated-balance"
title: "Vibe Allocated Balance"
section: "product-reference"
track: "Account And Safety"
status: "publication-candidate"
volumeId: "volume-07-product-trading-and-risk"
sourceKeys: ["vibe-deposits-withdrawals", "vibe-account-health-liquidations", "vibe-account-portfolio"]
sourceUrls: ["https://docs.vibe.trading/getting-started/deposits-and-withdrawals.md", "https://docs.vibe.trading/trading/account-health-and-liquidations.md", "https://docs.vibe.trading/trading/my-account-portfolio-charts-and-data.md"]
relatedGeneratedPages: ["vibe-deposits-withdrawals", "vibe-account-health-liquidations", "vibe-account-portfolio"]
---

# Vibe Allocated Balance

Allocated Balance is the account-side balance users should distinguish from wallet funds, pending withdrawals, and position-level margin.

The official deposit guide says that after a deposit transaction is confirmed on-chain, the USDC amount appears in Allocated Balance. That makes Allocated Balance the visible funded amount inside the Vibe account rather than merely a wallet balance.

The account-health guide then uses Allocated Balance in risk math. It defines equity as Allocated Balance plus unrealized PnL, and it uses equity, locked margin, maintenance margin, and CVA to explain available order capacity and liquidation risk.

## Why The Term Matters

Support answers should be precise about which balance bucket moved:

- wallet or smart-wallet funds before deposit;
- Allocated Balance after confirmed deposit credit;
- locked margin once a position or quote uses collateral;
- equity after unrealized PnL is included;
- pending withdrawal during the withdrawal flow.

That vocabulary prevents a common user confusion: seeing funds in one place and expecting them to be immediately available for every action. A confirmed deposit, an allocated account balance, free trading capacity, and withdrawable funds are related but not identical.

## Sources

- `vibe-deposits-withdrawals`: official Allocated Balance crediting after confirmed deposits.
- `vibe-account-health-liquidations`: official equity and available-for-orders formulas using Allocated Balance.
- `vibe-account-portfolio`: official My Account balance and account-health context.

## Related Pages

- `authored-vibe-deposits-and-withdrawals`
- `authored-vibe-account-health-and-liquidations`
- `authored-vibecaps-margin-management`

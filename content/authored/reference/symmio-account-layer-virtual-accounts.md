---
id: "authored-symmio-account-layer-virtual-accounts"
title: "Symmio Account Layer And Virtual Accounts"
section: "protocol-reference"
track: "Symmio Contracts"
status: "published"
sourceKeys: ["symmio-contract-architecture", "symmio-core"]
sourceUrls: ["https://docs.symm.io/security-and-architecture/contract-architecture-overview.md", "https://docs.symm.io/getting-started/core-concepts.md"]
relatedGeneratedPages: ["symmio-contract-architecture", "symmio-core-concepts", "authored-symmio-cross-margin-liquidations"]
---

# Symmio Account Layer And Virtual Accounts

The Account Layer page introduces the hierarchy that sits between a user and Symmio Core: a user owns SubAccounts, and SubAccounts own Virtual Accounts.

## SubAccounts

SubAccounts are the user's top-level organizational units. The official architecture page says each SubAccount is bound to a frontend affiliate, a Symmio Core instance, and an isolation type chosen at creation.

That matters for Vibe x Symmio docs because "one user account" is not always the same thing as "one risk bucket." A user can separate conservative and aggressive activity into different account units if the product exposes that structure.

## Virtual Accounts

Virtual Accounts sit under SubAccounts and act as PartyA addresses on Symmio Core. They provide position isolation, hold their own balance and allocated margin, and carry their own positions. When a Virtual Account's final position closes, the official page says funds are swept back to the parent SubAccount and the address is recycled.

The architecture page also names isolation modes: one Virtual Account per position, per market, per market direction, or caller-supplied custom addresses.

## Reader Implication

For traders, this explains why margin, liquidation, and withdrawals may depend on which account or isolated position container holds the funds. For frontend builders, it explains why account UX must map product concepts onto SubAccounts and Virtual Accounts rather than hiding all settlement state behind one balance label.

## Publication Boundary

Do not publish final Vibe account-mode support, deployed account-layer versions, frontend-specific isolation defaults, withdrawal UX promises, or contract-address inventories without product and implementation review. The source-backed claim is the Symmio account hierarchy and the role of Virtual Accounts as isolated PartyA containers.

## Sources

- `symmio-contract-architecture`: official SubAccount, Virtual Account, funds-flow, and isolation-type descriptions.
- `symmio-core`: official core account, collateral, margin, and PartyA vocabulary.

## Related Pages

- `authored-symmio-cross-margin-liquidations`
- `authored-vibe-account-health-and-liquidations`
- `authored-collateral-margin-cva`

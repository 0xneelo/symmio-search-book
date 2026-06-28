---
id: "authored-symmio-contract-surface"
title: "Symmio Contract Surface"
section: "protocol-reference"
track: "Symmio Contracts"
status: "publication-candidate-needs-operator-review"
sourceKeys: ["symmio-contract-architecture", "symmio-core", "symmio-options-docs"]
sourceUrls: ["https://docs.symm.io/security-and-architecture/contract-architecture-overview.md", "https://docs.symm.io/getting-started/core-concepts.md", "https://docs.symm.io/contract-documentation/symmio-options-v0.2.1.md"]
relatedGeneratedPages: ["symmio-contract-architecture", "symmio-core-concepts", "symmio-options-contracts"]
---

# Symmio Contract Surface

The current Symmio contract architecture page describes a protocol surface made of multiple diamonds and supporting contracts rather than one monolithic settlement contract.

## Core Surfaces

Symmio Core, also called the perps diamond in the official architecture page, facilitates bilateral trades between PartyA and PartyB. It covers quote creation, locking, opening, closing, settlement, and liquidation.

The Account Layer is a standalone diamond proxy for user account organization. It owns SubAccounts and deterministic Virtual Accounts, registers affiliates, distributes affiliate fees, supports express deposits, and can expose hooks for custom on-chain logic.

The Instant Layer is another diamond that mediates user-signed operations through EIP-712 signed-operation structures, templates, delegation, and operator-submitted batches.

Around those diamonds sit supporting contracts: the external Muon signature verifier, the ClearingHouse for privileged insolvency and stuck-liquidation paths, provider contracts in the withdraw system, pledge collateral, and a liquidation insurance vault.

## Why Readers Need This Map

Vibe readers should not think of Symmio as only a generic backend. It is an intent-based bilateral settlement stack with separated surfaces for account organization, user-signed execution, solver/PartyB operations, signatures, liquidation, and withdrawal delivery.

## Publication Note

The architecture page is version-sensitive. Final publication should verify the current Symmio version, deployed contract set, and whether Vibe uses the same surfaces for each product before presenting any contract inventory as live production fact.

## Sources

- `symmio-contract-architecture`: official Symmio contract architecture overview.
- `symmio-core`: core PartyA, PartyB, collateral, and intent vocabulary.
- `symmio-options-docs`: current options contract documentation entry point.

## Related Pages

- `authored-symmio-party-a-party-b`
- `authored-bilateral-intent-lifecycle`
- `authored-options-intent-lifecycle`

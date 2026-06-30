---
id: "authored-symmio-withdrawal-provider-system"
title: "Symmio Withdrawal And Provider System"
section: "protocol-reference"
track: "Symmio Contracts"
status: "published"
sourceKeys: ["symmio-contract-architecture", "symmio-contract-interactions"]
sourceUrls: ["https://docs.symm.io/security-and-architecture/contract-architecture-overview.md", "https://docs.symm.io/trader-documentation/interacting-with-contracts.md"]
relatedGeneratedPages: ["symmio-contract-architecture", "symmio-contracts", "authored-vibe-deposits-and-withdrawals"]
---

# Symmio Withdrawal And Provider System

The official architecture page describes withdrawals as a lifecycle that begins with deallocated free balance, not with margin still assigned to positions.

## From Allocated Margin To Withdrawal

The source flow is: allocated margin sits in a Virtual Account, margin is removed and swept back to the SubAccount balance, the resulting free balance can initiate a withdrawal, and finalization happens after the relevant cooldown or provider flow completes.

That distinction is useful for product docs. A user may see assets in a position or account container, but the withdrawable amount depends on whether those funds are still allocated to margin.

## Withdrawal Paths

The current architecture page names several withdrawal paths: normal same-chain withdrawal after cooldown, pure express same-chain withdrawal, pure virtual cross-chain withdrawal, and virtual express cross-chain withdrawal.

Express providers can front funds for a fee. Virtual providers support cross-chain delivery and implement lifecycle callbacks. The page also describes cancellation behavior, blackout windows around provider acceptance, and administrative force-cancel paths.

## Publication Boundary

The exact withdrawal paths, cooldowns, fees, provider coverage, and Vibe product support should be verified on publication date. This page documents Symmio architecture, not a promise that every path is live in every frontend.

## Sources

- `symmio-contract-architecture`: official withdrawal-system, provider, deallocation, and cooldown architecture.
- `symmio-contract-interactions`: official contract-interaction index for trader-facing contract operations.

## Related Pages

- `authored-vibe-deposits-and-withdrawals`
- `authored-symmio-contract-surface`
- `authored-symmio-settlement-profit-realization`

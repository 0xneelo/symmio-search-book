---
id: "authored-settlement-contract-responsibility-map"
title: "Settlement Contract Responsibility Map"
section: "manifesto"
track: "07 — Technical Architecture"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/01-perp-classes-zscore/01-docs/06-technical-deep-dive#6-2-settlement-layer-on-chain"]
relatedGeneratedPages: ["section-01-perp-classes-zscore-01-docs-06-technical-deep-dive-6-2-settlement-layer-on-chain", "authored-settlement-state-boundary", "authored-technical-architecture-layer-map"]
---

# Settlement Contract Responsibility Map

The on-chain settlement layer is where durable financial state belongs. Neelo's source describes three core responsibility areas: vault capital, position state, and insurance reserves.

The vault contract manages capital that backs solver operation. Its model responsibilities are deposit, withdrawal, utilization tracking, and available capacity. The position contract tracks open positions, margin changes, and close state. The insurance fund contract manages risk reserves, claims, balances, and utilization.

## What The Settlement Layer Owns

The settlement layer should own facts that cannot be left to a private service:

- position ownership;
- collateral balances;
- vault shares;
- insurance fund balances;
- settlement records.

The solver can validate, quote, and submit settlement information, but the final balance and position updates need an enforceable state transition.

## Trade Settlement Flow

The source's model flow is intent, solver validation, settlement proof, contract verification, and final position or balance update. That flow keeps execution flexible while preserving a contract-side record of the resulting financial state.

## Publication Boundary

The source includes illustrative function names and a TODO for final smart-contract architecture, access controls, and upgrade mechanisms. Treat the contract names here as responsibility buckets, not confirmed production ABI, access-control, or upgrade-policy documentation.

## Sources

- `vibe-papers`: Neelo, "Section 6: Technical Deep Dive: 6.2 Settlement Layer (On-Chain)".

## Related Pages

- `authored-settlement-state-boundary`
- `authored-technical-security-model`
- `authored-symmio-clearing-house-layer`

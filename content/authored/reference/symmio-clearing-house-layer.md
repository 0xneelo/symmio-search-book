---
id: "authored-symmio-clearing-house-layer"
title: "Symmio Clearing-House Layer"
section: "protocol-reference"
track: "Symmio Core"
status: "published"
sourceKeys: ["symmio-what-is", "symmio-core", "symmio-whitepaper"]
sourceUrls: ["https://docs.symm.io/getting-started/what-is-symmio.md", "https://docs.symm.io/getting-started/core-concepts.md", "https://docs.symm.io/security-and-architecture/symmio-whitepaper.md"]
relatedGeneratedPages: ["symmio-what-is", "symmio-core-concepts", "symmio-whitepaper", "authored-symmio-party-a-party-b"]
---

# Symmio Clearing-House Layer

Symmio should not be documented as another exchange skin. Its public docs frame it as a trustless hybrid on-chain and off-chain clearing house for permissionless derivatives: pricing and quoting can happen off-chain for speed, while collateral, positions, settlement, and lifecycle state are anchored on-chain.

That distinction is the protocol core of the Vibe x Symmio story. Vibe can make intent-based markets feel usable at the product layer, while Symmio supplies the shared settlement grammar underneath: PartyA, PartyB, intent, collateral, margin, CVA, lock, open, close, and liquidation.

## What It Is Not

The strongest reader correction is negative. Symmio's own overview says the protocol does not rely on a central limit order book or pooled liquidity as the core matching model. A trader does not wait for an order book to match them against anonymous resting flow. A trader expresses an intent, and a professional counterparty can choose to take the other side under protocol-enforced collateral and lifecycle rules.

That is why "clearing house" is the better phrase than "venue." Frontends can differ. Solvers can differ. Products can differ. The shared layer is the bilateral agreement, collateral, and settlement path.

## Hybrid Boundary

The hybrid boundary should be visible in every technical page:

- Off-chain systems handle quotation, risk checks, solver decisioning, and hedging strategy.
- On-chain systems track submitted intents, locks, collateral allocation, opened positions, close requests, settlement, and liquidation state.
- Frontends translate the lifecycle into a product experience without becoming the protocol's source of truth.

This boundary also keeps capital-efficiency claims honest. The docs can say Symmio avoids requiring every market to bootstrap a passive pool or order book before trading can exist. The docs should not turn that into a final public efficiency claim for every Vibe market, margin mode, or vault product until the specific product source says so.

## Protocol Status

The current whitepaper page is useful as a present-day protocol pointer, but it also says the system is still a work in progress and points to the full whitepaper artifact. The exact original whitepaper/version-history comparison remains parked under `G-007` and `OPERATOR-INBOX #6`.

## Reader Implication

When a reader asks "what is Symmio?", the answer should start with role and settlement semantics, not exchange analogy. Symmio is the layer that lets different frontends and solvers create enforceable bilateral derivatives positions without making the order book or liquidity pool the primitive.

## Sources

- `symmio-what-is`: Symmio overview, clearing-house framing, no order book/pool model, off-chain quotation, and on-chain settlement.
- `symmio-core`: PartyA/PartyB, intent, collateral, margin, CVA, and lifecycle vocabulary.
- `symmio-whitepaper`: current whitepaper pointer and protocol status note.

## Related Pages

- `authored-bilateral-intent-lifecycle`
- `authored-symmio-party-a-party-b`
- `authored-vibe-trade-flow`
- `symmio-what-is`

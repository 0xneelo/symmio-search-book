---
id: "authored-internal-inventory-primary-hedge"
title: "Internal Inventory As The Primary Low-Cap Hedge"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/solver-as-residual-counterparty/solver-as-residual-counterparty"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-solver-as-residual-counterparty-solver-as-residual-counterparty", "authored-residual-counterparty-hedge-first", "authored-token-lp-attractiveness-model", "authored-token-inventory-risk-localization"]
---

# Internal Inventory As The Primary Low-Cap Hedge

Neelo's DDQ source gives internal inventory a specific role in low-cap markets. When a market is thin, volatile, or easy to front-run, the solver generally should not rush every hedge into open DEX liquidity. The source says the preferred first backing path is internal sourcing: token inventory held in vaults or otherwise controlled by the solver-side system.

That does not mean the market has infinite liquidity. It means the solver can compare the requested trade against inventory depth, market conditions, and expected unwind cost before it accepts residual exposure. Internal inventory gives the quote a buffer against immediate external price impact and against adversarial execution in fragile markets.

## Why It Matters

This page answers a common diligence question: "where does the hedge come from if the token is low-cap?" The source-backed answer is that the system tries to make the first hedge source local to the market, not a panic trade through the thinnest possible venue.

Internal inventory also keeps risk more naturally aligned. Token-side inventory is closer to the market being listed, while external stablecoin or DEX execution is used when it actually improves the risk path.

## Publication Boundary

Exact inventory custody, vault rights, eligible token balances, solver-control mechanics, and live market-specific inventory depth are implementation and operator-review items. The publishable source-backed claim is the hierarchy: internal inventory or vault-controlled liquidity is the preferred primary hedge source for fragile low-cap flow.

## Sources

- `vibe-papers`: Neelo DDQ, "Solver as residual counterparty".

## Related Pages

- `authored-residual-counterparty-hedge-first`
- `authored-token-lp-attractiveness-model`
- `authored-token-inventory-risk-localization`

---
id: "authored-solver-funded-stablecoin-operations"
title: "Solver-Funded Stablecoin Operations"
section: "protocol-reference"
track: "Solver And LP Economics"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/attractiveness-for-lps/attractiveness-for-lps", "https://0xneelo.github.io/vibe_docs/docs/13-framework-value-permissionless-perps/13-docs/03-lp-value-proposition"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-attractiveness-for-lps-attractiveness-for-lps", "section-13-framework-value-permissionless-perps-13-docs-03-lp-value-proposition-3-2-the-usdc-side-solver-funded-not-lp-funded", "authored-solver-funded-usdc-capital-loop"]
---

# Solver-Funded Stablecoin Operations

The DDQ separates stablecoin operations from token-side inventory. In the source model, Vibe does not ask outside LPs to deposit USDC for low-cap perp markets. The stablecoin side is funded and operated by the solver or protocol.

Stablecoins are still necessary. They support settlement, hedging, and cross-chain operational flows. The difference is who provides them and why. Instead of parking a large external stablecoin vault behind every long-tail market, the solver uses stablecoin capital in short operational cycles tied to the trades it is willing to quote and hedge.

## Why This Is Not The Same As Token LPing

Token LPs provide market-specific inventory. They are usually projects, treasuries, whales, or committed holders that already hold the asset being listed. Stablecoin operations are different: they are settlement and hedging infrastructure controlled by the actor pricing the risk.

Collapsing those two roles into one word, "liquidity," makes the system harder to understand. The DDQ's point is that stable settlement capital and token inventory should be assigned to different parties because they carry different risks.

## Why Solver Control Matters

The source argues that the solver has direct operational control over stablecoin deployment and can model the risk and reward of that deployment. That is what makes a solver-funded loop different from an external stablecoin LP product that must compensate third-party capital for opaque, leveraged low-cap exposure.

This page should therefore describe solver-funded stablecoin operations as a capital-structure choice, not as a claim that stablecoin risk disappears.

## Publication Boundary

Do not publish final solver funding sources, stablecoin balances, bridge flows, hedge venues, reserve requirements, accounting treatment, or cross-chain operational paths without operator and implementation review. The source-backed claim is the role separation: stablecoin operations are solver/protocol funded, while token inventory is market-specific LP capacity.

## Sources

- `vibe-papers`: Neelo DDQ, "Attractiveness for LPs".
- `vibe-papers`: Neelo, "Section 3: LP Value Proposition".

## Related Pages

- `authored-solver-funded-usdc-capital-loop`
- `authored-usdc-settlement-inventory-separation`
- `authored-token-lp-attractiveness-model`

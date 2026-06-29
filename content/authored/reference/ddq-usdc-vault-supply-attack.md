---
id: "authored-ddq-usdc-vault-supply-attack"
title: "DDQ USDC Vault Supply Attack Pattern"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/ddq-general-introduciton"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-ddq-general-introduciton", "authored-external-usdc-lp-risk-premium-mismatch", "authored-risk-alignment-matrix"]
---

# DDQ USDC Vault Supply Attack Pattern

The DDQ introduction names a concrete risk in simple USDC-backed permissionless margin vaults. A trader can build a large spot position in a thin asset, open leveraged exposure through the margin protocol, and then use the spot position to push the market against the vault.

The source's point is not that every vault will fail this way. It is that low-cap leveraged markets create adversarial paths when generic stablecoin LPs back directional exposure they cannot naturally monitor, hedge, or price.

## Why The Attack Pattern Matters

In a mature market, external liquidity, market-maker competition, and deep borrow or hedge venues can absorb more flow. In a low-cap market, the same actions can dominate available liquidity. A vault that blindly backs the leverage can become the easiest pool to extract from.

That is why the DDQ argues that purely one-to-one backed margin vaults are not sufficient for permissionless leverage. The design needs quote-by-quote risk checks, hedge feasibility tests, token inventory alignment, and the ability to refuse or freeze unsafe states.

## Reader Implication

For LPs, this page explains why "deposit USDC and earn yield from any listed asset" is not a neutral proposition. It can move low-cap market risk from the trader and solver onto an LP who may not be positioned to understand or manage the asset.

For projects, it explains why token-side inventory and solver control can be more aligned than external stablecoin vaults. The market should be bootstrapped by capital that understands the asset's risk, not by generic stablecoin capital that is paid only after the danger is simplified away.

## Publication Boundary

Do not publish exploit instructions, live risk thresholds, supported-asset limits, vault exposure caps, manipulation-detector details, or assurance that a specific production vault is immune without security and implementation review. The source-backed claim is the pattern: low-cap spot accumulation plus leveraged margin can stress a generic stablecoin backing pool.

## Sources

- `vibe-papers`: Neelo DDQ, "DDQ - General Introduction".

## Related Pages

- `authored-external-usdc-lp-risk-premium-mismatch`
- `authored-risk-alignment-matrix`
- `authored-liquidity-collapse-freeze-logic`
- `neelo-08-due-diligence-questionnaire-08-docs-ddq-general-introduciton`

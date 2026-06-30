---
id: "authored-expected-loss-capital-maintenance"
title: "Expected Loss As Capital Maintenance"
section: "manifesto"
track: "06 - USDC vs Token-Margined Perpetuals"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/riskpremiumcalcs"]
relatedGeneratedPages: ["neelo-06-usdc-token-perps-06-docs-riskpremiumcalcs", "section-06-usdc-token-perps-06-docs-riskpremiumcalcs-3-required-apr-derivation", "authored-usdc-expected-loss-decomposition"]
---

# Expected Loss As Capital Maintenance

The USDC APR derivation treats expected protocol loss as capital maintenance, not as yield.

That distinction matters. If a pool earns return while also absorbing predictable losses from manipulation, oracle failure, liquidation failure, backstop depletion, or smart-contract events, the first part of the return merely keeps capital whole in expectation. It is not profit. It is the cost of continuing to supply the backstop.

In the source model, expected loss is derived from the event decomposition rather than from a marketing APY target. That keeps the LP question honest: what return is needed to replace modeled losses before the LP earns anything above the outside USDC opportunity?

## Reader Implication

When a user sees a high required APR in this model, they should not read the full number as attractive upside. Part of it is compensation for losses the LP is expected to bear.

## Publication Boundary

Do not publish the source's loss ranges as final Vibe capital charges or audited live market loss estimates. They are source-model values that require risk, accounting, legal, and implementation review before production use.

## Sources

- `vibe-papers`: Neelo, "Required APR Derivation for USDC Depositors in Imperial", Expected Loss component.

## Related Pages

- `authored-usdc-expected-loss-decomposition`
- `authored-stress-correlation-cascade`
- `authored-required-risk-premium-for-usdc-lps`

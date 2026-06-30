---
id: "authored-token-vault-perps-versus-usdc-pools"
title: "Token-Vault Perps Versus USDC Pools"
section: "protocol-reference"
track: "Solver And LP Economics"
status: "published"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/overview", "https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/riskpremiumcalcs", "https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/figure1"]
relatedGeneratedPages: ["neelo-06-usdc-token-perps-06-docs-overview", "neelo-06-usdc-token-perps-06-docs-riskpremiumcalcs", "neelo-06-usdc-token-perps-06-docs-figure1"]
---

# Token-Vault Perps Versus USDC Pools

Neelo's token-margined comparison frames low-cap perps as a capital-structure problem: who supplies the backstop, what risks they absorb, and whether the yield can compensate them.

The USDC-pool model asks stablecoin LPs to back markets whose underlying spot liquidity may be thin, manipulable, or highly path dependent. The risk-premium derivation argues that low-cap perp backstops face manipulation, oracle, imbalance, liquidation, and correlation risks that are not well described by simple random-probability models. If an attack is profitable, rational actors should be expected to try it.

The token-vault model shifts the question. Instead of asking generic USDC to underwrite every long-tail market, it uses token-specific inventory and solver judgment so the counterparty structure is closer to the market being created. This does not remove risk; it changes which capital bears the risk and what that capital earns.

## Reader Implication

Do not present token-vault architecture as risk-free. Present it as a different answer to the low-cap backstop problem: less generic stablecoin exposure, more market-specific inventory, solver pricing, and explicit risk compensation.

## Publication Boundary

This page compares source-modeled capital structures. It does not publish final Vibe vault terms, LP rights, loss waterfalls, token inventory eligibility, USDC pool guarantees, risk-premium formulas, legal/accounting treatment, or live product support without operator/product/risk/legal/accounting review.

## Sources

- `vibe-papers`: Neelo, "USDC vs Token-Margined Perpetuals".
- `vibe-papers`: Neelo, "Required APR Derivation for USDC Depositors in Imperial".
- `vibe-papers`: Neelo, "Figure1".

## Related Pages

- `authored-vibe-pillars`
- `authored-lp-profit-and-dynamic-pricing`
- `neelo-06-usdc-token-perps-06-docs-riskpremiumcalcs`

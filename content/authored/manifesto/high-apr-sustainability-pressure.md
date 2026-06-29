---
id: "authored-high-apr-sustainability-pressure"
title: "High APR Sustainability Pressure"
section: "manifesto"
track: "06 - USDC vs Token-Margined Perpetuals"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/riskpremiumcalcs"]
relatedGeneratedPages: ["neelo-06-usdc-token-perps-06-docs-riskpremiumcalcs", "section-06-usdc-token-perps-06-docs-riskpremiumcalcs-6-implications-for-protocol-design", "authored-usdc-vault-negative-feedback-loop"]
---

# High APR Sustainability Pressure

Neelo's protocol-design implication is that high required LP APR becomes a product and market-structure problem.

If a USDC backstop needs extreme compensation, the protocol has only a few broad sources to fund it: trading fees, funding transfers, spreads, explicit subsidies, token emissions, or some other value capture. Each source has a cost. Higher trader fees and wider spreads can reduce participation. Token emissions can dilute protocol value. Subsidies can hide, rather than solve, the underlying capital cost.

That is the negative loop behind the USDC-vault critique. Expensive LP capital pushes up market costs. Higher costs weaken trader experience and volume. Weaker volume makes the market harder to sustain, which can reinforce the LP's perception that the market is risky.

## Alternative Framing

The source contrasts this with token-backed or inventory-backed designs, where market-specific holders already bear the underlying token risk. That does not make the design risk-free. It changes who is naturally positioned to supply inventory and what compensation they require.

## Publication Boundary

Do not publish final fee levels, funding rates, spread policy, emissions policy, subsidy plans, or token-backed APR claims from this model alone. The safe claim is structural: high outside LP return requirements can make long-tail market economics harder to sustain.

## Sources

- `vibe-papers`: Neelo, "Required APR Derivation for USDC Depositors in Imperial", Implications for Protocol Design.

## Related Pages

- `authored-usdc-vault-negative-feedback-loop`
- `authored-token-holder-inventory-alignment`
- `authored-risk-adjusted-capital-efficiency`

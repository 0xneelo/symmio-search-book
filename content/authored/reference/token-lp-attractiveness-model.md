---
id: "authored-token-lp-attractiveness-model"
title: "Token LP Attractiveness Model"
section: "protocol-reference"
track: "Solver And LP Economics"
status: "publication-candidate-needs-operator-review"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/attractiveness-for-lps/attractiveness-for-lps", "https://0xneelo.github.io/vibe_docs/docs/06-usdc-token-perps/06-docs/00-abstract"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-attractiveness-for-lps-attractiveness-for-lps", "authored-token-holder-inventory-alignment", "authored-usdc-lp-backstop-cascade"]
volumeId: "volume-05-solver-lp-and-protocol-operations"
---

# Token LP Attractiveness Model

The DDQ's LP-attractiveness section makes a balance-sheet argument: Vibe should not ask every market to begin with a large external USDC vault. It separates the stablecoin side from the token-inventory side.

On the stablecoin side, the source describes solver- or protocol-funded USDC operations. Stablecoin capital is used operationally for settlement, hedging, and bridging, but the model avoids asking outside USDC LPs to lend into low-cap leveraged markets where they would demand a high risk premium.

On the token side, the source argues that project treasuries, token holders, founders, early investors, and aligned communities are natural inventory providers because they already bear directional token exposure. Depositing some token inventory into a Vibe vault can create additional market utility and possible yield without forcing the project to spend scarce stablecoins.

## Lifecycle Role

The DDQ describes LP deposits as ignition capital. In the bootstrapped stage, asynchronous execution and conservative risk limits rely more on LP deposits and solver control. In the maturing stage, trader-to-trader netting should increase and protocol-side collateralization can decrease. In the mature stage, the solver should act more like a pricing, matching, and risk-control layer than a balance-sheet backstop for every fill.

That lifecycle framing matters because it prevents a false promise. Token LPs are not expected to remain the entire market forever. They help the market reach the stage where better two-sided flow can carry more of the risk.

## Publication Boundary

The source includes specific economic claims, including a modeled capital-efficiency advantage, a revenue-share target, and early partner/deposit traction. Those should remain source-model claims until operator review confirms what can be published today under the revenue and partner-disclosure boundary.

## Sources

- `vibe-papers`: Neelo DDQ, "Attractiveness for LPs".
- `vibe-papers`: Neelo, "USDC vs Token-Margined Perpetuals".

## Related Pages

- `authored-token-holder-inventory-alignment`
- `authored-token-inventory-risk-localization`
- `authored-risk-adjusted-capital-efficiency`
- `neelo-08-due-diligence-questionnaire-08-docs-attractiveness-for-lps-attractiveness-for-lps`

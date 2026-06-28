---
id: "authored-token-holder-incremental-risk-alignment"
title: "Token Holder Incremental Risk Alignment"
section: "protocol-reference"
track: "Solver And LP Economics"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/attractiveness-for-lps/attractiveness-for-lps", "https://0xneelo.github.io/vibe_docs/docs/13-framework-value-permissionless-perps/13-docs/03-lp-value-proposition"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-attractiveness-for-lps-attractiveness-for-lps", "section-13-framework-value-permissionless-perps-13-docs-03-lp-value-proposition-3-4-the-token-side-aligning-risk-with-holders-who-already-bear-it", "authored-token-holder-inventory-alignment"]
---

# Token Holder Incremental Risk Alignment

The DDQ's token-side LP argument starts from a simple observation: token holders are already directionally exposed to the asset.

If a project treasury, founder, early investor, whale, or long-term community holder deposits some inventory into a market-specific vault, the exposure is not the same as asking an unrelated USDC LP to underwrite the market from scratch. The token holder already bears the underlying token's price risk. The vault adds incremental risk on top of an exposure they already chose to carry.

## Why That Can Be Rational

The source gives several motivations that can coexist:

- token holders want more utility for inventory they already hold;
- projects and communities want deeper markets and visibility;
- long-term holders may have lower cost basis and a longer horizon;
- incremental yield can be attractive even if it is not priced like high-risk stablecoin lending.

The resulting claim is risk alignment, not risk removal. A token-side LP can still lose money, face withdrawal limits, or see adverse market behavior. The source's narrower point is that the marginal risk is better matched to the participant than a generic stablecoin backstop would be.

## How This Helps The Market

Aligned token inventory gives the solver something to work with during the bootstrapped phase. It can support quoting, hedging, and market creation without requiring the project to spend scarce stablecoins or hire every external service before demand is proven.

That is why token-side LPing belongs in the reference layer. It explains who is naturally positioned to provide inventory and why the market can start before mature two-sided flow exists.

## Publication Boundary

Do not publish final vault rights, withdrawal windows, yield expectations, cost-basis assumptions, revenue-share percentages, or LP loss-ordering semantics without operator, accounting, and implementation review. This page documents the source-backed risk-alignment thesis.

## Sources

- `vibe-papers`: Neelo DDQ, "Attractiveness for LPs".
- `vibe-papers`: Neelo, "Section 3: LP Value Proposition".

## Related Pages

- `authored-token-holder-inventory-alignment`
- `authored-token-inventory-risk-localization`
- `authored-token-lp-attractiveness-model`

---
id: "authored-ddq-token-vault-liquidity-role"
title: "DDQ Token Vault Liquidity Role"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "published"
volumeId: "volume-05-solver-lp-and-protocol-operations"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/ddq-general-introduciton", "https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/attractiveness-for-lps/attractiveness-for-lps"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-ddq-general-introduciton", "neelo-08-due-diligence-questionnaire-08-docs-attractiveness-for-lps-attractiveness-for-lps", "authored-token-lp-attractiveness-model"]
---

# DDQ Token Vault Liquidity Role

The DDQ introduction names user vaults for liquidity tokens as a core primitive. These vaults provide token-side assets that the solver can draw on, subject to protocol rules and risk parameters, to support liquidity and hedging for leveraged markets.

That role is narrower than "LPs provide all liquidity." The DDQ separates token-side inventory from stablecoin settlement operations. Token vaults are market-specific inventory. They help a long-tail market quote, hedge, and settle early exposure before natural two-sided flow is deep enough to carry more of the market.

## Why Token Vaults Are In The Stack

Long-tail projects and holders often have token inventory but do not want to spend scarce stablecoins just to bootstrap a derivatives market. Token vaults let that inventory become useful market infrastructure. The solver can use supported liquidity tokens as backing or hedge material under defined constraints.

This also aligns risk. A token holder already has directional exposure to the asset. Providing some of that inventory to a market-specific vault can be a more natural risk allocation than asking outside USDC LPs to underwrite a low-cap leveraged market they do not otherwise support.

## Reader Implication

For projects, the token-vault role answers "how can my asset support a perp market without first buying stablecoin depth?" For LPs, it clarifies that inventory risk is market-specific and should be disclosed through vault terms. For traders, it explains why early market capacity may depend on available token inventory and solver risk policy.

Token vaults are therefore not a generic yield pool. They are part of the market-creation machinery: inventory that makes quote and hedge paths possible while the market matures.

## Publication Boundary

Do not publish final supported-token rules, vault withdrawal rights, rehypothecation rights, custody structure, solver borrowing rights, fee share, or LP loss ordering without operator, accounting, legal, and implementation review. The source-backed claim is the role: token vaults supply market-specific liquidity tokens for solver-managed liquidity and hedging.

## Sources

- `vibe-papers`: Neelo DDQ, "DDQ - General Introduction".
- `vibe-papers`: Neelo DDQ, "Attractiveness for LPs".

## Related Pages

- `authored-token-lp-attractiveness-model`
- `authored-lp-ignition-capital-lifecycle`
- `authored-token-holder-incremental-risk-alignment`
- `neelo-08-due-diligence-questionnaire-08-docs-ddq-general-introduciton`

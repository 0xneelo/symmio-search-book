---
id: "authored-percolator-section-fragments-source-map"
title: "Percolator Section Fragments Source Map"
section: "manifesto"
track: "07 - Token-Margined Issues (Percolator)"
status: "published"
volumeId: "volume-04-token-margin-and-funding-systems"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/00-abstract", "https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/01-introduction", "https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/02-percolator-architecture", "https://0xneelo.github.io/vibe_docs/docs/07-token-margined-issues-perculator/07-docs/03-reflexivity-and-convexity"]
relatedGeneratedPages: ["section-07-token-margined-issues-perculator-07-docs-00-abstract-abstract", "section-07-token-margined-issues-perculator-07-docs-00-abstract-keywords", "section-07-token-margined-issues-perculator-07-docs-00-abstract-paper-structure", "section-07-token-margined-issues-perculator-07-docs-01-introduction-1-1-the-design-question", "section-07-token-margined-issues-perculator-07-docs-01-introduction-1-2-two-paradigms", "section-07-token-margined-issues-perculator-07-docs-01-introduction-1-3-percolator-the-case-study", "section-07-token-margined-issues-perculator-07-docs-01-introduction-1-4-the-thesis", "section-07-token-margined-issues-perculator-07-docs-01-introduction-1-5-permissionless-self-collateral-the-constraint", "section-07-token-margined-issues-perculator-07-docs-01-introduction-1-6-scope", "section-07-token-margined-issues-perculator-07-docs-02-percolator-architecture-2-1-design-overview", "section-07-token-margined-issues-perculator-07-docs-02-percolator-architecture-2-2-architecture-diagram", "section-07-token-margined-issues-perculator-07-docs-02-percolator-architecture-2-4-the-sov-model", "section-07-token-margined-issues-perculator-07-docs-02-percolator-architecture-2-5-key-parameters-mainnet", "section-07-token-margined-issues-perculator-07-docs-02-percolator-architecture-2-6-engineering-achievements", "section-07-token-margined-issues-perculator-07-docs-03-reflexivity-and-convexity-3-1-the-reflexivity-problem", "section-07-token-margined-issues-perculator-07-docs-03-reflexivity-and-convexity-3-3-why-linear-settlement-wins"]
---

# Percolator Section Fragments Source Map

Neelo's Percolator abstract, introduction, architecture, and early reflexivity fragments are the orientation layer for the token-margined critique. They introduce the design question before the corpus splits into exact pages for collateral reflexivity, inverse payoff, LP economics, oracle risk, engineering strengths, and the USDC-hybrid alternative.

Read these fragments as a map, not as independent production documentation. The abstract states the source thesis: token-margined inverse perpetuals make the traded asset serve as collateral and settlement currency, then compound that choice through reflexive collateral, negative convexity, LP constraints, oracle paradoxes, manipulation paths, and death-spiral payout behavior.

The introduction supplies the case-study frame. It presents Percolator as a formally verified Solana risk engine with pluggable matching, then uses Percolator SOV as the token-margined example. That makes the critique fairer: it credits the engineering surface before asking whether the settlement unit can support volatile, permissionless long-tail markets.

The architecture fragments should route readers to the Percolator mechanism pages. Use `authored-percolator-hybrid-risk-execution-model` for the risk-engine plus matcher distinction, `authored-percolator-one-market-one-slab-accounting` for isolated market accounting, `authored-percolator-sov-insurance-deflation-model` for token-denominated SOV insurance, and `authored-percolator-formal-verification-boundary` for the difference between verified accounting and economic robustness.

The reflexivity fragments should route readers to the token-margin pages. Use `authored-token-margined-reflexivity-risk` for same-asset collateral correlation, `authored-linear-pnl-versus-hyperbolic-payout` for the USDC-versus-inverse payoff contrast, and `authored-usdc-settlement-inventory-separation` for the positive Vibe-side design lesson: token inventory can help bootstrap a market, but settlement credibility should not depend on a collapsing payout unit.

## Publication Boundary

Percolator SOV mainnet details, live parameters, vault balances, open interest, fee rates, burn behavior, oracle caps, proof counts, repository state, deployed programs, market behavior, and Vibe comparative guarantees require fresh primary-source, operator, risk, legal, security, and implementation review before publication as current facts. This page preserves source traceability and answer routing only.

## Sources

- `vibe-papers`: Neelo, "Why Token-Margined Protocols Are Structurally Problematic", abstract, introduction, architecture, and reflexivity fragments.

## Related Pages

- `authored-percolator-dissertation-source-map`
- `authored-percolator-hybrid-risk-execution-model`
- `authored-percolator-formal-verification-boundary`
- `authored-token-margined-reflexivity-risk`
- `authored-usdc-settlement-inventory-separation`
- `authored-percolator-seven-failure-mode-synthesis`

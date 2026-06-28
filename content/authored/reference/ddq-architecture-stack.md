---
id: "authored-ddq-architecture-stack"
title: "DDQ Architecture Stack"
section: "protocol-reference"
track: "Solver And LP Operations"
status: "publication-candidate-needs-operator-review"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/08-due-diligence-questionnaire/08-docs/ddq-general-introduciton"]
relatedGeneratedPages: ["neelo-08-due-diligence-questionnaire-08-docs-ddq-general-introduciton", "authored-residual-counterparty-hedge-first", "authored-token-lp-attractiveness-model"]
volumeId: "volume-05-solver-lp-and-protocol-operations"
---

# DDQ Architecture Stack

The DDQ introduction is useful because it translates Vibe's thesis into the language an allocator, partner, or market operator would ask first: what pieces make the system work, and why are they needed together?

The source names six primitives:

- margin trading;
- perpetuals;
- request-based, intent-style settlement;
- bilateral OTC derivatives primitives;
- proprietary solver technology;
- user vaults for liquidity tokens.

The point is not that any one primitive is new in isolation. The source argument is that permissionless leverage for long-tail assets needs the stack to work as one system. Margin mechanics supply collateral discipline. Perpetual mechanics supply ongoing mark, funding, close, and liquidation language. Intents let the solver quote only after checking risk. Bilateral OTC primitives fit the PartyA/PartyB settlement model. User vaults provide token-side inventory without asking outside stablecoin LPs to underwrite every market.

## Why The Stack Exists

The DDQ frames older on-chain margin experiments as capital hungry and attackable. Near 1:1 backing can constrain depth and widen spreads. Pure USDC vaults for low-cap leverage can attract a supply-side attack pattern where a user builds spot exposure, opens leverage, then stresses the backing pool through spot selling.

Vibe's proposed answer is a hybrid liquidity model: token inventory, solver-funded stablecoin operations, quote-by-quote risk checks, and market controls that tighten when the market is immature or stressed.

## Reader Implication

This page should be the first DDQ route for partners. It explains why Vibe is not simply "a perp UI" or "a vault." The product claim is an integrated market-creation stack: intents, solvers, LP inventory, and settlement are designed to make long-tail leveraged markets possible before a normal order book can support them.

## Publication Note

The DDQ source links internal Notion materials and describes evolving concepts. Final docs should use this page as architecture framing, not as a commitment to exact current vault rules, solver policies, margin formulas, or production contract behavior.

## Sources

- `vibe-papers`: Neelo DDQ, "DDQ - General Introduction".

## Related Pages

- `authored-residual-counterparty-hedge-first`
- `authored-token-lp-attractiveness-model`
- `authored-solver-default-and-continuity`
- `neelo-08-due-diligence-questionnaire-08-docs-ddq-general-introduciton`

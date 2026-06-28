---
id: "section-02-proof-of-value-02-docs-06-hybrid-solver-model-6-3-whale-vaults-risk-tranching"
title: "Section 6: The Hybrid Solver Model: 6.3 Whale Vaults: Risk Tranching"
section: "vision-sections"
track: "02 — Proof of Value"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/02-proof-of-value/02-docs/06-hybrid-solver-model#6-3-whale-vaults-risk-tranching"]
parentPageId: "neelo-02-proof-of-value-02-docs-06-hybrid-solver-model"
sourcePath: "Docs/public/02_proof_of_value/02_docs/06-Hybrid-Solver-Model.md"
headingId: "6-3-whale-vaults-risk-tranching"
---

# Section 6: The Hybrid Solver Model: 6.3 Whale Vaults: Risk Tranching

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/02-proof-of-value/02-docs/06-hybrid-solver-model#6-3-whale-vaults-risk-tranching

## Extracted Section Draft

## 6.3 Whale Vaults: Risk Tranching

Whales and project owners stake tokens into vaults. The solver provides USDC and backstop insurance. Whales hold directional exposure to the token—something the solver cannot do. The solver uses whale inventory to market-make. This is a "Covered Call" architecture: the protocol writes covered perps on behalf of the whales. Solvers never face a "God Candle" wiping them out; that risk is absorbed by the whales, who earn yield on idle treasury.

---

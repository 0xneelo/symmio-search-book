---
id: "section-02-proof-of-value-02-docs-05-intent-based-architecture-5-5-solving-the-wick-of-death"
title: "Section 5: Intent-Based Architecture: 5.5 Solving the Wick of Death"
section: "vision-sections"
track: "02 — Proof of Value"
granularity: "section-page"
status: "draft-extracted-from-primary-source"
sourcePriority: "neeloSection"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/02-proof-of-value/02-docs/05-intent-based-architecture#5-5-solving-the-wick-of-death"]
parentPageId: "neelo-02-proof-of-value-02-docs-05-intent-based-architecture"
sourcePath: "Docs/public/02_proof_of_value/02_docs/05-Intent-Based-Architecture.md"
headingId: "5-5-solving-the-wick-of-death"
---

# Section 5: Intent-Based Architecture: 5.5 Solving the Wick of Death

> Draft status: extracted from a primary Neelo source heading. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/02-proof-of-value/02-docs/05-intent-based-architecture#5-5-solving-the-wick-of-death

## Extracted Section Draft

## 5.5 Solving the Wick of Death

Historically, perps on low-cap assets failed due to **Oracle Manipulation**: attacker buys spot, spikes price for one block, drains the Perp AMM.

**Intent/Solver solution**: Solvers do not rely on a manipulatable spot oracle. They **quote their own price**. If spot is being manipulated, the Solver widens the spread or refuses to quote. Human/AI judgment protects the protocol from the flash crash/pump exploit.

---

*Next Section: [06-Hybrid-Solver-Model.md](./06-Hybrid-Solver-Model.md) →*

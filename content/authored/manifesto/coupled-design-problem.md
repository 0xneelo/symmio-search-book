---
id: "authored-coupled-design-problem"
title: "The Coupled Design Problem"
section: "manifesto"
track: "07 — Architecture Thesis"
status: "published"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/10-vibe-pillars/10-docs/05-the-coupled-design-problem"]
relatedGeneratedPages: ["neelo-10-vibe-pillars-10-docs-05-the-coupled-design-problem", "authored-vibe-pillars", "authored-exploit-resistance-pillar", "authored-bootstrap-counterparty-pillar", "authored-lp-yield-capital-efficiency-pillar"]
---

# The Coupled Design Problem

The Vibe pillars are not independent checkboxes. They are a coupled design problem.

If a system optimizes only for exploit resistance, it can become too restrictive for long-tail markets to bootstrap. If it optimizes only for bootstrap, it may create residual counterparties that are fragile or too expensive. If it optimizes only for LP yield, it can push risk onto capital in ways that fail during tail events.

## Why Order Books Do Not Solve The Early Stage

Mature order books collapse many of these concerns into synchronous matching: a buyer and seller arrive together, the venue avoids warehousing much exposure, and the market clears. That works for assets that already have deep liquidity.

Low-cap markets sit earlier on the maturity curve. They need defense against leveraged abuse, tradability when two-sided flow is intermittent, and a reason for residual risk-takers to keep capital in the system.

## Reader Implication

This page is the bridge from "Vibe has three pillars" to "Vibe needs a different market structure." The pillars are hard because solving one can weaken another. The product thesis is credible only if the architecture can satisfy all three at once.

## Sources

- `vibe-papers`: Neelo, "The Coupled Design Problem".

## Related Pages

- `authored-vibe-pillars`
- `authored-exploit-resistance-pillar`
- `authored-bootstrap-counterparty-pillar`
- `authored-lp-yield-capital-efficiency-pillar`
- `neelo-10-vibe-pillars-10-docs-05-the-coupled-design-problem`

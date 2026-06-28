---
id: "neelo-10-vibe-pillars-10-docs-04-pillar-three-lp-yield-and-capital-efficiency"
title: "Pillar Three: LP Yield and Capital Efficiency"
section: "vision-papers"
track: "10 - Vibe Pillars"
granularity: "source-page"
status: "draft-imported-from-primary-source"
sourcePriority: "neeloVision"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/10-vibe-pillars/10-docs/04-pillar-three-lp-yield-and-capital-efficiency"]
sourcePath: "Docs/public/10_vibe_pillars/10_docs/04-Pillar-Three-LP-Yield-and-Capital-Efficiency.md"
---

# Pillar Three: LP Yield and Capital Efficiency

> Draft status: imported from the primary markdown source. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/10-vibe-pillars/10-docs/04-pillar-three-lp-yield-and-capital-efficiency

## Source Draft

# Pillar Three: LP Yield and Capital Efficiency

Once a system solves bootstrap by introducing a solver, maker, or designated residual counterparty, a third problem appears immediately: why should that capital stay?

This is the capital-efficiency pillar. Someone in the system is taking risk, warehousing inventory, or funding the stable collateral side of the market. If the return on that capital is weak, the market may technically function, but it will not scale or persist.

This is especially important in low-cap perpetuals. The long tail cannot support architectures that require large amounts of idle capital earning weak or inconsistent yield. If the protocol needs too much balance sheet to bootstrap each market, the model breaks under its own cost.

So the relevant question is not simply whether LPs can earn yield. It is whether they can earn **enough** yield relative to the risk they take:

- enough to justify residual counterparty exposure
- enough to compensate for thin and volatile markets
- enough to keep capital from fleeing to simpler opportunities

This is why capital efficiency is inseparable from the first two pillars. A highly safe system that cannot pay its makers is not viable. A highly bootstrappable system that burns too much capital per market is not viable either.

Vibe's challenge is therefore to make the bootstrap layer economically attractive without recreating the inefficiencies of designs that rely on massive passive stablecoin liquidity. The protocol must concentrate risk where it can be managed well, rather than spreading capital thinly across every listed market.

In short, yield is not a marketing feature. It is the economic proof that the architecture can survive.

---

[← Pillar Two](03-Pillar-Two-Bootstrap-and-Counterparty.md) | [Next: The Coupled Problem →](05-The-Coupled-Design-Problem.md)

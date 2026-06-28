---
id: "neelo-10-vibe-pillars-10-docs-01-introduction"
title: "Introduction"
section: "vision-papers"
track: "10 - Vibe Pillars"
granularity: "source-page"
status: "draft-imported-from-primary-source"
sourcePriority: "neeloVision"
sourceKeys: ["vibe-papers"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/10-vibe-pillars/10-docs/01-introduction"]
sourcePath: "Docs/public/10_vibe_pillars/10_docs/01-Introduction.md"
---

# Introduction

> Draft status: imported from the primary markdown source. Needs editorial restructuring, cross-links, and source-note polish before final publication.

## Sources
- https://0xneelo.github.io/vibe_docs/docs/10-vibe-pillars/10-docs/01-introduction

## Source Draft

# Introduction

The dream of permissionless perpetuals sounds simple: let any token have a derivative market. In practice, this is one of the hardest products in crypto to build well, especially for low-cap assets.

The reason is structural. A perpetual market is not just a price chart with leverage attached. It is a credit system. Traders receive exposure through margin. Counterparties absorb risk. Liquidity providers or market makers stand behind the market during periods of stress. If any part of this chain is weak, the venue either becomes exploitable, unbootstrappable, or uneconomic.

For mature assets with deep order flow, the problem is partly hidden. Order books benefit from synchronous matching: a long is matched with a short, and the market can rely on dense, continuous activity. This naturally reduces some bootstrap problems because the counterparty is often another trader rather than the system itself.

Low-cap markets do not have that luxury. Demand is fragmented across time. Longs and shorts do not always arrive together. Volume may be episodic rather than continuous. In those conditions, a protocol cannot simply copy the architecture used by mature markets and expect it to work.

This paper frames Vibe through three core pillars:

1. **Exploit resistance**: how to keep a leveraged system from being abused.
2. **Bootstrap and counterparty formation**: how to keep a market tradable when natural matching is weak.
3. **LP yield and capital efficiency**: how to ensure the parties taking residual risk are paid enough to remain.

The key insight is that these pillars are not modular choices. They constrain one another. Solving one pillar poorly tends to make another impossible. Vibe is best understood as an architecture designed around this coupled problem rather than around a generic desire to launch more perp markets.

---

[Back to Overview](README.md) | [Next: Pillar One →](02-Pillar-One-Exploit-Resistance.md)

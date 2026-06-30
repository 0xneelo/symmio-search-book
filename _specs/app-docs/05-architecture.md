# 05 — Information architecture, front door, journeys

## The front door — an answer engine (primary interface)
The landing experience is a prominent **ask bar**: a question goes in, an agent retrieves the answer and **routes the reader to the exact page** that answers it (answer surfaced + link). The reader rates whether it answered them, then asks again. Full structured docs + guided journeys live *behind* the bar. Engine + living-docs loop: `06-answer-engine.md`. Guided journeys: `02-narrative-thesis.md`. **Visual + IA target: the operator's mockup at `design/vibe-docs-mockup.html` (`09`)** — nav: Ask & search · content pages · Glossary · Search insights · Back to dashboard.

## Information architecture (two halves; validate against research, expand to 500-800 pages)

**A. The manifesto (the "why") — full content in `02`:**
1. **Origin & Vision** — the 2021 origin, the original whitepaper, how the idea formed.
2. **The Thesis** — why derivatives; perps & swaps; tokenization; permissionless derivatives for any token.
3. **Intents vs Order Books** — the market argument; bootstrapping; Hyperliquid/HIP-3 & Vibe as the discovery layer.
4. **Intents & Solvers** — intents, solvers, protocol-operated vs third-party solvers.
5. **Inside Symmio** — application layer, Party A/B, isolation, cross-margin, capital efficiency, UX challenges, long-term vision.

**B. The reference (the "how"):**
6. **Products & Trading** — what you trade on Symmio vs Vibe; how a trade flows (intent → solver → settlement).
7. **The Vibe App & Dashboard** — every view, end to end.
8. **Revenue** — the model, the venue/chain/phase matrix, protocol vs solver/LP revenue, the calculation, the live odometer, why it's an estimate, Phase B, roadmap.
9. **Volume** — definition, sources, snapshots, multi-level aggregation, the Barometer upgrade.
10. **Points & Rewards** — onboarding points, trading/network points, referral points, vibe-points, TGE settlement.
11. **Architecture & Data** — chains, contracts, subgraphs, named APIs, verification/security.
12. **Reference** — glossary, FAQ (Discord-seeded), changelog, safe API/endpoint reference.

Plus **Ask AI / Help** — the answer engine, always present.

## Navigation & journeys
- ≤2 clicks to any concept; persistent ask bar; search; cross-links; prev/next; per-page TOC.
- **Guided journeys** (defined in `02`) that ask who the reader is (new / trader / HIP-3 deployer / solver-LP / researcher) and route them.
- Every page: clear H1, intro, body, cross-links, a "sources" note, prev/next.
- The two halves interlink constantly: a reference page links back to the thesis that justifies it; a manifesto page links forward to where it's implemented.

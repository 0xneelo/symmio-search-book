# 08 — Session 2: Implementation

Build the compendium from the Session-1 dossier (`07`).

## Phase 0 — lock & scaffold (~30 min; confirm with operator, record in `DECISIONS.md`)
1. **Platform.** Recommended **Mintlify** (MDX, native "Ask AI", fastest path to best-in-class) **or** **self-hosted Next.js (Fumadocs/Nextra) + a custom Claude answer engine** if full ownership / VPS hosting is required. Let the Session-1 research decide.
2. **Repository.** Recommended a dedicated **`vibe-docs`** (or **`symmio-vibe-docs`**) repo, seeded by importing and restructuring `0xneelo/vibe_docs`.
3. **Economics transparency.** Recommended: current values clearly labeled "current — configurable, subject to change," matching Symmio's public-docs depth.
Then scaffold the platform + the **answer-engine skeleton** + the **question/rating datastore**; wire CI build + preview deploy; commit.

## Build phases (checkpoint + commit between each)
1. **Write the manifesto** (`02`) — the "why," in order; the most ambitious prose. *(deepest)*
2. **Write the reference** (`03` + `05` half B) — products, the dashboard, **revenue first and deepest**, volume, points, architecture.
3. **Answer engine + living docs** (`06`) — index the corpus + Discord Q&A; ask bar → answer + page link; ratings; question tracking; gaps queue; demand-driven improvement loop.
4. **Guided journeys** (`02`) — the role-based entry paths.
5. **Navigation, search, cross-links, diagrams, polish.**
6. **QA & ship** — accuracy pass vs sources, link-check, build, deploy preview, completeness critic, final report.

## Checkpoints & artifacts
After each phase: commit, update the running page index, write a short note in `PROGRESS.md`. Maintain `DECISIONS.md`, `SOURCES.md`, `STYLEGUIDE.md`, `GAPS.md`, `QUESTIONS.md`, the page manifest. Never silently drop scope; log any caps in `GAPS.md`.

## Quality bar ("best web3 docs")
- **Accurate & cited;** contradictions reconciled.
- **Complete:** zero → understanding the **thesis** *and* the **product** without leaving the docs.
- **Navigable:** ≤2 clicks; ask bar + search + cross-links + guided journeys.
- **Consistent:** one voice, one terminology lock, one component system.
- **Credible:** precise, restrained, conviction without hype, no emoji-soup; diagrams only where they earn their place.
- **Self-serve:** glossary, Discord-seeded FAQ, worked examples, and the answer engine cover the long tail.

## Definition of Done
Per `01-mission.md`: **500-800 cited pages** across the manifesto + the full Symmio/Vibe reference (incl. revenue/volume/points/vibe-points + every dashboard view); a working **answer-engine front door** with citations; the **living-docs loop** (tracking + ratings + gaps + improvement); a Discord-seeded FAQ; deployed/preview; plus `DECISIONS.md` / `SOURCES.md` / `STYLEGUIDE.md` / `GAPS.md` / `QUESTIONS.md` / page manifest / final report.

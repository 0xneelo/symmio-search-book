# Session 1 Research Dossier

## Mission

Build a Vibe x Symmio documentation compendium that can become a 500-800 page source-traceable search book. The compendium should answer user questions directly, route to exact pages, collect ratings, surface unanswered questions, and keep a living gap loop.

Current manifest scale: **794 mapped pages**.

- 188 Neelo vision source pages.
- 541 Neelo section-level expansions.
- 65 companion pages from Vibe product docs, Symmio protocol docs, local implementation, Linear research, and competitive context.

## Source Priority

1. **Neelo GitHub docs:** primary vision source. This is the backbone for market-formation theory, Proof of Value, listing monopoly, Bootstrap Trilemma, order-book complementarity, funding model, referral architecture, and LP economics.
2. **Vibe public docs:** current public product mechanics and user-facing guides.
3. **Symmio public docs:** protocol mechanics for intents, PartyA/PartyB, solvers, collateral, settlement, liquidation, builder, and options references.
4. **Local implementation:** current dashboard behavior for revenue, volume, points, referral depth, snapshots, and FAQ copy.
5. **Linear research:** product intent, unresolved contradictions, subgraph migration, revenue roadmap, and 15-level rollout history.
6. **Competitive docs:** Hyperliquid HIP-3 as a primary competitor/source for builder-deployed perps context.

## Neelo Vision Backbone

The Neelo docs provide the strongest narrative arc:

- Vibe is framed as a market-formation system, not merely another perp venue.
- The Bootstrap Trilemma explains why existing perp architectures struggle to combine permissionless listing, capital efficiency, and reliable counterparty guarantees.
- Vibe's role is not anti-order-book; it is a bootstrap/discovery layer that can help markets mature toward order-book depth.
- Proof of Value treats market participation and price discovery as verification infrastructure.
- Listing monopoly reframes crypto power as control over token lifecycle gates.
- The funding model and LP case-study chapters provide the economic machinery needed to make the narrative operational.
- The referral program chapter frames referrals as a market-formation and incentives architecture, not just growth copy.

The manifest expands these papers at two levels:

- Source-page level: each generated Neelo page remains addressable.
- Section-page level: high-value H2 sections become standalone planned compendium pages.

## Product And Protocol Baseline

### Vibe

Vibe public docs currently support:

- Vibe as a perpetuals DEX.
- Public claims around broad market coverage and permissionless lowcap perp listings.
- Intent-style architecture using streamed solver offers and on-chain execution.
- Referral commission and pre-TGE point programs.
- VibeCaps margin-management behavior.

Exact market counts are time-sensitive and should be re-verified before publication.

### Symmio

Symmio public docs currently support:

- Symmio as a trustless hybrid clearing house for permissionless derivatives.
- No shared order book or pool as the base model.
- PartyA as the trader/requester and PartyB as solver/hedger.
- Intents as on-chain quote/request objects visible to eligible solvers.
- Solvers as counterparties that decide whether to accept, lock collateral, open positions, hedge, and monitor lifecycle events.
- Collateral, margin, CVA, settlement, funding, liquidation, and contract references.

### Local Dashboard

Local implementation currently supports:

- Phase A estimated revenue from network volume, platform fee, and referrer share.
- A live revenue pulse derived from recent volume history and monotonic display behavior.
- Wallet volume fetched from the current Vibe backend source with caching and 18-decimal normalization.
- Daily volume snapshots.
- Referral/network depth driven by points config, with defaults and copy requiring reconciliation.

## Key Contradictions

### Referral Depth

The docs cannot yet publish one final answer for referral depth.

Evidence:

- `server/points.js` default config is 5 levels and supports 15.
- `server/routes/me.js` uses configured depth for network and volume aggregation.
- `src/dashboard/volume.jsx` still has 5-level language.
- `src/dashboard/faq.jsx` says rewards count across 15 levels.
- Linear rollout notes describe a 15-level rollout and append-only backfill.

Current handling: all referral-depth pages are marked `needs-reconciliation` or tied to `G-003`.

### Revenue

Phase A estimated revenue is implemented. Phase B revenue sources are researched but not fully implemented in this repo.

Current handling: docs must say "estimated", "current implementation", or "planned Phase B" explicitly.

### Volume Source

Current code uses Vibe backend wallet-volume data. Linear research recommends Goldsky subgraphs for higher accuracy.

Current handling: current-source pages are local-implementation pages; subgraph pages are product-research pages until implementation lands.

## Information Architecture

The compendium should have five surfaces:

1. **Ask:** front-door answer engine with exact page routing.
2. **Vision:** Neelo-backed long-form category thesis and argument map.
3. **Reference:** Vibe, Symmio, revenue, points, margin, solver, settlement, fees, and FAQ reference.
4. **Journeys:** audience paths for treasuries/projects, solvers/MMs, LPs, options buyers, dashboard users, and operators.
5. **Living Docs:** question ledger, ratings, stale claims, contradictions, and operator inbox.

## Answer Engine Requirements

Production answer engine should:

- Retrieve from the 794-page manifest and page bodies.
- Answer directly before linking.
- Cite source pages and mark source class: vision, product, protocol, implementation, Linear, or competitive.
- Ask a clarifying question when source evidence is insufficient.
- Capture unanswered questions into a review queue.
- Capture yes/no rating and optional feedback.
- Track stale pages, contradictions, and unresolved operator inbox items.

The current `index.html` is a static throwaway prototype for the interaction pattern only.

## Page Manifest Strategy

The 794-page manifest is source-mapped as follows:

- **Neelo source pages:** preserve the generated page map from `Website/public/generated/docs-data.json`.
- **Neelo section pages:** promote selected H2 sections to standalone planned pages.
- **Product pages:** map public Vibe docs to user-facing reference pages.
- **Protocol pages:** map Symmio docs to protocol/mechanics pages.
- **Implementation pages:** map local code/docs to current dashboard behavior.
- **Research pages:** map Linear issues to product decisions and unresolved implementation paths.
- **Competitive context:** map HIP-3 into a comparative architecture page.

This gives the compendium enough density for a serious book while keeping the route map traceable.

Regeneration command:

```sh
node src/search-book/scripts/build-page-manifest.mjs --input /tmp/vibe_docs/Website/public/generated/docs-data.json --out src/search-book/page-manifest.json
```

The script expects a local clone of `0xneelo/vibe_docs` or another copy of its generated `docs-data.json`.

## Open Operator Threads

The current parked threads live in `_specs/app-docs/OPERATOR-INBOX.md`:

- Revenue disclosure boundary.
- Discord/Lafa corpus access.
- Referral-depth public stance.
- Production docs platform and repository owner.

The work continues without waiting on those decisions; affected pages remain marked as gaps.

## Session 2 Build Direction

Recommended next build phases:

1. Pick production platform and repository.
2. Generate page files from `page-manifest.json`.
3. Add source-block template to every page.
4. Ingest Neelo source pages first.
5. Add Symmio/Vibe product reference pages.
6. Add local-dashboard implementation pages.
7. Build answer-engine retrieval over page bodies.
8. Wire ratings and unanswered-question capture.
9. Import Discord FAQ after operator provides export.
10. Publish final gap report and phase checkpoint.

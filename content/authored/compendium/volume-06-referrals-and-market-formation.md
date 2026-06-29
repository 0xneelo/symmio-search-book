---
id: "authored-volume-06-referrals-and-market-formation"
title: "Volume 06: Referrals And Market Formation"
section: "compendium"
track: "Volume 06"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["spec-03", "vibe-papers", "vibe-points", "server-points", "server-me", "dashboard-faq"]
sourceUrls: ["_specs/app-docs/03-grounding.md", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program-architecture/17-docs/00-abstract", "https://docs.vibe.trading/trading/vibe-points.md", "server/points.js", "server/routes/me.js", "src/dashboard/faq.jsx"]
relatedGeneratedPages: ["authored-referral-architecture-as-market-formation", "authored-referral-program-source-table-of-contents", "authored-referral-architecture-target-principle", "authored-referral-market-creation-velocity", "authored-dashboard-network", "authored-points-and-vibe-points", "authored-rewards-packs-and-artifacts", "neelo-17-referral-program-17-docs-00-abstract"]
---

# Volume 06: Referrals And Market Formation

This volume treats referrals as market formation, not just growth plumbing. In the Vibe thesis, distribution is part of liquidity formation: communities create attention, attention creates trading demand, and demand gives solvers and LPs something to price.

This volume is also intentionally review-marked, but the public referral-depth stance is no longer open. The v1 public answer is fifteen referral levels, and historical backfill is additive: it can add credit but should not lower an existing balance. The remaining review boundary is around economics, security, TGE settlement, transferability, reward packs, dashboards, and implementation details.

## What This Volume Does

- It connects referral architecture to proof of value and market bootstrap.
- It distinguishes onboarding points, trading/network points, referral points, and Vibe protocol points.
- It treats the old 5-level referral wording as stale historical context and routes current depth questions to the resolved 15-level answer.
- It prepares the reader for the dashboard pages that show invites, networks, volume, and points.

## Reading Order

Start with the market-formation thesis: `authored-referral-architecture-as-market-formation`, `authored-referral-not-marketing-widget`, `authored-referral-market-creation-velocity`, `authored-market-scoped-referrals`, and `authored-referral-sustainable-fee-flow-objective`. This path explains why referrals belong in the compendium at all. The point is not invite virality in isolation; it is whether referrals can create listings, active markets, trader demand, and fee-producing flow.

Then read the current public-state path: `authored-dashboard-network`, `authored-dashboard-volume`, `authored-estimated-network-revenue`, `authored-points-taxonomy`, `authored-points-and-vibe-points`, `authored-vibe-referral-commission-program`, and `authored-vibe-points-program`. This path is where the resolved v1 wording lives: public referral depth is fifteen levels, backfill is additive, Phase A estimated network revenue has the approved formula, and onboarding points are distinct from Vibe trading points.

Use the architecture and settlement path for implementation-sensitive questions: `authored-referral-program-source-table-of-contents`, `authored-referral-three-plane-architecture`, `authored-referral-architecture-target-principle`, `authored-referral-identity-and-claim-flow`, `authored-referral-settlement-security-controls`, `authored-referral-architecture-failure-modes`, and `authored-referral-replay-safe-claim-authorizations`. These pages separate policy agility from value-bearing claim integrity.

Next read the policy, economics, and metrics path: `authored-referral-rakeback-policy-model`, `authored-referral-public-private-economics-boundary`, `authored-referral-qualified-issuance-gating`, `authored-referral-access-phasing-operating-model`, `authored-referral-dashboard-reporting-standards`, `authored-referral-supporting-kpi-set`, and `authored-referral-rollout-governance-checklist`. This path keeps tiering, private overlays, code issuance, launch phases, metric reporting, and open decisions in their proper lanes.

Finish with the rewards and future-composability path: `authored-referral-points-economic-state`, `authored-points-claim-bridge-and-vesting`, `authored-rewards-packs-and-artifacts`, `authored-reward-ledger-game-layer-boundary`, `authored-reward-pack-system-guardrails`, `authored-tokenized-points-perps-hypothetical`, and `authored-tokenized-points-product-disclaimer`. This path is explicitly more speculative. It explains why reward state needs integrity before it can support claims, packs, artifacts, or third-party composability.

## Reader Implication

If you are a user, this volume tells you which referral and points claims are public now and which are still future-facing or review-bound. If you are an operator, it is the review queue for referral economics, settlement, security, metrics, rewards, and public-dashboard language.

## Publication Boundary

Treat this volume as the compendium's referral, points, and reward-integrity spine, not as a final campaign policy sheet. The public v1 referral-depth answer is fifteen levels with additive historical backfill. Final TGE formulas, claim mechanics, transferable rewards, signer topology, reward-pack supply and expected value, partner overlays, private economics, anti-gaming thresholds, dispute tooling, live KPI formulas, public dashboard release wording, market-scoped payout rules, and tokenized-points scenarios remain product, security, legal, accounting, implementation, and operator review items before publication as current facts.

## Sources

- `spec-03`: Product facts and referral-depth contradiction.
- `vibe-papers`: Neelo referral-program architecture papers.
- `vibe-points`: Public Vibe points guide.
- `server-points`: Local referral-depth and points configuration.
- `server-me`: Local network/depth behavior.
- `dashboard-faq`: Current user-facing referral copy.

## Related Pages

- `authored-referral-architecture-as-market-formation`
- `authored-referral-program-source-table-of-contents`
- `authored-referral-architecture-target-principle`
- `authored-referral-market-creation-velocity`
- `authored-dashboard-network`
- `authored-points-and-vibe-points`
- `authored-rewards-packs-and-artifacts`
- `neelo-17-referral-program-17-docs-00-abstract`

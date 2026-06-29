---
id: "authored-referral-game-layer-kpis"
title: "Referral Game-Layer KPIs"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/09-metrics-framework", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/12-rewards-packs-artifact-system", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-09-metrics-framework", "neelo-17-referral-program-17-docs-12-rewards-packs-artifact-system", "authored-rewards-packs-and-artifacts"]
---

# Referral Game-Layer KPIs

The metrics framework includes game-layer KPIs for a future packs-and-artifacts reward layer. These are not current product promises; they are measurement requirements if that layer becomes economically active.

The source names:

- packs held versus packs opened ratio;
- artifact trading volume;
- artifact equip rate by slot type;
- median embedded-point exposure per active wallet.

These KPIs exist because packs and artifacts can change user incentives. Users may hold expected-value containers, open them for variance, trade artifacts for rarity and exposure, or equip artifacts for boosts. Each behavior has a different economic and abuse profile.

## Why This Must Stay Separate

Game-layer metrics should not be mixed with core point accounting. Points are the base reward ledger. Packs and artifacts are optional composability layers. Reporting should show whether game mechanics improve retention and engagement without obscuring supply, demand, or integrity.

## Publication Boundary

The docs should describe these KPIs as future-layer requirements. Live pack supply, artifact catalog, equip slots, boost rules, trading support, embedded point valuation, and TGE weighting remain operator and implementation review.

## Sources

- `vibe-papers`: Neelo, "Section 9: Metrics Framework".
- `vibe-papers`: Neelo, "Section 12: Rewards, Packs, and Artifact System".
- `spec-03`: rewards-pack and TGE settlement caveats.

## Related Pages

- `authored-rewards-packs-and-artifacts`
- `authored-artifact-exposure-and-boost-rules`
- `authored-reward-pack-ev-supply-policy`

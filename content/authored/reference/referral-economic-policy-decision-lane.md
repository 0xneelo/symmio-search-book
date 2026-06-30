---
id: "authored-referral-economic-policy-decision-lane"
title: "Referral Economic Policy Decision Lane"
section: "rewards-referrals"
track: "Referral Architecture"
status: "published"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/10-open-decisions", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-10-open-decisions", "section-17-referral-program-17-docs-10-open-decisions-10-2-economic-policy", "authored-referral-public-private-policy-overlays"]
---

# Referral Economic Policy Decision Lane

The open-decisions source treats referral economics as its own decision lane because reward copy can quickly become a financial promise.

The source names three economic policy decisions:

- how private commercial tiers should be represented without obscuring public economics;
- which rewards are transferable versus non-transferable utility;
- the final eligibility and weighting rules for TGE-linked points.

Each decision affects a different trust boundary. Private tiers can be legitimate commercial policy, but public users still need to understand baseline economics. Transferability changes whether rewards behave like internal reputation, off-chain points, claim rights, or movable assets. TGE weighting changes how historical activity is interpreted.

## Public Economics Boundary

The docs can say that the architecture allows public defaults and private overlays. They should not publish live partner tiers, hidden multipliers, transferability rights, TGE formulas, claim weights, or conversion schedules until commercial, legal, accounting, and product owners approve them.

This is especially important for TGE-linked points. The local grounding material already treats final settlement formula, eligibility, and claim mechanics as owner-review territory. The open-decisions source reinforces that posture: point economics should be documented as a decision lane, not guessed from adjacent architecture pages.

## Reader Implication

When a user asks whether a referral reward can be sold, transferred, boosted, converted, or weighted for TGE, the answer should distinguish the architectural possibility from current public policy. The economic lane is resolved only when the public policy statement names the reward type, transfer state, eligibility rule, and weighting rule.

## Sources

- `vibe-papers`: Neelo, "Section 10: Open Decisions", "Economic Policy".
- `spec-03`: points, TGE, and public-economics caveats.

## Related Pages

- `authored-referral-public-private-policy-overlays`
- `authored-points-value-state-lifecycle`
- `authored-tge-qualifying-exposure-across-rewards`

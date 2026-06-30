---
id: "authored-referral-transferable-points-hardening-gate"
title: "Referral Transferable Points Hardening Gate"
section: "rewards-referrals"
track: "Referral Architecture"
status: "published"
volumeId: "volume-06-referrals-and-market-formation"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/01-system-baseline#13-points-separation", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/01-system-baseline#14-operational-reality", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-01-system-baseline", "section-17-referral-program-17-docs-01-system-baseline-1-3-points-separation", "section-17-referral-program-17-docs-01-system-baseline-1-4-operational-reality"]
---

# Referral Transferable Points Hardening Gate

Neelo's baseline separates points from referral NFT state because this lets the product iterate faster. The same source also warns that weak guarantees appear if points are treated as economically transferable before controls are hardened.

That is the hardening gate: a point can be useful as provisional accounting before it is safe as transferable economic state.

## What Must Harden First

Before points are documented as transferable, claimable, wrapped, or economically composable, the system needs stronger answers for:

- source buckets and eligibility rules;
- finalization timing;
- anti-abuse review;
- claim authorization;
- replay protection;
- and policy-version labeling.

Without those controls, transferable points can import every provisional-accounting error into a market object. A fake balance, duplicate attribution, late reversal, or hidden campaign adjustment becomes harder to repair once users trade around it.

## Publication Boundary

This page does not announce transferable referral points, reward packs, artifacts, wrappers, TGE treatment, or point-linked markets. It states the source-backed gate: economic transferability should wait until accounting, eligibility, claims, and abuse controls are explicit.

## Sources

- `vibe-papers`: Neelo, "Section 1: System Baseline", "Points Separation" and "Operational Reality".
- `spec-03`: current points-publication and reward-policy caveats.

## Related Pages

- `authored-referral-points-economic-state`
- `authored-points-value-state-lifecycle`
- `authored-tokenized-points-market-risk-boundary`

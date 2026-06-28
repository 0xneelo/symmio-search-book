---
id: "authored-referral-rakeback-policy-model"
title: "Referral Rakeback Policy Model"
section: "rewards-referrals"
track: "Referral Architecture"
status: "publication-candidate-needs-operator-review"
sourceKeys: ["vibe-papers", "spec-03"]
sourceUrls: ["https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/03-rakeback-design", "https://0xneelo.github.io/vibe_docs/docs/17-referral-program/17-docs/10-open-decisions", "_specs/app-docs/03-grounding.md"]
relatedGeneratedPages: ["neelo-17-referral-program-17-docs-03-rakeback-design", "section-17-referral-program-17-docs-03-rakeback-design-3-1-dual-channel-model", "section-17-referral-program-17-docs-10-open-decisions-10-2-economic-policy"]
---

# Referral Rakeback Policy Model

The referral paper models rakeback as two separate channels: the user's own trading-fee activity and the referred network's fee-generating activity. Both can be windowed, tiered, and policy-driven, but the docs should not collapse them into a single "reward" label.

The reason is accounting clarity. A self channel answers "what did this trader earn from their own activity?" A referral channel answers "what did this referrer earn from attributed downstream activity?" They may use similar rolling-window calculations, but they have different trust and disclosure requirements.

## Public And Private Policy

The source expects public default tables for normal users and explicit overlays for private commercial agreements. That distinction is important. Private partner terms may be commercially necessary, but they should not become hidden side effects in the public policy model.

The source also flags unresolved policy questions: one-level versus multi-level referral depth, uniform versus campaign-specific referee benefits, and stacking or cap behavior for referrer rewards. Those are not implementation details; they determine whether a user can reason about the system.

## UX Tradeoff

A claim-based model is easier to operate early because claims can be authorized and settled through a constrained path. A net-fee or same-flow rebate model is smoother for users, but it requires stronger real-time determinism and tighter settlement controls.

## Reader Implication

When the docs explain rakeback, they should name the channel, the calculation window, the applicable public policy version, and whether a private overlay exists. Until operator inbox item `#3` is resolved, do not publish final depth, stacking, or backfill language.

## Sources

- `vibe-papers`: Neelo, "Section 3: Rakeback Design".
- `vibe-papers`: Neelo, "Section 10: Open Decisions".
- `spec-03`: Referral-depth contradiction and public disclosure caveats.

## Related Pages

- `authored-points-taxonomy`
- `authored-referral-depth-open-question`
- `neelo-17-referral-program-17-docs-03-rakeback-design`

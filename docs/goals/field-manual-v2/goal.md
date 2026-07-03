# Goal: Search Book v2 — Field Manual redesign + working voting

- **Project / sub-project:** `onboarding-app` / `search-book`
- **Linear:** goal issue **SYN-347** (parent epic **SYN-209**; advances **SYN-285** public frontend). Milestones **SYN-348 … SYN-356**.
- **Repo:** `~/projects/symmio-search-book` (`0xneelo/symmio-search-book`) — the live clone. NOT `~/apps/...` (stale in the epic).
- **Branch:** `feat/field-manual-v2`.
- **Created:** 2026-07-04.
- **Operator intent:** "Take everything we already have — all the logic, all the content, all ~hundreds of pages — and put it under the new Field Manual design, across every page. And fix voting: right now clicking a vote button does nothing. Once that's ready we host it on a DNS for first user testing."

## One-line goal

Rebuild the entire Search Book frontend as the **Vibe × SYMM Field Manual** (`DESIGN.MD` v3a "Brand Max") in **React + Vite + TypeScript + Tailwind + shadcn/ui**, every view, **hybrid SSG + client islands**, preserving *all* existing logic and the `/api/search-book/*` contract — and ship **working voting** (react + persist, one-shot, with the DESIGN.MD dismiss-guard) end-to-end.

## Design source of truth

- `DESIGN.MD` (repo root) — the authoritative design system (v3a "Brand Max"). A stable copy also lives in this pack at `docs/goals/field-manual-v2/DESIGN.MD`.
- `design/field-manual-comp.html` — the rendered comp (self-contained bundle).
- `docs/goals/field-manual-v2/design-mapping.md` — how each of our ~18 views maps onto the field-manual metaphor.

## Locked decisions (operator brainstorm, 2026-07-04)

| Axis | Decision |
|---|---|
| Scope | All ~18 views redesigned (not just user-facing) |
| Stack | React + Vite + TypeScript |
| Styling | Tailwind + shadcn/ui — hard-override rounded/blur defaults (`borderRadius:0`, hard offset shadows, no blur) |
| Rendering | Hybrid — SSG content/book pages, hydrate search/answer/voting as islands |
| Uncovered views | Extrapolate the design system to everything |
| Voting | React + persist, one-shot, with the dismiss-guard modal |
| Fonts | Self-host Poppins + Space Mono (no Google CDN) |
| Deploy | Keep the current VPS topology (static build next to the Node answer-engine) |

## Scope

**In:** new `web/` app; design system + component library from DESIGN.MD; all ~18 views mapped to the field-manual metaphor; voting frontend (§5/§8) + backend `/rating` round-trip fix + smoke; behavior-parity guardrail; static build wired into the existing VPS serve/deploy.

**Out:** answer-engine corpus/content/ranking changes beyond the rating round-trip; any new product features; the frozen legacy tree `~/projects/onboarding-app/src/search-book`; the *hosting decisions* in SYN-281 (VPS env) / SYN-285 (platform/route) — operator-owned; breaking the verify/guard pipeline; printing secrets.

## Definition of done (acceptance)

1. Every view renders in the new design — **parity inventory 100% ticked**, no view left on old CSS.
2. search → answer → vote works end-to-end: immediate visual reaction, backend persistence (one-shot), dismiss-guard on unrated dismissal — proven by **Playwright** *and* a **live `/rating` round-trip** (a row lands in `search_book_ratings`, no silent 404).
3. `npm run search-book:verify` + existing smoke scripts stay **green**; new Playwright smokes green.
4. **Operator signs off on design fidelity** vs DESIGN.MD hard rules (square corners, hard offset shadows, two typefaces only, no emoji).
5. Static build produced and wired to the existing serve/deploy path; old `index.html` retired **only after** parity + design sign-off.

## Constraints / conditions

- Work on `feat/field-manual-v2`; `git pull --rebase` before every work block (a codex agent pushes to `main` concurrently).
- Keep the `/api/search-book/*` contract unchanged.
- Additive only until cutover — the old `index.html` stays live until M8/M9.
- Never touch the frozen legacy tree; never print/persist secrets (`.secrets/search-book.env` loads only via `--env-file`).
- Follow the execution protocol (`execution-protocol.md`): claim a tag, one Linear issue per milestone, commit per milestone, report, blockers as issues.

## The #1 risk — behavior parity

A full rewrite can silently drop subtle logic. The guardrail (M3 → M8): parity inventory → port against the checklist → Playwright smokes + existing `search-book:verify`/smoke scripts stay green. See `parity-checklist.md`.

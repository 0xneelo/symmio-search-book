# Goal — Symmiopedia v3: Wikipedia-clone redesign of the Search Book

- **Overall project:** onboarding-app
- **Sub-project:** search-book
- **Linear:** umbrella SYN-365 · M1 SYN-367 · M2 SYN-368 · M3 SYN-369 · M4 SYN-370 · M5 SYN-371 · gate SYN-372 (operator) · M6 SYN-373 · chassis merge SYN-374 (operator)
- **Worker:** `agent-fable-5` (claude CLI) — claim the tag in `docs/agents/registry.md` on start
- **Branch / worktree:** `feat/symmiopedia-v3` (stacked on v2 head `9d1324a`) — `~/projects/symmio-search-book-v3`
- **Decided:** 2026-07-04, operator (via introduce-goal session with agent-fable-4)

## One-line goal

Re-implement the Search Book's entire public surface in the Symmiopedia legacy-wiki design (DESIGN.MD) on the existing `web/` React+Vite+TS chassis — full replacement, superseding the never-shipped Field Manual v2 skin — through operator fidelity sign-off and cutover.

## Provenance

The operator produced the comp + spec on 2026-07-04 (`comp/`) and decided the same day that v3 supersedes v2: the Field Manual v2 skin will not ship; its codebase lands on main as the chassis (staged needs:operator on SYN-374, [PR #1](https://github.com/0xneelo/symmio-search-book/pull/1)); the v2 design gate SYN-358 is superseded by SYN-372 (its formal cancellation is an operator click — agent state-changes on that gate are permission-blocked). SYN-365 anticipated exactly this pipeline (comp + spec → introduce-goal → goal package → worker agent).

## Scope

**IN**
1. Design tokens + global chrome (legacy-Vector palette, typography, link styling) applied app-wide.
2. Puzzle-globe SVG lifted from the comp — one `<g id="pglobe">` def instanced at 118 / 228 / infobox sizes (see design-mapping.md §Globe extraction).
3. Portal main page as the public `/`.
4. Full wiki article anatomy on ReaderView for all 800 SSG pages (mapping in design-mapping.md; mandatory 5-page checkpoint before mass regen).
5. Search — portal bar, header box, results as a wiki special page.
6. Ask/answer-engine + voting surface restyled as a wiki special page; parity behaviors preserved (voting, flagged-answer quarantine).
7. Fidelity packet + operator sign-off gate (SYN-372).
8. Cutover (SYN-373): retire legacy `index.html`, repoint `smoke-deployment` markers, refresh artifact/evidence, merge to main, CI green.

**OUT**
- The five ops/browse views (BrowseView, GlossaryView, FaqView, JourneyView, InsightsView) — SYN-363, parked; leave admin-gated and untouched.
- Production deploy — SYN-281 (VPS env), SYN-285 (DNS/route), SYN-359 (execution) stay operator-gated.
- New content authoring — wiki anatomy populates from existing corpus fields only; degrade by omission, never invention.
- Any Wikipedia branding (name, wordmark, trademarked logo). Symmiopedia is its own mark.

## Acceptance criteria (definition of done)

1. Every public route renders in the Symmiopedia language and passes the DESIGN.MD hard rules: zero chroma outside link colors (`#0645ad` / `#3366bb` / `#ba0000`) and the `#a7d7f9` chrome line; system fonts only (no webfont loads); no radius above 2px; no shadows on chrome; no Wikipedia branding.
2. Globe: one reusable def, crisp at 118 / 228 / ~250px, curved label textPaths legible and following the sphere.
3. Parity checklist behaviors preserved (`parity-checklist.md`) — search, routing, voting, quarantine, admin gate.
4. `npm run search-book:verify` + the 3 smokes + Playwright suite green at the final head; CI green on the branch.
5. Fidelity packet (desktop + mobile shots mapped to the hard rules + README) under `docs/goals/symmiopedia-v3/fidelity/`.
6. Operator sign-off recorded on SYN-372 BEFORE cutover/merge — never self-approve.
7. Evidence (commits, run ids, counts, shots) on every closed issue.

## Conditions & constraints

- `execution-protocol.md` governs: one issue per subtask, In Progress on start, commit per milestone referencing the issue, agent + project labels on every issue, blockers filed as needs:* issues.
- The M3 checkpoint is mandatory: prove the anatomy mapping on 5 representative pages (shots on SYN-369, `needs:operator`) before regenerating all 800.
- Branch is stacked on the unmerged v2 head; when SYN-374 lands, rebase — expect a clean fast-forward.
- Never print secrets. The sensitive scan is fail-closed — see plan.md §Verification.

## Riskiest assumption

Wiki anatomy (infobox / references / categories) can be populated from existing corpus metadata without new authoring. De-risked by the M3 checkpoint; where a field has no source, the element is omitted for that page rather than invented.

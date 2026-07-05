Project: onboarding-app / search-book. Linear goal: SYN-347 (epic SYN-209; advances SYN-285). Milestones SYN-348…SYN-356.

Goal: rebuild the ENTIRE Search Book frontend as the "Vibe × SYMM Field Manual" (DESIGN.MD v3a) in React + Vite + TypeScript + Tailwind + shadcn/ui — every view, hybrid SSG + client islands — preserving ALL existing logic and the /api/search-book/* contract, and ship WORKING voting (react + persist, one-shot, with the DESIGN.MD dismiss-guard) end-to-end.

Repo: cd ~/projects/symmio-search-book-v2 — a DEDICATED worktree of 0xneelo/symmio-search-book, already on branch feat/field-manual-v2 (clean main; isolated from another agent's uncommitted work in the sibling clone ~/projects/symmio-search-book). The goal package (docs/goals/field-manual-v2/, DESIGN.MD, design/) is already committed here. New app in a new web/ dir; old index.html STAYS LIVE until M8/M9 sign-off. Commit only this goal's files. Live tests (M5) use --env-file ~/projects/symmio-search-book/.secrets/search-book.env (never copy/print secrets).

Read first (in order):
1. docs/goals/field-manual-v2/goal.md — contract: scope, acceptance, constraints
2. docs/goals/field-manual-v2/plan.md — the nine ordered milestones (M1→M9)
3. docs/goals/field-manual-v2/execution-protocol.md — MANDATORY work protocol
4. docs/goals/field-manual-v2/DESIGN.MD — authoritative design system (pack copy; canonical DESIGN.MD at repo root); design/field-manual-comp.html — the comp
5. docs/goals/field-manual-v2/design-mapping.md and parity-checklist.md

Linear: assign yourself SYN-347, set In Progress, comment your tag + project. Work milestones in order: SYN-348 (scaffold) → SYN-349 (design system) → SYN-350 (parity inventory — GATE) → SYN-351 (shell + search/answer) → SYN-352 (voting end-to-end) → SYN-353 (page-reader SSG) → SYN-354 (remaining admin/ops views) → SYN-355 (parity + design sign-off) → SYN-356 (deploy wiring + cutover).

Done when (goal.md §Definition of done): every view in the new design (parity checklist 100% ticked); search→answer→vote works end-to-end with visible reaction + backend persistence (one-shot) + dismiss-guard, proven by Playwright AND a live /rating round-trip (no silent 404); npm run search-book:verify + existing smokes stay green; OPERATOR signs off on design fidelity vs DESIGN.MD; static build wired to the existing VPS serve/deploy; old index.html retired only after sign-off.

Work protocol (MANDATORY — full text in execution-protocol.md): claim tag agent-fable-3 in docs/agents/registry.md and commit the row; for each milestone label the issue agent:<tag> + project:onboarding-app + subproject:search-book, assign yourself, set In Progress; commit every milestone referencing the issue id (e.g. "(SYN-348)"); on completion set Done, write a report comment (counts/run-ids/commit shas — never secret values), push. Blocked (esp. M8 design sign-off, M9 cutover/DNS)? File a Linear issue (needs:operator / needs:general), set Blocked, link it, and continue other in-scope milestones.

Hard rules: additive only until cutover — never delete the old index.html before M8 parity + operator sign-off. git pull --rebase origin main before every work block (a codex agent pushes main). Keep the /api/search-book/* contract unchanged. Never touch ~/projects/onboarding-app/src/search-book (frozen legacy). Never print/persist secrets (.secrets/search-book.env via --env-file only). Honor DESIGN.MD: square corners, hard offset shadows, two typefaces (Poppins + Space Mono), no emoji — hard-override shadcn's rounded/blur defaults. Self-host the fonts. Keep the current VPS deploy topology (static build next to the Node answer-engine). npm run search-book:verify needs a 0xneelo/vibe_docs clone (defaults to /tmp/vibe_docs — clone it if missing).

Start: claim your tag, note your project, scan open/in-progress subproject:search-book issues, open SYN-348.

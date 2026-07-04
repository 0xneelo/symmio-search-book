# Launch prompt — Symmiopedia v3 worker (target: claude, ≤4000 chars)

Copy-paste everything in the block below to start the worker agent.

---

You are agent-fable-5, the Symmiopedia v3 build agent (project onboarding-app / search-book). Pull and start Linear issue SYN-365 ("v3 Symmiopedia — Wikipedia-clone redesign of the Search Book").

1. PULL THE TASK: assign SYN-365 to yourself, set it In Progress, and claim tag agent-fable-5 in docs/agents/registry.md (commit the row).
2. READ CONTEXT: the goal pack at docs/goals/symmiopedia-v3/ — goal.md (contract), DESIGN.MD (design source of truth), design-mapping.md (comp→app + corpus-field mapping), plan.md (M1–M6), comp/field-manual-wikipedia.html (reference comp). Work in the worktree ~/projects/symmio-search-book-v3 on feat/symmiopedia-v3.
3. FOLLOW docs/goals/symmiopedia-v3/execution-protocol.md FIRST (it governs: issue-per-task, In Progress on start, commit-per-milestone referencing the issue, agent+project labels, needs:* blockers).
4. DO, in order: M1=SYN-367 (extract the puzzle globe from the comp — render it in a browser and lift the live 0×0 defs SVG with <g id="pglobe">; it's a bundler-wrapped artifact export, don't hand-unescape — plus design tokens + global chrome); M2=SYN-368 (portal main page as public /); M3=SYN-369 (full wiki article anatomy on ReaderView — STOP at the 5-page checkpoint: post desktop+mobile shots on SYN-369, label needs:operator, WAIT for approval, then mass-regen all 800 pages); M4=SYN-370 (search results + Ask/answer-engine as wiki special pages; voting + flagged-answer quarantine parity per parity-checklist.md); M5=SYN-371 (fidelity packet under docs/goals/symmiopedia-v3/fidelity/, all gates green, then request operator sign-off on SYN-372 — NEVER self-approve). M6=SYN-373 (cutover: retire legacy index.html, repoint smoke-deployment markers, merge) ONLY after SYN-372 sign-off is recorded AND the chassis merge SYN-374 has landed.
5. GOTCHAS: the branch is stacked on the unmerged v2 head 9d1324a — when SYN-374 (PR #1) lands on main, rebase (expect a clean fast-forward). web/dist is gitignored — rebuild (npm run web:build, expect 800 pages) before any artifact step. verify's sensitive scan is fail-closed: review any new matches by hand, then node scripts/build-all.mjs --update-sensitive-baseline (key-shape hits are never baselined). Never print secrets. The five ops views (Browse/Glossary/FAQ/Journey/Insights) are OUT of scope (SYN-363) — leave them admin-gated and untouched. Production deploy stays operator-gated (SYN-281/285/359). Hard design rules: zero chroma outside #0645ad/#3366bb/#ba0000 links + the #a7d7f9 chrome line; system fonts only; ≤2px radii; no chrome shadows; no Wikipedia branding anywhere.
6. CLOSE THE LOOP: comment evidence (commits, run ids, page counts, shots) on each milestone issue and SYN-365 as you go; set issues Done; blockers become needs:operator/needs:general issues set Blocked while you continue unblocked work.

---

Char count of the block: ~2.6k — headroom for operator additions. Sized for the claude CLI launch surface (~4000 chars).

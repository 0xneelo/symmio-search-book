# Plan: Search Book v2 — nine ordered milestones

Target repo: `~/projects/symmio-search-book` (`0xneelo/symmio-search-book`), branch `feat/field-manual-v2`.
Do not edit the frozen legacy tree `~/projects/onboarding-app/src/search-book`.

**Before every work block:** `git checkout feat/field-manual-v2` (create from `main` on first run), `git pull --rebase origin main` (codex agent pushes to `main` concurrently), then re-run the focused guards you rely on.

Full verify (additive — must stay green throughout):
```sh
npm run search-book:verify         # deterministic build + guards (needs a 0xneelo/vibe_docs clone; defaults to /tmp/vibe_docs)
npm run search-book:serve-service  # the Node answer-engine API (for live round-trip / voting)
```
Live LLM env (never echo values): `node --env-file=.secrets/search-book.env <script>`.

---

## M1 — Scaffold (SYN-348)
Vite + React + TS + Tailwind + shadcn in `web/`. Hard-override shadcn theme → `borderRadius:0`, hard offset-shadow tokens, `--ink`/`--paper`/`--gridc` vars, navy→blue gradient. Self-host Poppins + Space Mono. Add `web:dev`/`web:build` scripts. Additive only; existing verify/smokes stay green.

## M2 — Design system + component library (SYN-349)
Build every signature component from `DESIGN.MD` §2–§7 (see `design-mapping.md` for the inventory). Bespoke components; shadcn only for primitives (Dialog → dismiss-guard, Command → search). Encode motion + `prefers-reduced-motion`. Ship a `/components` gallery route.

## M3 — Parity inventory (SYN-350) — GUARDRAIL
Catalog every behavior/view/function in the current `index.html` + `data/*.js` globals into `parity-checklist.md`. Assign each item to an owning milestone (M4–M7). This is the gate for M8. Do this **before** heavy porting.

## M4 — App shell + search/answer core (SYN-351)
Full frame: collapsible sidebar (64→272), announcement bar, top bar (`§NN` indicator), content pane, single `page` state. Cover + "Ask the Manual". Search+answer wired to `/api/search-book/answer|insights|examples`, porting ranking + curated-merge + service→localStorage fallback per the checklist.

## M5 — Voting end-to-end (SYN-352) — HEADLINE TASK 2
Frontend RatingButtons + DismissGuard per DESIGN.MD §5/§8 (optimistic reaction, selected-invert, `✓ logged — thank you`, one-shot lock, error revert; `HOLD ON —` modal on unrated dismissal, 850ms auto-dismiss). **Backend:** ensure `/answer` persists the question under the same `eventId` the rating carries so `/rating` stops 404-ing; extend `smoke-answer-engine-service.mjs` with a full ask→rate round-trip. Covers both `data-rate` (answer) and `data-page-rate` (page) paths.

## M6 — Page-reader SSG (SYN-353)
Prerender all book pages from `page-manifest.json` + corpus (convert `data/*.js` globals to build-time imports/JSON). Chapter template per §4 (H1 → dashed rule → 2-col prose + drop cap → figure plate). Hydrate voting/nav/crosslinks as islands. Preserve `openPageFromCorpus`/related-pages behavior.

## M7 — Remaining admin/ops views (SYN-354)
Extrapolate the system to: cards, authored cards, journeys, example questions, collections, volumes, browse, glossary, FAQ, gaps, Discord routing, recent, ratings, metrics, quality audit, requirements, source ingestion, insights. Figure plates + mono tables. Preserve every filter/sort/interaction.

## M8 — Parity verification + design sign-off (SYN-355)
Tick the whole parity checklist. Add Playwright smokes (search→answer→vote incl. dismiss-guard; page-vote; nav across all views). `search-book:verify` + existing smokes green. Build a screenshot fidelity packet and file a `needs:operator` issue for **operator design sign-off**.

## M9 — Deploy wiring + cutover (SYN-356)
Wire the `web/` build into the static-serve/deploy path (`serve-static-preview.mjs`, `build-static-artifact.mjs`, systemd/VPS) alongside the Node answer-engine. Update `build-all.mjs`/integrity checks so verify covers the new build. **After M8 sign-off:** retire the old `index.html`. Production cutover/DNS is operator-gated (SYN-281/SYN-285) — prep push-button, hand off via `needs:operator`. Post the final goal report on SYN-347.

---

## Sequencing notes
- M1→M2→M3 are foundational and ordered. M4/M5 are the user-facing core (M5 depends on M4's answer flow + the backend). M6/M7 broaden coverage and can overlap once M2 exists. M8 gates on M3–M7 complete. M9 gates on M8.
- A single worker does these in order; additional agents may claim un-started milestones (scan Linear first, per the protocol).

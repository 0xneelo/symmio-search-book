# Plan — Symmiopedia v3 milestones

Protocol: `execution-protocol.md`. One Linear issue per milestone (seeded); set In Progress on start; commit per milestone referencing the issue; evidence (commits, run ids, counts, shots) on close.

## M1 — Foundation: tokens, chrome, globe (SYN-367)
Extract the globe per `design-mapping.md` §Globe extraction. Design tokens from `DESIGN.MD` Part B §2–3 as CSS variables; global chrome (canvas `#f6f6f6`, white content, `#0645ad` links with hover-only underline, serif headings). No view rewrites yet.
**Done when:** globe crisp at 3 sizes on a scratch route; tokens applied; verify green.

## M2 — Portal main page (SYN-368)
Public `/` per `DESIGN.MD` Part B §4 (portal). Search Enter/button/hint → article or search results. The v2 cover leaves the public surface (admin surface untouched).
**Done when:** pixel-matches comp Screen 1 at desktop + mobile; behaviors wired; verify green.

## M3 — Article anatomy + 800-page regen (SYN-369)
ReaderView rewrite per `design-mapping.md`. **CHECKPOINT after 5 representative pages (shots on SYN-369, needs:operator, wait) → then SSG regen of all 800.**
**Done when:** checkpoint approved; 800 pages regenerate clean; random 20-page spot-check confirms correct anatomy degradation; reader Playwright specs green.

## M4 — Search + Ask special pages (SYN-370)
Search results + Ask/answer UI per `DESIGN.MD` Part A. Voting + flagged-answer quarantine parity per `parity-checklist.md`.
**Done when:** parity sections for search/ask/voting pass; Playwright green; verify green.

## M5 — Fidelity packet + gates green → sign-off request (SYN-371)
Packet under `fidelity/` (desktop + mobile shots mapped to the hard rules, README). Full local gates (§Verification). Refresh SYN-372 with concrete review steps; request operator sign-off. **NEVER self-approve.**
**Done when:** all gates green at head; sign-off requested on SYN-372 with evidence.

## M6 — Cutover (SYN-373 — blocked by SYN-372 sign-off AND SYN-374 chassis merge)
Retire legacy `index.html`; repoint `scripts/smoke-deployment.mjs` marker assertions (they still assert the old prototype strings — known follow-up from SYN-359, 2026-07-04); rebuild `web/dist`; rebuild static artifact + evidence packets (integrity + packet checks green); rebase on `origin/main`; merge `feat/symmiopedia-v3`; CI green; close SYN-365 with the final goal report.

## Verification (every milestone)

- `npm run search-book:verify` — CI-equivalent when `web/dist` is absent; plus the 3 smokes: `search-book:smoke-static`, `search-book:smoke-service`, `search-book:smoke-preview-service`
- Web build: `npm run web:build` → expect 800 prerendered pages (`web/dist` is gitignored — rebuild before any artifact step)
- Playwright: `(cd web && npx playwright test)`
- Sensitive scan is fail-closed: review any new matches by hand, then `node scripts/build-all.mjs --update-sensitive-baseline` (key-shape hits are never baselined — treat one as an incident)
- Artifacts (M6): `npm run search-book:build-static-artifact`, `node scripts/check-static-artifact-packet.mjs`, `node scripts/check-deploy-templates.mjs`, `npm run search-book:smoke-deployment`

## Sequencing notes

- Branch `feat/symmiopedia-v3` is stacked on unmerged v2 head `9d1324a`; the chassis merge to main is staged needs:operator (SYN-374, PR #1). When it lands, rebase — expect a clean fast-forward. M1–M5 are NOT blocked on it; M6 is.
- Do not start M6 without the SYN-372 sign-off recorded.

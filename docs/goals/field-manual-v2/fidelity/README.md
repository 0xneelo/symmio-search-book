# Design-fidelity packet — Field Manual v2 (M8 / SYN-355, reduced scope per SYN-362)

Screenshots of the built `web/` app for operator sign-off against `DESIGN.MD` v3a §10 hard rules.

**Sign-off scope (operator decision 2026-07-04, SYN-362):** the public surface for first user testing is **cover + ask/answer/vote + reader pages**, desktop + mobile. The five ops views (Browse/Glossary/FAQ/Journeys/Insights) moved behind the server-verified admin gate and left the sign-off set (their redesigns are tracked in SYN-363); the gate screen itself is included for reference. **Grid backgrounds are OFF by default everywhere** (operator override via the DESIGN.MD §9 `gridLines` prop, annotated there).

## Desktop set — 1500×1000

| File | View | What to check against DESIGN.MD |
|---|---|---|
| `01-cover.png` | §00 Cover & Ask | 74px H1 with ink `×`/`.`, dashed rule, 720px Ask panel (blueprint border, `/` prefix, 60px ink submit), chips, collapsed 64px rail (public nav = §00 only), blue announcement bar, no grid backgrounds |
| `02-sidebar-expanded.png` | Sidebar hover | 64→272 expansion, wordmark + ink square, single public INDEX row, search field, REV stamp footer, hard rail shadow |
| `03-answer.png` | Answer card | Q echoed above, mono metadata header, boxed source tag, confidence, rating row (solid-ink USEFUL / outlined NEEDS WORK, pixel thumbs) |
| `04-voted-one-shot.png` | Voted state | Selected invert to white/navy, `✓ logged — thank you`, other button receded, one-shot lock |
| `05-dismiss-guard.png` | Dismiss guard | `HOLD ON —` kicker, blueprint-bordered dialog, hard shadow, RATE NOW row, underlined escape hatch, dimmed backdrop |
| `11-reader.png` | Page reader (SSG) | Chapter template: kicker chips → H1 + dashed rule → drop-cap lead → styled body; right-rail panels (grid-free) incl. RATE THIS PAGE |
| `12-components-gallery.png` | `/components` | The reviewable design system |
| `13-admin-gate.png` | Admin gate (reference) | `?admin=1` locked state: ADMIN ACCESS panel, token verified server-side, no ops content rendered |

## Mobile set — 375×812, touch

| File | View | What to check |
|---|---|---|
| `m-01-cover.png` | §00 Cover | H1 clamps below 74px, ask panel + chips usable at 375px, floating rail toggle (square, hard shadow), announcement bar wraps |
| `m-02-drawer.png` | Touch drawer | 272px overlay panel (single public INDEX row), dimmed backdrop; closes via backdrop, Escape, or nav |
| `m-03-answer.png` | Answer card | Full card usable at 375px — chips and rating row wrap |
| `m-04-voted.png` | Voted state | Selected-invert + confirmation + one-shot at 375px |
| `m-05-dismiss-guard.png` | Dismiss guard | Dialog fits ≤375px, RATE NOW row + escape hatch reachable |
| `m-11-reader.png` | Page reader (SSG) | Single-column chapter; rail panels stack; tables scroll in place |
| `m-13-admin-gate.png` | Admin gate (reference) | Locked state at 375px |

Hard rules to verify in every shot (desktop **and** mobile): square corners everywhere (no border-radius outside figure geometry), hard offset shadows only (no blur), two typefaces (Poppins + Space Mono), no emoji, magenta reserved for accent/active/value, blue for structure, hatching for de-emphasis, body ≥ ~15px, mono ≥ 10px, **no graph-paper grids** (SYN-362 default).

Interactive review: `npm run web:dev` (or `npm run web:build && npx vite preview` in `web/`) — `/` cover, `/page/<id>/` SSG pages, `/components` gallery; `/?admin=1` for the gated ops area (token required when the service sets `SEARCH_BOOK_ANSWER_ENGINE_ADMIN_TOKEN`).

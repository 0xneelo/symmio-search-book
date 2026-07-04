# Design-fidelity packet — Field Manual v2 (M8 / SYN-355)

Screenshots of the built `web/` app (commit at capture: `fa48315`), 1500×1000 viewport, for operator sign-off against `DESIGN.MD` v3a §10 hard rules.

| File | View | What to check against DESIGN.MD |
|---|---|---|
| `01-cover.png` | §00 Cover & Ask | 74px H1 with ink `×`/`.`, dashed rule, 720px Ask panel (blueprint border, `/` prefix, 60px ink submit), chips, collapsed 64px rail, blue announcement bar, `§00 COVER & ASK` mono indicator |
| `02-sidebar-expanded.png` | Sidebar hover | 64→272 expansion, wordmark + ink square, INDEX nav rows (mono numbers), search field, REV stamp footer, hard rail shadow |
| `03-answer.png` | Answer card | Q echoed above, mono metadata header (`routed answer / score …` + `FIG.ANS`), boxed source tag, confidence, rating row (solid-ink USEFUL / outlined NEEDS WORK, pixel thumbs) |
| `04-voted-one-shot.png` | Voted state | Selected invert to white/navy, `✓ logged — thank you`, other button receded, one-shot lock |
| `05-dismiss-guard.png` | Dismiss guard | `HOLD ON —` kicker, blueprint-bordered dialog, hard shadow, RATE NOW row, underlined escape hatch, dimmed backdrop |
| `06-browse.png` | §01 Browse | Volume/collection plates, filterable section tree, hard-shadow index plates |
| `07-glossary.png` | §02 Glossary | 200px/1fr grid, ink uppercase terms, hairline dividers, category chips |
| `08-faq.png` | §03 FAQ | Route cards, hatched reconciliation rows, Ask-this chips |
| `09-journeys.png` | §04 Journeys | Numbered mono steps, entry-question chips, recent-questions ledger |
| `10-insights.png` | §05 Insights | Stat tiles (hard shadows), graph-paper plates, tone system (blue=pass, ink=priority, hatch=blocked) |
| `11-reader.png` | Page reader (SSG) | Chapter template: kicker chips → H1 + dashed rule → drop-cap lead → styled body; right-rail plates incl. RATE THIS PAGE |
| `12-components-gallery.png` | `/components` | The reviewable design system |

Hard rules to verify in every shot: square corners everywhere (no border-radius outside figure geometry), hard offset shadows only (no blur), two typefaces (Poppins + Space Mono), no emoji, magenta reserved for accent/active/value, blue for structure, hatching for de-emphasis, body ≥ ~15px, mono ≥ 10px.

Interactive review: `npm run web:dev` (or `npm run web:build && npx vite preview` in `web/`) — `/` cover, `/?variant=…` views, `/page/<id>/` SSG pages, `/components` gallery.

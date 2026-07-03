# Design mapping — current views → Field Manual metaphor

The comp (`design/field-manual-comp.html`) only shows the manual chapters (§00–§06). Everything else is **extrapolated** from `DESIGN.MD` using the same primitives. Reserve **magenta** for accent/active/value, **blue** for structure, **hatching** for de-emphasized shares. Square corners + hard offset shadows only.

## Shell (all views)
- Sidebar (collapsible 64→272), announcement bar (blue), top bar (`§NN SECTION` mono indicator), content pane `max-width:1240px`. Single `page` state drives sidebar + indicator + visible pshell (DESIGN.MD §4/§8).

## Core primitives (from DESIGN.MD §5–§6)
FigurePlate · AskPanel · Chip · AnswerCard · RatingButtons · DismissGuard modal · Nav rows · Inputs · drop cap · kicker labels · glossary grid · flow bars/hatching.

## View-by-view mapping
| Current view (render fn) | §/route framing | Primary components |
|---|---|---|
| Cover / Ask | §00 cover | AskPanel + suggested chips over dashed rule |
| Answer (`renderAnswer`) | answer state | AnswerCard (mono metadata header, source tag, confidence) + RatingButtons + DismissGuard |
| Page reader (`renderPageReader`) | chapter page | Chapter template (H1 → dashed rule → 2-col + drop cap → FigurePlate) + page RatingButtons |
| Cards / authored cards | index plates | grid of bordered plates, mono tags |
| Journeys | guided sections | numbered nav rows → linked plates |
| Example questions | ask suggestions | Chips |
| Collections / Volumes / Browse | §index | nav rows + plates; volume/chapter numbering as `§NN` |
| Glossary | reference | 200px/1fr definition grid, magenta uppercase terms, hairline dividers (§6) |
| FAQ | reference | accordion rows as mono-labeled plates |
| Gaps / Recent / Ratings / Insights / Metrics | ops dashboards | mono tables inside FigurePlates; counts as mono metadata; magenta = the value being highlighted |
| Quality audit / Requirements / Source ingestion | ops plates | status tables in plates; hatching for de-emphasized/parked rows |
| Discord routing | ops plate | routed-item table in a plate; refusal states clearly flagged |

## Hard rules (DESIGN.MD §10 — never break)
- Square corners everywhere; hard offset shadows only (never blur).
- Every diagram is a numbered FIG plate with mono annotations.
- Two typefaces only (Poppins + Space Mono). No emoji. No third typeface.
- Body text ≥ ~15px; mono labels ≥ 10px.
- Magenta not used for large fills outside figures (announcement bar stays blue).

## shadcn caveat
shadcn defaults (rounded, soft/blur shadows) **fight** this design. Override the theme globally: `borderRadius:0`, custom hard-shadow utilities, no blur. Use shadcn for accessible primitives (Dialog, Command, Popover) only; the signature look is bespoke.

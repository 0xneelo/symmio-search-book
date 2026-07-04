# Vibe × SYMM Field Manual — Design Spec (v3a "Brand Max")

An interactive field manual / wiki for the Vibe trading network on the SYMM clearing layer. The visual language is **"technical print document, set in the brand's loudest voice"**: engineering-figure plates, mono annotations, and hard offset shadows on a deep navy gradient with electric blue + magenta accents.

---

## 1. Concept & tone

- Reads like a reference document, not a marketing site: numbered sections (`§00–§06`), figure plates (`FIG_001`, `FIG_021`…), revision stamp (`REV 2026.06 / OPEN`).
- Copy is calm, declarative, slightly opinionated ("Nothing here is meant to be a black box.").
- Q&A is the primary interface: "Ask the Manual" routes questions to canned indexed answers with source + confidence metadata.
- Flat, print-like geometry: **no border-radius anywhere**. Depth comes from hard drop shadows (`box-shadow: 0 4–6px 0 rgba(0,0,0,.4)`), never blur-only elevation.

## 2. Color

Theming runs through CSS vars set from props: `--ink` (accent), `--paper` (base), `--gridc` (figure grid lines).

Core palette
- `--paper` base: `#05070f` (near-black navy)
- Page background: `linear-gradient(172deg, paper 0% → mix(paper 55%, #0f3ac0) 58% → mix(paper 22%, #2e8ae8) 100%)` — dark top, luminous blue floor
- `--ink` accent (magenta): `#f04fd6` — punctuation marks, active states, key nodes, CTAs. Options: `#2e6bff`, `#8a5cff`, `#22d3ee`
- Brand blue: `#2e6bff` — announcement bar, chip/panel borders, secondary fills
- Surface tint: `color-mix(paper, #12246e / #16276e / #2e6bff)` for panels; sidebar is `mix(paper 80%, #12246e)`

Text ramp (on dark)
- Headline white: `#ffffff`
- Body: `#d3dbff` · lead/aside: `#c9d4ff` · chip text: `#cdd8ff`
- Nav resting: `#aebaf0` · meta/labels: `#8fa0d8` · faint mono/placeholders: `#5f6cb0`

Lines: `rgba(255,255,255, .12 / .14)` hairlines; `.25–.35` input & figure borders; figure frames dashed `rgba(255,255,255,.3)`.

## 3. Typography

Two families only (Google Fonts):
- **Poppins** — UI + editorial. Weights: 400/500/600/700 (+italic 400/500)
- **Space Mono** — annotations, figure labels, formulas, metadata. 400/700

Scale
- Cover H1: 74px / 700 / −3px tracking / 0.98 line-height
- Section H1: 48–54px / 700 / −2.2px; title ends with an `--ink` colored `.` or `?`
- Answer H3: 18–21px / 600 / −0.3px
- Body: 15.5px / 1.75 (figures captions 15px / 1.65)
- Kicker labels: 10–14px / 600–700 / letter-spacing 2–3px / UPPERCASE
- Mono annotations: 10–12px, letter-spacing 0.3–2px
- Drop cap (`.dropcap::first-letter`): 58px / 700 / `--ink`, on the first paragraph of each chapter

## 4. Layout & shell

Full-viewport app frame, no page scroll except the content pane.

- **Sidebar** (left, overlay `position:absolute`, z-40): collapsed rail **64px**, expands to **272px** on hover (`width .3s cubic-bezier(.22,.75,.25,1)` + `30px 0 70px` shadow). Collapsed shows monogram `V■` and `/` glyph; expanded shows wordmark, search field, INDEX nav, footer. `.sx` elements fade out when collapsed, `.sc` elements fade in (staggered opacity transitions). Content pane reserves `margin-left:64px`.
- **Announcement bar**: 44px, solid `#2e6bff`, white copy + white `JOIN NOW ↗` button with hard shadow.
- **Top bar**: 61px, `rgba(3,5,16,.3)`, hairline bottom; breadcrumb left, compact ask-field center, `§NN SECTION NAME` mono indicator right.
- **Content**: scrollable pane, inner column `max-width:1240px`, padding `34px 48px 110px`. One section visible at a time (SPA-style page switch, `[data-pshell]` show/hide).
- **Cover**: title row (H1 + right-aligned tagline) over a dashed blue rule; Ask panel (720px) centered in the remaining space via flex `margin:auto`.

Chapter template: H1 → dashed rule (6px, repeating blue dashes 12/24px) → 2-column prose (`columns:2; gap:46px; max-width:880px`, drop cap) → figure plate.

## 5. Components

**Figure plate** — the signature element: dashed 1.5px border, graph-paper background (22×22px `--gridc` grid), mono corner labels (`FIG_0NN — TITLE` top-left, bracketed tag top-right), mono caption/footnote below. All diagrams live in plates.

**Ask panel**: 2px `#2e6bff` border, tinted navy fill, hard shadow; magenta `ASK THE MANUAL` kicker; input row (2px white/30 border, mono `/` prefix, magenta 60px `→` submit); suggested-question chips.

**Chips**: transparent, 2px `#2e6bff` border, 600/12px, `8px 14px`; hover inverts to solid `--ink`/white.

**Answer card**: 2px white/22 border on tinted navy; mono metadata header row (`routed answer / score question-route:NNN` · `FIG.ANS`); body; source tag (mono, boxed) + confidence; rating row.

**Rating buttons**: pixel-art thumb SVG + label. Primary `USEFUL` — solid `--ink`, hard shadow, hover presses down 2px; secondary `NEEDS WORK` — outlined, hover fills `--ink`; selected state inverts to white/navy. When one is hovered/selected the other visibly recedes. Confirmation: `✓ logged — thank you`.

**Dismiss-guard modal**: dismissing an unrated answer opens a centered dialog (`HOLD ON —`) re-offering the rating; escape hatch is an underlined text link. Backdrop `rgba(2,4,14,.7)`, click-outside cancels.

**Nav rows**: mono 2-digit number + Poppins 600 label; hover `rgba(46,107,255,.14)`; active adds 3px `--ink` left border, `rgba(46,107,255,.22)` fill, white 700 label, magenta number.

**Inputs**: rectangular, `rgba(2,4,14,.55)` fill, 1.5px white/25 border fused to a square magenta submit. Cross-field ghost: typing in one ask-field shows animated `typing into another…` dots in the other two (fields share one query state).

## 6. Figures (per chapter)

- `FIG_001` Network stack — six isometric diamond tiles on a dashed baseline (TRADER → FRONTEND → REFERRAL GRAPH → SYMM CLEARING → SOLVER/LP → SETTLEMENT), auto-cycling magenta highlight every 1.5s, gentle float loop, staggered assemble-in.
- `FIG_010` Epoch timeline — circle nodes on a rule; CLOSE 00:00 UTC node is solid `--ink`.
- `FIG_021` Referral graph — YOU (magenta, 30r) ← L1 (24r) ← L2 (20r) nodes, dashed magenta edges, `+pts` labels, animated pulse dots flowing inward (`rgFlow`, staggered delays).
- `FIG_031` Revenue split — flow bar: hatched `GROSS FEE 100%` → proportional segments (hatched PROTOCOL OPS 34 / magenta NETWORK REVENUE POOL 30 / blue REFERRER SHARE 22 / hatched TRADER REBATE 14) → mono formula `net_revenue = Σ(vol·fee_rate·tier) − solver_rebate`.
- `FIG_041` Intent lifecycle — three hard-shadow boxes INTENT → SOLVER AUCTION (solid blue, wider) → SETTLEMENT with magenta mono arrows.
- Glossary: 200px/1fr definition grid, magenta uppercase terms, hairline dividers.

Diagram conventions: hatching = `repeating-linear-gradient(45°, white/12–14 0 1px, transparent 1px 8px)`; blue = structural, magenta = the thing being explained / where value lands.

## 7. Motion

- Page entry: children slide up 16px (`pageIn` .56s `cubic-bezier(.16,.8,.24,1)`), stagger .06–.42s
- Answer/modal entry: 10px rise, .46s
- Stack tiles: scale .955→1 assemble + 6.5s float loop; highlight cycle 1.5s
- Graph pulses: 1.9s linear, staggered
- Hover micro-motions: ≤ .3s; primary button "press" via translateY(2px) + shadow collapse
- `prefers-reduced-motion`: all animation/transitions collapse to ~0; highlight cycle stops (static highlight)

## 8. Behavior notes

- Q&A: keyword-matched canned answers (points credit / revenue calc / counter paused / invites) + low-confidence fallback routing to §04. Answer replaces the ask form; Q echoes above it.
- Rating from the modal auto-dismisses the answer after 850ms. **Operator amendment 2026-07-04 (SYN-364), supersedes the 850ms rule:** any successful vote opens a thank-you dialog ("Logged — your rating is in.") with a 5s mono countdown; `ASK NEXT QUESTION` closes it, clears the answer, and refocuses the ask field; countdown/backdrop/Escape exit keeps the answer for rating-row votes and clears it for dismiss-guard votes.
- Section state is a single `page` value; sidebar, top-bar indicator, and visible pshell all derive from it.
- Scrollbar is styled (11px, `#1b2c74` thumb, paper track); selection is magenta/white.

## 9. Tweakable props

- `accent` (`--ink`): `#f04fd6` default · `#2e6bff` · `#8a5cff` · `#22d3ee`
- `paper` (`--paper`): `#05070f` default · `#060a1c` · `#03103d` · `#0a1027`
- `gridLines` (bool): toggles figure graph-paper grid — **default OFF since 2026-07-04 (operator override, SYN-362): grids fight dense text; `--gridc` ships as `transparent`. Restore per-deploy with `rgba(255,255,255,0.07)`.**

## 10. Do / don't

- **Do** keep everything square-cornered; use hard offset shadows only.
- **Do** label every diagram as a numbered FIG plate with mono annotations.
- **Do** reserve magenta for accent/active/value; blue for structure; hatching for de-emphasized shares.
- **Don't** introduce a third typeface, rounded corners, blur shadows, or emoji.
- **Don't** let body text drop below ~15px or mono labels below 10px.
- **Don't** use magenta for large fills outside figures (announcement bar stays blue).

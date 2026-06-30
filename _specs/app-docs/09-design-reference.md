# 09 — Design reference (the front-door mockup)

An operator-provided mockup of the docs app is committed at **`design/vibe-docs-mockup.html`** — **open it; it is the visual + IA source of truth. Match it.** It realizes the answer-engine + living-docs vision on the Vibe brand.

## What it shows
**Left nav (the docs app's sections):**
- **Ask & search** — the home / front door.
- **Rewards, invites & referrals** — FAQ-style content (from the dashboard FAQ).
- **How revenue is calculated** — the network-revenue doc (status-at-a-glance, roadmap, the `V · f · s` formula, "Earning live", Common questions).
- **Glossary.**
- **Search insights** — the living-docs analytics.
- **Back to dashboard** — cross-link to the Vibe app.

**Home ("Ask & search") — the Google-like front door:**
- A large central **ask bar**, placeholder *"Ask anything — points, invites, revenue, payouts…"*, with an **"Ask the docs"** action.
- **Example questions** as one-tap chips: "When do referral points credit?", "How is my revenue calculated?", "Why is my live counter not moving?", "How do I get more invites?".
- Links to **Browse the docs** and **Search insights**.
- Flow: ask → an **agentic background task searches the live docs** → returns the answer **and routes to the page** that answers it → rate it → ask again.

**Search insights — the living docs made visible:**
- **Recent questions** — the tracked-question log.
- **Where docs fall short** — the gaps queue (low-rated / unanswered questions that drive improvement).

**Brand:** Vibe navy `#070d1a` + pink `#f584ee`, Plus Jakarta Sans, mono for technical readouts — consistent with `DESIGN.md`.

## How to use it
- Treat the mockup as the **visual + IA target** for `05` (architecture) and `06` (answer engine). Build to match its structure, interaction model, and brand.
- The mockup currently covers the **reference** pages (rewards, revenue, glossary) + the **search home** + **insights**. The build **extends** it with: the full **manifesto** (`02`), the rest of the reference, the **real agentic search backend** (the mockup's search is illustrative), and a **persistent question/rating store** behind "Search insights".

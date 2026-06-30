# 06 — The answer engine & living docs

The interface *is* the product: users mostly **ask**, and the docs answer + route + learn.

> **Design reference:** build to match the operator's mockup — `design/vibe-docs-mockup.html` (see `09`). Home = an "Ask & search" page with the bar (placeholder *"Ask anything — points, invites, revenue, payouts…"*) + example-question chips; a "Search insights" page surfaces **Recent questions** + **Where docs fall short**.

## Answer-engine front door
- A prominent **ask bar** is the primary entry. A question → agentic retrieval over the docs corpus → an **answer plus a link to the exact page** that answers it. The reader keeps asking; each answer routes to a (possibly new) page.
- **Retrieval + generation:** chunk + embed the whole compendium (+ the Discord Q&A dataset) into a vector index; retrieve, then answer with **Claude** (latest models — e.g. `claude-opus-4-8` for synthesis, a faster tier for routing/retrieval). **Always cite + link** the source page(s). **Refuse/deflect** when the answer isn't in the corpus.
- A floating ask bar/widget on every page, plus the dedicated front-door experience.

## Living-docs feedback loop (the whole point)
- **Rate every answer.** After each answer: "did this answer your question?" (yes/no + optional note).
- **Track every question.** Persist each query, the answer given, the page(s) linked, and the rating into `QUESTIONS.md` + a small datastore.
- **Surface gaps.** Low-rated answers, "no good page found," and repeated questions become a prioritized **gaps queue**.
- **Demand-driven improvement.** A periodic agent reviews the gaps queue and drafts doc improvements or new pages for exactly what people ask. Close the loop: question → gap → new/edited page → better answer.
- **Seed from the Symmio Discord** (`07`): the mined questions + Lafa's answers prime the FAQ, the answer engine, and the initial gaps queue — the docs launch already knowing what people ask.

## Build vs buy
- If the chosen platform has native AI (e.g. Mintlify), use it for retrieval/UX **but still wire our own** question-tracking + rating + gaps datastore so we own the demand signal.
- Else build the engine (vector index + Claude + widget) and the datastore directly (deployable on the VPS).

## Guardrails
- Answer **only** from the corpus; always link sources; never invent; escalate unknowns into the gaps queue.

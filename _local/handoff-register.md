# Handoff Register

Newest first. Each entry links a temp handoff doc, its Linear issue, and the receiving agent.

## 2026-07-02 — Search Book production finalization (every pre-VPS gap)

- Created: 2026-07-02
- Handoff path: `/tmp/handoff-search-book-prod-finalization-20260702.md`
- Focus: Finish everything automatable before the VPS deployment: checkpoint the staged advice-disclaimer work, resolve SYN-301 gap events, make the sensitive-pattern scan fail-closed, refresh launch/release/static evidence, final verify sweep — so only operator items #11 (SYN-281) and #4 (SYN-285) remain.
- Summary: Post-audit finalization sweep. All claims reproduced locally on 2026-07-02 (verify green, live eval 44/44); working tree holds the verified answered-with-disclaimer change awaiting checkpoint. Codex agent (SYN-292) pushes to main concurrently.
- Receiving agent: Claude Fable 5 worker (pull via kickoff prompt in SYN-304)
- Linear: SYN-304 — https://linear.app/synchronicity/issue/SYN-304/search-book-production-finalization-complete-every-pre-vps-gap-so

## 2026-07-02 — Search Book undocumented-fact gap events

- Created: 2026-07-02
- Handoff path: `/tmp/handoff-search-book-unanswered-fact-gap-events-20260702.md`
- Focus: LLM answers for facts absent from the corpus return status `answered` with no gap event; the living-docs loop loses the missing-fact demand signal. Implement fact-coverage self-report → typed gap event (or refusal), eval fixtures, evidence reconciliation.
- Summary: Found in the 2026-07-02 local audit (SYMM-address repro). Extractive off-corpus lane gaps correctly; the LLM synthesis lane leaks. Recommendation: answer honestly + create gap event, consistent with the answer-with-disclaimer advice-lane decision.
- Receiving agent: unassigned (pull via kickoff prompt in SYN-301)
- Linear: SYN-301 — https://linear.app/synchronicity/issue/SYN-301/search-book-llm-answers-for-undocumented-facts-skip-gap-events-capture

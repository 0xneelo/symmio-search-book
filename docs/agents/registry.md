# Agent Registry — tag database

Claim a tag before working a goal; retire it (status `retired`) when the goal closes. One tag per running agent. Tag format: `agent-<short-name|NNN>`.

| tag | runtime | owner | project | sub-project | current goal | status | started | last-seen |
|-----|---------|-------|---------|-------------|--------------|--------|---------|-----------|
| agent-codex-vps | codex | neelo | onboarding-app | search-book | SYN-292 production-readiness handoff | active | 2026-06-28 | 2026-07-02 |
| agent-fable-001 | claude-opus-4-8 | admin | onboarding-app | search-book | SYN-304 production finalization | retired | 2026-07-02 | 2026-07-02 |
| agent-fable-3 | claude-fable-5 | neelo | onboarding-app | search-book | SYN-347 field-manual-v2 rebuild (M1–M9 done; cutover on operator gates SYN-358/SYN-359) | active | 2026-07-04 | 2026-07-04 |
| agent-fable-4 | claude-opus-4-8 | neelo | onboarding-app | search-book | SYN-366 closed — v2 skin superseded by operator (2026-07-04); chassis merge staged needs:operator (SYN-374 / PR #1); Symmiopedia v3 goal package delivered (SYN-365, worker: agent-fable-5) | retired | 2026-07-04 | 2026-07-04 |
| agent-fable-5 | claude-fable-5 | neelo | onboarding-app | search-book | SYN-365 Symmiopedia v3 build (M1–M6: SYN-367…SYN-373) | active | 2026-07-04 | 2026-07-04 |

/**
 * Symmiopedia search routing (SYN-370, DESIGN.MD Part A): the portal bar and
 * the header box hit the app's existing search. A confident direct hit
 * (seeded question route / glossary / answer chunk — the findAnswer
 * precedence, parity §3) opens the article like the comp; everything else
 * lands on the Search-results special page in wiki list register.
 */
import type { CorpusData } from '@/data/loader'
import type { Page } from '@/data/types'
import { findAnswer, scorePage } from './search'
import { recordQuestion } from './service'

export type SearchDestination = { kind: 'page'; pageId: string } | { kind: 'results' }

/** Resolve a chrome-search submit; records the question event (parity §3). */
export function resolveWikiSearch(
  data: CorpusData,
  query: string,
  source: string,
): SearchDestination {
  const result = findAnswer(data, query)
  recordQuestion(query, result, source)
  // Only an exact hit opens the article directly (comp §6: the portal search
  // opens THE article): a normalized seeded-question match (1000) or an exact
  // glossary term/definition ask (880/900). Fuzzy overlap — including chunk
  // routes — belongs on the results list; the ask flow keeps the full
  // precedence chain untouched (parity §3).
  const score = String(result.score)
  const exactRoute = /^question-route:(\d+)/.exec(score)
  const exactGlossary = /^glossary:(\d+)/.exec(score)
  const direct =
    (exactRoute && Number(exactRoute[1]) >= 1000) ||
    (exactGlossary && Number(exactGlossary[1]) >= 880)
  if (direct && result.page) return { kind: 'page', pageId: result.page.id }
  return { kind: 'results' }
}

export interface RankedResult {
  page: Page
  score: number
}

/** Ranked page list for the results special page (scorePage parity weights). */
export function rankSearchResults(data: CorpusData, query: string, limit = 20): RankedResult[] {
  const q = String(query || '').trim()
  if (!q) return []
  return data.publicSearchablePages
    .map((page) => ({ page, score: scorePage(page, q) }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
}

/** Snippet line for a result row. */
export function resultSnippet(page: Page, maxLength = 220): string {
  const text = String(page.summary || page.excerpt || '').replace(/\s+/g, ' ').trim()
  return text.length > maxLength ? `${text.slice(0, maxLength)}…` : text
}

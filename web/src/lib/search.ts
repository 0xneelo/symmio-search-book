/**
 * Ranking + answer routing, ported 1:1 from index.html L2511, L2706–2836.
 * Weights and precedence are parity-critical — see parity-checklist.md §3.
 */
import type { CorpusData } from '@/data/loader'
import type { AnswerChunk, AnswerResult, GlossaryTerm, Page, QuestionRoute } from '@/data/types'

const stopWords = new Set([
  'a', 'about', 'an', 'and', 'are', 'as', 'at', 'be', 'do', 'does', 'for', 'from', 'how',
  'i', 'in', 'is', 'it', 'me', 'my', 'of', 'on', 'or', 'the', 'to', 'what', 'when', 'where', 'why',
])

export function wordsFor(query: unknown): string[] {
  return [
    ...new Set(
      String(query || '')
        .toLowerCase()
        .split(/[^a-z0-9]+/)
        .filter((word) => word.length > 1 && !stopWords.has(word))
        .map((word) => word.replace(/(ations|ation|ions|ion|ing|ed|ers|er|s)$/u, ''))
        .filter((word) => word.length > 1 && !stopWords.has(word)),
    ),
  ]
}

export function normalizeQuestionText(query: unknown): string {
  return String(query || '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ')
}

function scoreQuestionRoute(route: QuestionRoute, query: string): number {
  const normalized = normalizeQuestionText(query)
  if (!normalized) return 0
  if (normalized === route.normalizedQuestion) return 1000
  const queryWords = wordsFor(query)
  if (!queryWords.length) return 0
  const routeWords = new Set(
    wordsFor([route.question, route.pageTitle, route.notes, route.pageSection, route.pageTrack].join(' ')),
  )
  const overlap = queryWords.filter((word) => routeWords.has(word)).length
  const coverage = overlap / Math.max(1, queryWords.length)
  const confidenceBonus = route.confidence === 'High' ? 8 : route.confidence === 'Medium' ? 4 : 1
  return overlap >= Math.min(2, queryWords.length) && coverage >= 0.5 ? 120 + overlap * 8 + confidenceBonus : 0
}

function findSeededQuestionRoute(data: CorpusData, query: string): AnswerResult | null {
  const ranked = data.seededQuestionRoutes
    .map((route) => ({ route, score: scoreQuestionRoute(route, query) }))
    .sort((a, b) => b.score - a.score)
  const best = ranked[0]
  if (!best || best.score <= 0) return null
  return {
    page: best.route.page ?? null,
    score: `question-route:${best.score}`,
    questionRoute: best.route,
  }
}

function scoreGlossaryTerm(term: GlossaryTerm, query: string): number {
  const normalized = normalizeQuestionText(query)
  if (!normalized) return 0
  const aliases = term.aliases || []
  const labels = [term.term, ...aliases].map(normalizeQuestionText)
  if (labels.includes(normalized)) return 900
  if (
    labels.some(
      (label) =>
        normalized === `what is ${label}` || normalized === `what are ${label}` || normalized === `define ${label}`,
    )
  ) {
    return 880
  }
  const queryWords = wordsFor(query)
  if (!queryWords.length) return 0
  const termWords = new Set(wordsFor([term.term, aliases.join(' '), term.category, term.definition].join(' ')))
  const overlap = queryWords.filter((word) => termWords.has(word)).length
  return overlap >= Math.min(2, queryWords.length) ? 90 + overlap * 7 : 0
}

function findGlossaryRoute(data: CorpusData, query: string): AnswerResult | null {
  const ranked = data.glossaryTerms
    .map((term) => ({ term, score: scoreGlossaryTerm(term, query) }))
    .sort((a, b) => b.score - a.score)
  const best = ranked[0]
  if (!best || best.score <= 0 || !best.term.primaryPage) return null
  return {
    page: best.term.primaryPage,
    score: `glossary:${best.score}`,
    glossaryTerm: best.term,
  }
}

function scoreAnswerChunk(chunk: AnswerChunk, query: string): number {
  const words = wordsFor(query)
  if (!words.length) return 0
  const title = String(chunk.title || '').toLowerCase()
  const section = [chunk.section, chunk.track, (chunk.sourceKeys || []).join(' ')].join(' ').toLowerCase()
  const body = String(chunk.text || '').toLowerCase()
  const scoreText = (text: string, weight: number) =>
    words.reduce((score, word) => score + (text.includes(word) ? weight : 0), 0)
  const exact =
    body.includes(String(query || '').toLowerCase()) || title.includes(String(query || '').toLowerCase()) ? 16 : 0
  const routeBonus = chunk.routeSource === 'authored' ? 8 : chunk.routeSource === 'curated' ? 4 : 0
  const base = scoreText(title, 7) + scoreText(section, 4) + scoreText(body, 2)
  return base > 0 ? base + exact + routeBonus : 0
}

function findAnswerChunkRoute(data: CorpusData, query: string): AnswerResult | null {
  const ranked = data.answerChunks
    .map((chunk) => ({ chunk, score: scoreAnswerChunk(chunk, query) }))
    .sort((a, b) => b.score - a.score)
  const best = ranked[0]
  if (!best || best.score <= 0) return null
  return {
    page: best.chunk.page ?? null,
    score: `chunk:${best.score}`,
    answerChunk: best.chunk,
  }
}

export function scorePage(page: Page, query: string): number {
  const words = wordsFor(query)
  if (!words.length) return 0
  const title = String(page.title || '').toLowerCase()
  const section = [page.section, page.track, (page.sources || page.sourceKeys || []).join(' ')].join(' ').toLowerCase()
  const body = [page.summary || page.excerpt, (page.keywords || []).join(' ')].join(' ').toLowerCase()
  const scoreText = (text: string, weight: number) =>
    words.reduce((score, word) => score + (text.includes(word) ? weight : 0), 0)
  const base = scoreText(title, 5) + scoreText(section, 3) + scoreText(body, 1)
  const exact =
    body.includes(String(query || '').toLowerCase()) || title.includes(String(query || '').toLowerCase()) ? 5 : 0
  return base > 0 && page.curated ? base + exact + 3 : base + exact
}

/** Precedence chain (L2824): seeded route → glossary → chunk → ranked pages. */
export function findAnswer(data: CorpusData, query: string): AnswerResult {
  const seeded = findSeededQuestionRoute(data, query)
  if (seeded) return seeded
  const glossaryRoute = findGlossaryRoute(data, query)
  if (glossaryRoute) return glossaryRoute
  const chunkRoute = findAnswerChunkRoute(data, query)
  if (chunkRoute) return chunkRoute
  const ranked = data.publicSearchablePages
    .map((page) => ({ page, score: scorePage(page, query) }))
    .sort((a, b) => b.score - a.score)
  const best = ranked[0]
  return best && best.score > 0 ? best : { page: null, score: 0 }
}

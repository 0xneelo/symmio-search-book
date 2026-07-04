/**
 * Build-time data loading — replaces the 22 <script src> globals of the old
 * index.html (L7–28) with JSON imports. Small files load statically; the three
 * heavy ones (search-index 1.2M, answer-chunks 5.5M, crosslinks 3.8M) load via
 * dynamic import so the shell paints before the corpus parses.
 * Derived-data rules ported 1:1 from index.html L2406–2511.
 */
import type { AnswerChunk, FaqEntry, GlossaryTerm, Page, QuestionRoute } from './types'

// answer-corpus.js is an IIFE that assigns window.SearchBookCorpus (root file, not data/).
import '../../../answer-corpus.js'

import navigationRaw from '../../../data/navigation-tree.json'
import journeysRaw from '../../../data/journeys.json'
import questionRoutesRaw from '../../../data/question-routes.json'
import gapQueueRaw from '../../../data/gap-queue.json'
import discordRoutingRaw from '../../../data/discord-review-routing.json'
import discordEditorialRaw from '../../../data/discord-editorial-queue.json'
import answerEngineContractRaw from '../../../data/answer-engine-contract.json'
import llmRagContractRaw from '../../../data/llm-rag-contract.json'
import answerValidationRaw from '../../../data/answer-validation-report.json'
import volumeMapRaw from '../../../data/volume-map.json'
import glossaryRaw from '../../../data/glossary.json'
import sourceCatalogRaw from '../../../data/source-catalog.json'
import sourceIngestionRaw from '../../../data/source-ingestion.json'
import requirementMapRaw from '../../../data/requirement-map.json'
import qualityAuditRaw from '../../../data/quality-audit.json'

/* eslint-disable @typescript-eslint/no-explicit-any */
type Any = any

declare global {
  interface Window {
    SearchBookCorpus?: Any
    SEARCH_BOOK_ANSWER_ENGINE_URL?: string
  }
}

export const corpus: Any = (typeof window !== 'undefined' && window.SearchBookCorpus) || {
  pages: [],
  journeys: [],
  manifestStats: {},
}
export const navigation: Any = navigationRaw ?? { sections: [], collections: [], parkedPages: [], counts: {} }
export const journeyMap: Any = journeysRaw ?? { journeys: [], totalJourneys: 0, totalSteps: 0 }
export const questionRouteMap: Any = questionRoutesRaw ?? { answerable: [], reconciliation: [], totalRoutes: 0 }
export const gapQueue: Any = gapQueueRaw ?? {
  items: [],
  totalItems: 0,
  totalQuestionSignals: 0,
  totalOperatorSignals: 0,
  totalParkedPageSignals: 0,
  byPriority: {},
  byCategory: {},
}
export const discordRouting: Any = discordRoutingRaw ?? {
  routingReady: false,
  rawDiscordTextIncluded: false,
  summary: { routedItems: 0, byStatus: {}, byAction: {}, byReviewType: {}, topPrimaryPageIds: [] },
  reviewPlan: { pageFitReview: [], refusalReview: [] },
  items: [],
}
export const discordEditorialQueue: Any = discordEditorialRaw ?? {
  reviewerWorkflow: { status: 'missing', counts: {}, phaseOrder: [] },
  disposition: {},
}
export const answerEngineContract: Any = answerEngineContractRaw ?? {}
export const llmRagContract: Any = llmRagContractRaw ?? {}
export const answerValidationReport: Any = answerValidationRaw ?? {}
export const volumeMap: Any = volumeMapRaw ?? {
  volumes: [],
  totalVolumes: 0,
  totalChapters: 0,
  readerPages: 0,
  pagesAssigned: 0,
}
export const glossary: Any = glossaryRaw ?? { terms: [], totalTerms: 0, byCategory: {} }
export const sourceCatalog: Any = sourceCatalogRaw ?? { sources: [], sourceByKey: {}, totalSources: 0 }
export const sourceIngestion: Any = sourceIngestionRaw ?? {
  requirements: [],
  byStatus: {},
  byCategory: {},
  missingSourceFamilies: [],
  sourceCompletionReady: false,
}
export const requirementMap: Any = requirementMapRaw ?? {
  requirements: [],
  byStatus: {},
  byCategory: {},
  nextFocus: [],
  completionReady: false,
}
export const qualityAudit: Any = qualityAuditRaw ?? { totals: {}, gates: [], sourceCoverage: {}, unresolved: {} }

export const sourceByKey: Record<string, Any> = sourceCatalog.sourceByKey || {}

function keywordize(page: Any): string[] {
  return [page.title, page.section, page.track, page.excerpt, (page.sourceKeys || []).join(' ')]
    .join(' ')
    .split(/\s+/)
}

export interface CorpusData {
  authored: Any
  authoredPages: Page[]
  pageStateRegistry: Any
  faqMap: Any
  allSearchablePages: Page[]
  publicSearchablePages: Page[]
  publicAuthoredPages: Page[]
  pageById: Map<string, Page>
  answerChunks: AnswerChunk[]
  seededQuestionRoutes: QuestionRoute[]
  faqEntries: FaqEntry[]
  glossaryTerms: GlossaryTerm[]
  crosslinkByPageId: Record<string, Any>
  isPublicNavigationPage: (page: Page) => boolean
}

let dataPromise: Promise<CorpusData> | null = null

/** Heavy-file load + derived merge (L2439–2465). Cached; call once at boot. */
export function loadCorpusData(): Promise<CorpusData> {
  if (dataPromise) return dataPromise
  dataPromise = Promise.all([
    import('../../../data/search-index.json'),
    import('../../../data/answer-chunks.json'),
    import('../../../data/crosslinks.json'),
    import('../../../data/authored-pages.json'),
    import('../../../data/page-state-registry.json'),
    import('../../../data/faq.json'),
  ]).then(([searchIndexMod, answerChunksMod, crosslinksMod, authoredMod, pageStateMod, faqMod]) => {
    const searchIndex: Any[] = (searchIndexMod.default as Any[]) || []
    const answerChunkMap: Any = answerChunksMod.default || { chunks: [] }
    const crosslinks: Any = crosslinksMod.default || { pageById: {} }
    const authored: Any = authoredMod.default ?? { pages: [], totalPages: 0 }
    const pageStateRegistry: Any = pageStateMod.default ?? {
      pages: [],
      publicNavigationPages: 0,
      sourceCompanionPages: 0,
    }
    const faqMap: Any = faqMod.default ?? {
      entries: [],
      answerable: [],
      unresolved: [],
      totalEntries: 0,
      totalAnswerable: 0,
      totalUnresolved: 0,
      byCategory: {},
    }

    const pageStateById = new Map<string, Any>((pageStateRegistry.pages || []).map((p: Any) => [p.id, p]))

    // index.html L2719 — page-state registry gating with authored fallback.
    const isPublicNavigationPage = (page: Page): boolean => {
      const state = pageStateById.get(page.id)
      if (state) {
        return state.publicNavigationEligible && (state.pageState === 'published' || state.pageState === 'candidate')
      }
      return Boolean(page.authored && (page.status === 'published' || page.status === 'candidate'))
    }

    // L2430 — authored-page mapping.
    const authoredPages: Page[] = (authored.pages || []).map((page: Any) => ({
      ...page,
      summary: page.excerpt,
      sources: page.sourceKeys || [],
      route: page.file,
      curated: true,
      authored: true,
      keywords: keywordize(page),
    }))

    // L2439 — full-index mapping mirrors the authored mapping.
    const fullIndex: Page[] = searchIndex.map((page: Any) => ({
      ...page,
      summary: page.excerpt,
      sources: page.sourceKeys || [],
      route: page.file,
      keywords: keywordize(page),
    }))

    // L2446–2447 — curated merge: authored + corpus(curated) + fullIndex minus curated.
    const curatedIds = new Set([
      ...authoredPages.map((p) => p.id),
      ...(corpus.pages || []).map((p: Any) => p.id),
    ])
    const allSearchablePages: Page[] = fullIndex.length
      ? [
          ...authoredPages,
          ...(corpus.pages || []).map((p: Any) => ({ ...p, curated: true })),
          ...fullIndex.filter((p) => !curatedIds.has(p.id)),
        ]
      : [...authoredPages, ...(corpus.pages || [])]

    const publicSearchablePages = allSearchablePages.filter(isPublicNavigationPage)
    const publicAuthoredPages = authoredPages.filter(isPublicNavigationPage)
    const pageById = new Map(publicSearchablePages.map((p) => [p.id, p]))

    const answerChunks: AnswerChunk[] = (answerChunkMap.chunks || [])
      .map((chunk: Any) => ({ ...chunk, page: pageById.get(chunk.pageId) }))
      .filter((chunk: AnswerChunk) => chunk.page)

    const seededQuestionRoutes: QuestionRoute[] = (questionRouteMap.answerable || [])
      .map((route: Any) => ({ ...route, page: pageById.get(route.pageId) }))
      .filter((route: QuestionRoute) => route.page)

    const faqEntries: FaqEntry[] = (
      faqMap.entries || [...(faqMap.answerable || []), ...(faqMap.unresolved || [])]
    ).map((entry: Any) => ({
      ...entry,
      page: entry.pageId ? pageById.get(entry.pageId) : null,
    }))

    const glossaryTerms: GlossaryTerm[] = (glossary.terms || []).map((term: Any) => ({
      ...term,
      pages: (term.pageIds || []).map((id: string) => pageById.get(id)).filter(Boolean),
      primaryPage: pageById.get(term.primaryPageId || (term.pageIds || [])[0]),
    }))

    return {
      authored,
      authoredPages,
      pageStateRegistry,
      faqMap,
      allSearchablePages,
      publicSearchablePages,
      publicAuthoredPages,
      pageById,
      answerChunks,
      seededQuestionRoutes,
      faqEntries,
      glossaryTerms,
      crosslinkByPageId: crosslinks.pageById || {},
      isPublicNavigationPage,
    }
  })
  return dataPromise
}

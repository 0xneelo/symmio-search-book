/**
 * Single app state (DESIGN.MD §8: one `page` value drives sidebar, top-bar
 * indicator, and the visible pshell) + the ask/answer flow.
 * URL behavior ports index.html: ?variant= (L2513–2531), ?page= (L3826–3847),
 * handleAsk (L3148), example refresh (L2675), keyboard cycling (L4151).
 */
import { useCallback, useEffect, useRef, useState } from 'react'
import { loadCorpusData, type CorpusData } from '@/data/loader'
import { findAnswer } from '@/lib/search'
import {
  markServiceOffline,
  recordQuestion,
  refreshServiceExamples,
  refreshServiceInsights,
  serviceAsk,
  serviceEnabled,
} from '@/lib/service'
import type { AnswerResult, ServiceAnswerResponse } from '@/data/types'
import { isVariantKey, SECTIONS } from './sections'

export interface AnswerState {
  result: AnswerResult
  query: string
  eventId: string
  /** True while the service round-trip is in flight. */
  loading?: boolean
}

/** L2493 — curated example questions (seeded reconciliation happens against routes). */
export const FALLBACK_EXAMPLES = [
  'When do referral points credit?',
  'How is my revenue calculated?',
  'Why is my live counter not moving?',
  'How do I get more invites?',
]

function readVariant(): string {
  const v = new URLSearchParams(window.location.search).get('variant')
  return isVariantKey(v) ? (v as string) : 'classic'
}

function readActivePageId(): string | null {
  return new URLSearchParams(window.location.search).get('page')
}

export function useSearchBook() {
  const [data, setData] = useState<CorpusData | null>(null)
  const [variant, setVariantState] = useState(readVariant)
  const [activePageId, setActivePageId] = useState(readActivePageId)
  const [query, setQuery] = useState('')
  const [activeField, setActiveField] = useState<string | null>(null)
  const [answer, setAnswer] = useState<AnswerState | null>(null)
  const [examples, setExamples] = useState<string[]>(FALLBACK_EXAMPLES)
  const [insightsVersion, setInsightsVersion] = useState(0)
  const dataRef = useRef<CorpusData | null>(null)

  const bumpInsights = useCallback(() => setInsightsVersion((v) => v + 1), [])

  // Boot: corpus data, seeded examples, service insights + dynamic examples (init(), L4025).
  useEffect(() => {
    let alive = true
    loadCorpusData().then((loaded) => {
      if (!alive) return
      dataRef.current = loaded
      setData(loaded)
      const seeded = FALLBACK_EXAMPLES.map(
        (q) => loaded.seededQuestionRoutes.find((route) => route.question === q)?.question || q,
      )
        .filter(Boolean)
        .slice(0, 4)
      const curated = seeded.length ? seeded : FALLBACK_EXAMPLES
      setExamples(curated)
      if (serviceEnabled()) {
        refreshServiceInsights().then(() => {
          if (!alive) return
          bumpInsights()
          refreshServiceExamples(curated).then((next) => alive && setExamples(next))
        })
      }
    })
    return () => {
      alive = false
    }
  }, [bumpInsights])

  const setVariant = useCallback((next: string) => {
    const url = new URL(window.location.href)
    url.searchParams.set('variant', next)
    url.searchParams.delete('page')
    window.history.replaceState({}, '', url)
    setVariantState(next)
    setActivePageId(null)
  }, [])

  const cycleVariant = useCallback(
    (direction: number) => {
      const current = readActivePageId() ? 'classic' : readVariant()
      const index = SECTIONS.findIndex((item) => item.key === current)
      const next = SECTIONS[(index + direction + SECTIONS.length) % SECTIONS.length].key
      setVariant(next)
    },
    [setVariant],
  )

  const setActivePage = useCallback((pageId: string) => {
    const url = new URL(window.location.href)
    url.searchParams.set('page', pageId)
    url.searchParams.delete('variant')
    window.history.replaceState({}, '', url)
    setActivePageId(pageId)
  }, [])

  const clearActivePage = useCallback(
    (nextVariant = 'classic') => {
      setVariant(nextVariant)
    },
    [setVariant],
  )

  /** handleAsk (L3148): service first, local ranking fallback. */
  const handleAsk = useCallback(
    async (rawQuery: string, source = 'ask') => {
      const q = rawQuery.trim()
      if (!q) return
      const corpusData = dataRef.current
      setVariantState((v) => {
        // Answers render on the cover (comp §8); jump there if elsewhere.
        if (v !== 'classic' || readActivePageId()) {
          const url = new URL(window.location.href)
          url.searchParams.set('variant', 'classic')
          url.searchParams.delete('page')
          window.history.replaceState({}, '', url)
          setActivePageId(null)
        }
        return 'classic'
      })
      if (serviceEnabled()) {
        setAnswer({ result: { page: null, score: 'service' }, query: q, eventId: '', loading: true })
        try {
          const response: ServiceAnswerResponse = await serviceAsk(q, source)
          await refreshServiceInsights()
          const eventId = response.persisted?.id || response.requestId || ''
          const page =
            corpusData?.pageById.get(response.primaryPageId || '') ||
            (response.citations || [])
              .map((c) => corpusData?.pageById.get(c.pageId || ''))
              .find(Boolean) ||
            null
          setAnswer({
            result: {
              page,
              score: `service:${response.confidence || response.status || 'unknown'}`,
              serviceResponse: response,
            },
            query: q,
            eventId,
          })
          bumpInsights()
          return
        } catch (error) {
          markServiceOffline(error, 'Could not reach answer-engine service.')
        }
      }
      if (!corpusData) return
      const result = findAnswer(corpusData, q)
      const event = recordQuestion(q, result, source)
      setAnswer({ result, query: q, eventId: event.id })
      bumpInsights()
    },
    [bumpInsights],
  )

  const dismissAnswer = useCallback(() => setAnswer(null), [])

  // Keyboard: Escape handled by rail/modal owners; arrows cycle unless typing (L4151).
  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      const tag = document.activeElement?.tagName
      if (tag === 'INPUT' || tag === 'TEXTAREA') return
      if (event.key === 'ArrowLeft') cycleVariant(-1)
      if (event.key === 'ArrowRight') cycleVariant(1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [cycleVariant])

  return {
    data,
    variant,
    activePageId,
    setVariant,
    cycleVariant,
    setActivePage,
    clearActivePage,
    query,
    setQuery,
    activeField,
    setActiveField,
    answer,
    setAnswer,
    handleAsk,
    dismissAnswer,
    examples,
    insightsVersion,
    bumpInsights,
  }
}

export type SearchBookApp = ReturnType<typeof useSearchBook>

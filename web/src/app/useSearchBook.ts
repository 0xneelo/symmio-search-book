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
import { isPublicVariantKey, isVariantKey, PUBLIC_SECTIONS, SECTIONS } from './sections'

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

/** SYN-362: the ops views live behind ?admin=1 (+ server-verified token). */
export function readAdminArea(): boolean {
  return new URLSearchParams(window.location.search).get('admin') === '1'
}

function readVariant(): string {
  const v = new URLSearchParams(window.location.search).get('variant')
  if (!isVariantKey(v)) return 'classic'
  // SYN-362: admin-only variants are unreachable on public URLs — redirect to
  // the cover (the URL is cleaned so reloads stay on the cover too).
  if (!readAdminArea() && !isPublicVariantKey(v)) {
    const url = new URL(window.location.href)
    url.searchParams.delete('variant')
    window.history.replaceState({}, '', url)
    return 'classic'
  }
  return v as string
}

function readActivePageId(): string | null {
  // ?page=<id> (old deep-link parity, L3826) or the SSG route /page/<id>/.
  const fromQuery = new URLSearchParams(window.location.search).get('page')
  if (fromQuery) return fromQuery
  const match = window.location.pathname.match(/\/page\/([^/]+)\/?$/)
  return match ? decodeURIComponent(match[1]) : null
}

/**
 * Symmiopedia special pages: ?search=<q> results, ?ask=<q> reference desk
 * (SYN-370), ?special=privacy|about|disclaimers site pages, and the
 * admin-gated ?source=<pageId> indexed-route viewer (favorites QA round).
 */
export type SpecialKind = 'search' | 'ask' | 'privacy' | 'about' | 'disclaimers' | 'source'

export interface SpecialRoute {
  kind: SpecialKind
  /** Search/ask query, or the pageId for kind 'source'; '' for site pages. */
  query: string
}

const SITE_PAGE_KINDS = new Set(['privacy', 'about', 'disclaimers'])
const SPECIAL_PARAMS = ['search', 'ask', 'special', 'source'] as const

function readSpecial(): SpecialRoute | null {
  const params = new URLSearchParams(window.location.search)
  const search = params.get('search')
  if (search !== null) return { kind: 'search', query: search }
  const ask = params.get('ask')
  if (ask !== null) return { kind: 'ask', query: ask }
  const site = params.get('special')
  if (site && SITE_PAGE_KINDS.has(site)) return { kind: site as SpecialKind, query: '' }
  const source = params.get('source')
  if (source) return { kind: 'source', query: source }
  return null
}

export function useSearchBook() {
  const [data, setData] = useState<CorpusData | null>(null)
  const [variant, setVariantState] = useState(readVariant)
  const [activePageId, setActivePageId] = useState(readActivePageId)
  const [special, setSpecialState] = useState(readSpecial)
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
    for (const param of SPECIAL_PARAMS) url.searchParams.delete(param)
    window.history.replaceState({}, '', url)
    setVariantState(next)
    setActivePageId(null)
    setSpecialState(null)
  }, [])

  /** Navigate to a special page: ?search/?ask (query), ?special (site page), ?source (pageId). */
  const setSpecial = useCallback((kind: SpecialKind, query: string) => {
    const url = new URL(window.location.href)
    if (/\/page\/[^/]+\/?$/.test(url.pathname)) {
      url.pathname = url.pathname.replace(/page\/[^/]+\/?$/, '')
    }
    url.searchParams.delete('page')
    url.searchParams.delete('variant')
    for (const param of SPECIAL_PARAMS) url.searchParams.delete(param)
    if (kind === 'search' || kind === 'ask' || kind === 'source') url.searchParams.set(kind, query)
    else url.searchParams.set('special', kind)
    window.history.replaceState({}, '', url)
    setSpecialState({ kind, query })
    setActivePageId(null)
  }, [])

  const cycleVariant = useCallback(
    (direction: number) => {
      // SYN-362: cycling is scoped to the reachable section list.
      const list = readAdminArea() ? SECTIONS : PUBLIC_SECTIONS
      if (list.length < 2) return
      const current = readActivePageId() ? 'classic' : readVariant()
      const index = list.findIndex((item) => item.key === current)
      const next = list[(index + direction + list.length) % list.length].key
      setVariant(next)
    },
    [setVariant],
  )

  const setActivePage = useCallback((pageId: string) => {
    const url = new URL(window.location.href)
    // In-app nav keeps ?page= (old URL parity); prerendered /page/<id>/ paths
    // collapse back to the SPA root so query state stays consistent.
    if (/\/page\/[^/]+\/?$/.test(url.pathname)) {
      url.pathname = url.pathname.replace(/page\/[^/]+\/?$/, '')
    }
    url.searchParams.set('page', pageId)
    url.searchParams.delete('variant')
    for (const param of SPECIAL_PARAMS) url.searchParams.delete(param)
    window.history.replaceState({}, '', url)
    setActivePageId(pageId)
    setSpecialState(null)
  }, [])

  const clearActivePage = useCallback(
    (nextVariant = 'classic') => {
      const url = new URL(window.location.href)
      if (/\/page\/[^/]+\/?$/.test(url.pathname)) {
        url.pathname = url.pathname.replace(/page\/[^/]+\/?$/, '')
        window.history.replaceState({}, '', url)
      }
      setVariant(nextVariant)
    },
    [setVariant],
  )

  /** openPageFromCorpus (L4012): direct question event, answer echo unless nav. */
  const openPage = useCallback(
    (pageId: string, source = 'browse') => {
      const corpusData = dataRef.current
      const page = corpusData?.pageById.get(pageId)
      if (!page) return
      const event = recordQuestion(page.title, { page, score: 'direct' }, source)
      if (source === 'nav') {
        setAnswer(null)
      } else {
        setAnswer({ result: { page, score: 'direct' }, query: page.title, eventId: event.id })
      }
      setActivePage(pageId)
      bumpInsights()
    },
    [setActivePage, bumpInsights],
  )

  /** handleAsk (L3148): service first, local ranking fallback. */
  const handleAsk = useCallback(
    async (rawQuery: string, source = 'ask') => {
      const q = rawQuery.trim()
      if (!q) return
      const corpusData = dataRef.current
      // SYN-370: on the public Ask special page the answer renders in place —
      // only the (admin) cover flow still jumps to the classic variant.
      if (readSpecial()?.kind !== 'ask') {
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
      }
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
    special,
    setSpecial,
    setVariant,
    cycleVariant,
    setActivePage,
    clearActivePage,
    openPage,
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

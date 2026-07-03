/**
 * Answer-engine service layer + localStorage fallback.
 * Ported 1:1 from index.html L2481–2695, L3118–3179, L3747–3891.
 * The /api/search-book/* contract is frozen — do not change paths or payloads.
 */
import { loadList, saveList, storageKeys } from './storage'
import type {
  AnswerResult,
  EventLists,
  GapEvent,
  QuestionEvent,
  RatingEvent,
  ServiceAnswerResponse,
} from '@/data/types'

/* eslint-disable @typescript-eslint/no-explicit-any */
type Any = any

function readServiceConfig() {
  const params = new URLSearchParams(window.location.search)
  const configuredServiceUrl = params.get('service') || window.SEARCH_BOOK_ANSWER_ENGINE_URL || ''
  const configuredServiceMode = params.get('serviceMode') || ''
  if (params.has('service')) localStorage.setItem(storageKeys.serviceUrl, configuredServiceUrl)
  if (params.has('serviceMode')) localStorage.setItem(storageKeys.serviceMode, configuredServiceMode)
  return {
    url: (configuredServiceUrl || localStorage.getItem(storageKeys.serviceUrl) || '').replace(/\/+$/u, ''),
    mode: configuredServiceMode || localStorage.getItem(storageKeys.serviceMode) || 'llm',
  }
}

export interface ServiceState {
  url: string
  mode: string
  insights: Any | null
  online: boolean
  lastError: string
}

export const serviceState: ServiceState = {
  ...readServiceConfig(),
  insights: null,
  online: false,
  lastError: '',
}

export function serviceEnabled(): boolean {
  return Boolean(serviceState.url && window.fetch)
}

export async function serviceRequest(path: string, options: RequestInit = {}): Promise<Any> {
  const response = await fetch(`${serviceState.url}${path}`, {
    ...options,
    headers: {
      'content-type': 'application/json',
      ...((options.headers as Record<string, string>) || {}),
    },
  })
  const payload = await response.json().catch(() => ({}))
  if (!response.ok) {
    throw new Error(payload.message || `Search Book service returned HTTP ${response.status}`)
  }
  return payload
}

/** L2564 — service question row → event shape. */
function mapServiceQuestion(item: Any): QuestionEvent {
  return {
    id: item.id,
    query: item.query,
    source: item.source,
    pageId: item.pageId || null,
    page: item.pageTitle || (item.status === 'answered' ? item.pageId : 'No grounded page'),
    score: item.confidence || item.mode || item.status,
    status: item.status || 'unknown',
    time: item.createdAt,
    requestId: item.requestId,
    refusalReason: item.refusalReason,
    gapId: item.gapId,
    operatorItemIds: item.operatorItemIds || [],
  }
}

function serviceEventLists(): EventLists {
  const recent = serviceState.insights?.recent || {}
  return {
    questions: (recent.questions || []).map(mapServiceQuestion),
    ratings: (recent.ratings || []).map(
      (item: Any): RatingEvent => ({
        id: item.id,
        rating: item.rating,
        query: item.query,
        page: item.pageTitle || 'No grounded page',
        pageId: item.pageId || null,
        eventId: item.eventId,
        time: item.createdAt,
        note: item.note,
      }),
    ),
    gaps: (recent.gaps || []).map(
      (item: Any): GapEvent => ({
        id: item.id,
        query: item.query,
        reason: item.reason,
        page: item.pageTitle || 'No grounded page',
        pageId: item.pageId || null,
        time: item.createdAt,
        eventId: item.eventId,
        gapId: item.gapId,
        operatorItemIds: item.operatorItemIds || [],
      }),
    ),
  }
}

export function localEventLists(): EventLists {
  return {
    questions: loadList<QuestionEvent>(storageKeys.questions),
    ratings: loadList<RatingEvent>(storageKeys.ratings),
    gaps: loadList<GapEvent>(storageKeys.gaps),
  }
}

/** L2617 — dedupe by id||eventId; primary (service) wins. */
export function mergeEvents<T extends { id?: string; eventId?: string }>(primary: T[], fallback: T[]): T[] {
  const seen = new Set(primary.map((item) => item.id || item.eventId))
  return [...primary, ...fallback.filter((item) => !seen.has(item.id || item.eventId))]
}

export function currentEventLists(): EventLists {
  if (!serviceState.insights) return localEventLists()
  const service = serviceEventLists()
  const local = localEventLists()
  return {
    questions: mergeEvents(service.questions, local.questions),
    ratings: mergeEvents(service.ratings, local.ratings),
    gaps: mergeEvents(service.gaps, local.gaps),
  }
}

export function findQuestionEvent(eventId: string): QuestionEvent | null {
  const current = currentEventLists().questions.find((item) => item.id === eventId)
  if (current) return current
  return loadList<QuestionEvent>(storageKeys.questions).find((item) => item.id === eventId) || null
}

/** L2639 — the four service-status copy states. */
export function serviceStatusText(): string {
  if (!serviceEnabled()) return 'Stored in this browser for the prototype.'
  if (serviceState.online) return `Service connected: ${serviceState.url}`
  return serviceState.lastError
    ? `Service unavailable; using local fallback. ${serviceState.lastError}`
    : `Service configured: ${serviceState.url}`
}

export async function refreshServiceInsights(): Promise<Any | null> {
  if (!serviceEnabled()) return null
  try {
    const insights = await serviceRequest('/api/search-book/insights')
    serviceState.insights = insights
    serviceState.online = true
    serviceState.lastError = ''
    return insights
  } catch (error: Any) {
    serviceState.online = false
    serviceState.lastError = error.message || 'Could not reach answer-engine service.'
    return null
  }
}

/** L2675 — dynamic examples only replace curated when count is sufficient. */
export async function refreshServiceExamples(curated: string[]): Promise<string[]> {
  if (!serviceEnabled()) return [...curated]
  try {
    const payload = await serviceRequest('/api/search-book/examples')
    const dynamic = (payload.examples || [])
      .map((item: Any) => item.query)
      .filter(Boolean)
      .slice(0, curated.length)
    return dynamic.length >= curated.length ? dynamic : [...curated]
  } catch {
    return [...curated]
  }
}

export function recordGap(gap: GapEvent): void {
  const gaps = loadList<GapEvent>(storageKeys.gaps)
  saveList(storageKeys.gaps, [gap, ...gaps])
}

/** L3123 — local question event (+ gap when ungrounded). */
export function recordQuestion(query: string, result: AnswerResult, source = 'ask'): QuestionEvent {
  const event: QuestionEvent = {
    id: `q-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    query,
    source,
    pageId: result.page ? result.page.id : null,
    page: result.page ? result.page.title : 'No grounded page',
    score: result.score,
    status: result.page ? 'answered' : 'gap',
    time: new Date().toISOString(),
  }
  const recent = loadList<QuestionEvent>(storageKeys.questions)
  saveList(storageKeys.questions, [event, ...recent])
  if (!result.page) {
    recordGap({
      id: event.id,
      query,
      reason: 'no-grounded-page',
      page: event.page,
      time: event.time,
    })
  }
  return event
}

/** POST /api/search-book/answer — mode forwarded when extractive|llm (L3158). */
export async function serviceAsk(query: string, source: string): Promise<ServiceAnswerResponse> {
  const payload: Any = { query, source }
  if (serviceState.mode === 'extractive' || serviceState.mode === 'llm') payload.mode = serviceState.mode
  return serviceRequest('/api/search-book/answer', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function markServiceOffline(error: unknown, fallbackMessage: string): void {
  serviceState.online = false
  serviceState.lastError = (error as Error)?.message || fallbackMessage
}

export function clearEventLog(): string {
  localStorage.removeItem(storageKeys.questions)
  localStorage.removeItem(storageKeys.ratings)
  localStorage.removeItem(storageKeys.gaps)
  return serviceState.insights
    ? 'Cleared local fallback only; service data remains on the server.'
    : 'Cleared local event log.'
}

export function exportEventLogPayload(): string {
  const events = currentEventLists()
  return JSON.stringify(
    {
      source: serviceState.insights ? 'service-plus-localStorage-fallback' : 'localStorage',
      questions: events.questions,
      ratings: events.ratings,
      gaps: events.gaps,
    },
    null,
    2,
  )
}

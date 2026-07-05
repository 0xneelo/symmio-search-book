/**
 * Voting persistence — the M5 fix (SYN-352).
 *
 * Old bug, two halves:
 *  1. No visual reaction on vote (fixed by RatingButtons optimistic UI).
 *  2. Silent 404: the old recordRating (index.html L3747) POSTed /rating with
 *     whatever `data-event` carried — including local `q-<ts>-…` ids from
 *     fallback asks that the service never persisted. persistRating requires a
 *     persisted question id (serve-answer-engine.mjs:443) and threw 404, which
 *     the catch quietly swallowed.
 *
 * Fix: only POST /rating for answers the service itself persisted (the
 * response's persisted.id); local-fallback answers record locally, where they
 * belong. Service failures now surface to the UI (revert + inline error)
 * instead of ghost-logging.
 */
import { loadList, saveList, storageKeys } from './storage'
import {
  recordGap,
  refreshServiceExamples,
  refreshServiceInsights,
  serviceEnabled,
  serviceRequest,
} from './service'
import type { Page, RatingEvent } from '@/data/types'

export type VoteValue = 'yes' | 'no'

export interface VoteOutcome {
  persistedTo: 'service' | 'local'
}

function storeLocalRating(rating: RatingEvent, gapReason: string | null): void {
  const ratings = loadList<RatingEvent>(storageKeys.ratings)
  saveList(storageKeys.ratings, [rating, ...ratings])
  if (gapReason) {
    recordGap({
      id: rating.eventId,
      query: rating.query,
      reason: gapReason,
      page: rating.page,
      time: rating.time,
    })
  }
}

/** Answer rating (old data-rate path). Throws on service failure so the UI can revert. */
export async function recordAnswerRating(options: {
  eventId: string
  rating: VoteValue
  /** True when the answer came from the service (its eventId is persisted.id). */
  isServiceAnswer: boolean
  query: string
  pageTitle: string
  pageId: string | null
  curatedExamples: string[]
}): Promise<VoteOutcome> {
  const { eventId, rating, isServiceAnswer, query, pageTitle, pageId, curatedExamples } = options
  if (serviceEnabled() && isServiceAnswer && eventId) {
    await serviceRequest('/api/search-book/rating', {
      method: 'POST',
      body: JSON.stringify({ eventId, rating }),
    })
    await refreshServiceInsights()
    await refreshServiceExamples(curatedExamples)
    return { persistedTo: 'service' }
  }
  const row: RatingEvent = {
    rating,
    query: query || 'Unknown query',
    page: pageTitle || 'Unknown page',
    pageId,
    eventId,
    time: new Date().toISOString(),
  }
  storeLocalRating(row, rating === 'no' ? 'low-rated-answer' : null)
  return { persistedTo: 'local' }
}

/** Page rating (old data-page-rate path, index.html L3849). */
export async function recordPageRating(options: {
  page: Page
  rating: VoteValue
}): Promise<VoteOutcome> {
  const { page, rating } = options
  const query = `Page feedback: ${page.title}`
  if (serviceEnabled()) {
    await serviceRequest('/api/search-book/page-feedback', {
      method: 'POST',
      body: JSON.stringify({ pageId: page.id, rating, query }),
    })
    await refreshServiceInsights()
    return { persistedTo: 'service' }
  }
  const row: RatingEvent = {
    rating,
    query,
    page: page.title,
    pageId: page.id,
    eventId: `page-${Date.now()}-${Math.random().toString(16).slice(2, 8)}`,
    time: new Date().toISOString(),
  }
  storeLocalRating(row, rating === 'no' ? 'page-feedback-needs-work' : null)
  return { persistedTo: 'local' }
}

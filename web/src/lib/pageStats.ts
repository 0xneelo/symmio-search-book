/**
 * Page stars + useful-vote counts. Service-backed via /api/search-book/page-star
 * and /page-stats (SQLite counters); without a service the numbers degrade to
 * this browser's own contributions, matching the lib/voting fallback contract.
 * Whether *this* browser starred a page always lives in localStorage — there
 * are no accounts, so the server only keeps the global tallies.
 */
import { loadList, saveList, storageKeys } from './storage'
import { serviceEnabled, serviceRequest } from './service'
import type { RatingEvent } from '@/data/types'

export interface PageUsefulCounts {
  yes: number
  no: number
}

export interface PageStats {
  stars: number
  useful: PageUsefulCounts
}

export function isPageStarred(pageId: string): boolean {
  return loadList<string>(storageKeys.starredPages).includes(pageId)
}

function saveStarred(pageId: string, starred: boolean): void {
  const others = loadList<string>(storageKeys.starredPages).filter((id) => id !== pageId)
  saveList(storageKeys.starredPages, starred ? [pageId, ...others] : others)
}

/** Local fallback: this browser's own page-feedback rows (stored by lib/voting). */
function localUsefulCounts(pageId: string): PageUsefulCounts {
  const useful: PageUsefulCounts = { yes: 0, no: 0 }
  for (const row of loadList<RatingEvent>(storageKeys.ratings)) {
    if (row.pageId !== pageId || !row.query?.startsWith('Page feedback:')) continue
    if (row.rating === 'yes' || row.rating === 'useful') useful.yes += 1
    else useful.no += 1
  }
  return useful
}

export async function fetchPageStats(pageId: string): Promise<PageStats> {
  if (serviceEnabled()) {
    try {
      const payload = await serviceRequest(
        `/api/search-book/page-stats?pageId=${encodeURIComponent(pageId)}`,
      )
      return {
        stars: Number(payload.stars) || 0,
        useful: {
          yes: Number(payload.useful?.yes) || 0,
          no: Number(payload.useful?.no) || 0,
        },
      }
    } catch {
      // Service unreachable — fall through to the local view below.
    }
  }
  return { stars: isPageStarred(pageId) ? 1 : 0, useful: localUsefulCounts(pageId) }
}

/**
 * Toggle this browser's star. Returns the new global count (service) or the
 * local 0/1. On service failure the local star is reverted and the error
 * rethrown so the UI can roll back.
 */
export async function setPageStarred(pageId: string, starred: boolean): Promise<number> {
  saveStarred(pageId, starred)
  if (!serviceEnabled()) return starred ? 1 : 0
  try {
    const payload = await serviceRequest('/api/search-book/page-star', {
      method: 'POST',
      body: JSON.stringify({ pageId, starred }),
    })
    return Number(payload.stars) || 0
  } catch (error) {
    saveStarred(pageId, !starred)
    throw error
  }
}

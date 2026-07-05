import { useCallback, useEffect, useRef, useState } from 'react'
import { fetchPageStats, isPageStarred, setPageStarred, type PageStats } from '@/lib/pageStats'

/**
 * Per-page star + useful-count state for the reader: loads the tallies on page
 * change, toggles the star optimistically (revert on service failure), and
 * refreshes after a successful useful-vote so the Yes/No counts stay honest.
 */
export function usePageStats(pageId: string | null) {
  const [stats, setStats] = useState<PageStats | null>(null)
  const [starred, setStarred] = useState(() => (pageId ? isPageStarred(pageId) : false))
  const starBusy = useRef(false)

  useEffect(() => {
    if (!pageId) return
    let alive = true
    setStats(null)
    setStarred(isPageStarred(pageId))
    fetchPageStats(pageId).then((next) => {
      if (alive) setStats(next)
    })
    return () => {
      alive = false
    }
  }, [pageId])

  const toggleStar = useCallback(() => {
    if (!pageId || starBusy.current) return
    starBusy.current = true
    const next = !starred
    setStarred(next)
    setStats((s) => (s ? { ...s, stars: Math.max(0, s.stars + (next ? 1 : -1)) } : s))
    setPageStarred(pageId, next)
      .then((stars) => setStats((s) => (s ? { ...s, stars } : s)))
      .catch(() => {
        setStarred(!next)
        setStats((s) => (s ? { ...s, stars: Math.max(0, s.stars + (next ? -1 : 1)) } : s))
      })
      .finally(() => {
        starBusy.current = false
      })
  }, [pageId, starred])

  const refresh = useCallback(() => {
    if (!pageId) return
    fetchPageStats(pageId).then(setStats)
  }, [pageId])

  return { stats, starred, toggleStar, refresh }
}

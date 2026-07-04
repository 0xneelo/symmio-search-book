/**
 * Symmiopedia portal main page (SYN-368, DESIGN.MD Part B §4 "Portal").
 *
 * The public `/` — comp Screen 1: globe 228 → SYMMIOPEDIA wordmark → tagline →
 * search bar → hint lines, nothing else, centered on pure white. Replaces the
 * v2 cover as the public landing (the cover stays for the admin surface).
 *
 * Search Enter/button resolves through the app's existing local ranking
 * (findAnswer) and opens the best-match article; the Search-results special
 * page takes over the no-match/low-confidence path in M4 (SYN-370).
 */
import { useState } from 'react'
import type { FormEvent } from 'react'
import { findAnswer } from '@/lib/search'
import { recordQuestion } from '@/lib/service'
import { PuzzleGlobe, PuzzleGlobeDefs } from '@/components/wiki/PuzzleGlobe'
import type { SearchBookApp } from '../useSearchBook'

/** Deterministic featured article for the hint line (comp: "Symmio ecosystem"). */
const FEATURED_PAGE_ID = 'authored-ecosystem-synergy-map'
const ASK_HINT = 'How do I get more invites?'

export function PortalView({ app }: { app: SearchBookApp }) {
  const [query, setQuery] = useState('')
  const [missMessage, setMissMessage] = useState<string | null>(null)

  const featured = app.data?.pageById.get(FEATURED_PAGE_ID) || null

  const resolve = (rawQuery: string, source: string) => {
    const q = rawQuery.trim()
    if (!q || !app.data) return
    const result = findAnswer(app.data, q)
    recordQuestion(q, result, source)
    app.bumpInsights()
    if (result.page) {
      setMissMessage(null)
      app.setAnswer(null)
      app.setActivePage(result.page.id)
    } else {
      // Until the Search-results special page lands (SYN-370), a query with no
      // grounded route stays on the portal with a wiki-register notice.
      setMissMessage(q)
    }
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault()
    resolve(query, 'portal')
  }

  return (
    <div
      className="wiki"
      style={{
        minHeight: '100vh',
        background: 'var(--wk-content)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 16px',
      }}
    >
      <PuzzleGlobeDefs />

      <PuzzleGlobe size={228} alt="Symmiopedia puzzle globe" />

      <div
        style={{
          fontFamily: 'var(--wk-serif)',
          fontSize: 36,
          letterSpacing: 4,
          color: 'var(--wk-text)',
          marginTop: 28,
        }}
      >
        SYMMIOPEDIA
      </div>
      <div style={{ fontSize: 14, color: 'var(--wk-text)', marginTop: 8 }}>
        The Open Ecosystem Encyclopedia
      </div>

      <form
        onSubmit={onSubmit}
        role="search"
        style={{ display: 'flex', width: 'min(480px, 92vw)', marginTop: 36 }}
      >
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search Symmiopedia — or ask a question"
          aria-label="Search Symmiopedia"
          className="wk-r2"
          style={{
            flex: 1,
            height: 46,
            border: '1px solid var(--wk-rule)',
            borderRight: 'none',
            borderRadius: '2px 0 0 2px',
            padding: '0 12px',
            fontSize: 16,
            fontFamily: 'var(--wk-sans)',
            color: 'var(--wk-text)',
            background: 'var(--wk-content)',
            outline: 'none',
          }}
        />
        <button
          type="submit"
          aria-label="Search"
          className="wk-portal-searchbtn"
          style={{
            width: 52,
            height: 46,
            border: '1px solid var(--wk-rule)',
            background: 'var(--wk-box-fill)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true">
            <circle cx="6.5" cy="6.5" r="4.5" fill="none" stroke="#54595d" strokeWidth="1.8" />
            <line x1="10" y1="10" x2="14.5" y2="14.5" stroke="#54595d" strokeWidth="1.8" />
          </svg>
        </button>
      </form>

      {missMessage && (
        <div style={{ fontSize: 12, marginTop: 14 }} className="wk-muted" role="status">
          No article matches &quot;{missMessage}&quot; yet — the gap is recorded.
        </div>
      )}

      <div style={{ fontSize: 12, marginTop: missMessage ? 14 : 36, color: 'var(--wk-text)' }}>
        {featured ? (
          <>
            Try{' '}
            <a
              href={`?page=${featured.id}`}
              onClick={(event) => {
                event.preventDefault()
                app.openPage(featured.id, 'nav')
              }}
            >
              &quot;{featured.title}&quot;
            </a>{' '}
            — today&apos;s featured article
          </>
        ) : (
          <>&nbsp;</>
        )}
      </div>
      <div style={{ fontSize: 12, marginTop: 10, color: 'var(--wk-text)' }}>
        or ask the wiki:{' '}
        <a
          href="#ask"
          onClick={(event) => {
            event.preventDefault()
            setQuery(ASK_HINT)
            resolve(ASK_HINT, 'example')
          }}
        >
          &quot;{ASK_HINT}&quot;
        </a>
      </div>
    </div>
  )
}

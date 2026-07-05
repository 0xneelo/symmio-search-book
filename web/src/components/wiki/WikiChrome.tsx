/**
 * Symmiopedia article chrome (SYN-369, DESIGN.MD Part B §4 "Article"):
 * grid 172px | 1fr — logo cell, personal bar + tab row on the #a7d7f9 line,
 * sidebar link boxes, white content column, gray footer. Constant across all
 * article pages; only the content column varies.
 *
 * SSR-safe: interactivity arrives via optional handler props; without them
 * links carry real hrefs (SSG) and dead chrome renders as inert anchors —
 * never href="#" (Part A: no # jumps).
 */
import { useState } from 'react'
import type { FormEvent, ReactNode } from 'react'
import { WikiMark } from './WikiMark'
import { formatWikiDate } from '@/lib/wiki'

/** Footer site pages (privacy / about / disclaimers). */
export type SitePageKind = 'privacy' | 'about' | 'disclaimers'

export interface WikiChromeProps {
  children: ReactNode
  /** Ecosystem sidebar box — protocols that resolve to real corpus pages. */
  ecosystem?: Array<{ label: string; pageId: string }>
  featured?: { id: string; title: string } | null
  /** Real page updated date for the footer line; omit → line omitted. */
  updated?: Date | null
  /** "Indexed route" tool — routes to the admin-gated source page in-app. */
  sourceRoute?: { href: string; onOpen?: () => void }
  /** Star tab: global favorite count + this browser's toggle; omit → inert ☆. */
  star?: { starred: boolean; count: number | null; onToggle: () => void }
  hrefFor?: (pageId: string) => string
  onNavigatePage?: (pageId: string) => void
  onMainPage?: () => void
  onSearch?: (query: string) => void
  onRandom?: () => void
  onSitePage?: (kind: SitePageKind) => void
}

function DeadLink({ children }: { children: ReactNode }) {
  return (
    <a role="button" tabIndex={0} onClick={(e) => e.preventDefault()}>
      {children}
    </a>
  )
}

export function WikiChrome({
  children,
  ecosystem = [],
  featured = null,
  updated = null,
  sourceRoute,
  star,
  hrefFor = (pageId) => `?page=${pageId}`,
  onNavigatePage,
  onMainPage,
  onSearch,
  onRandom,
  onSitePage,
}: WikiChromeProps) {
  const [query, setQuery] = useState('')

  const sitePageLink = (kind: SitePageKind, label: string) => (
    <a
      href={`/?special=${kind}`}
      onClick={
        onSitePage
          ? (event) => {
              event.preventDefault()
              onSitePage(kind)
            }
          : undefined
      }
    >
      {label}
    </a>
  )

  const pageLink = (pageId: string, label: ReactNode) => (
    <a
      href={hrefFor(pageId)}
      onClick={
        onNavigatePage
          ? (event) => {
              event.preventDefault()
              onNavigatePage(pageId)
            }
          : undefined
      }
    >
      {label}
    </a>
  )

  const submitSearch = (event: FormEvent) => {
    event.preventDefault()
    if (onSearch && query.trim()) onSearch(query.trim())
  }

  return (
    <div className="wiki wk-page">
      <a
        className="wk-logo-cell"
        href="/"
        onClick={
          onMainPage
            ? (event) => {
                event.preventDefault()
                onMainPage()
              }
            : undefined
        }
      >
        <WikiMark slot="navbar" size={118} />
        <div className="wk-logo-wordmark">SYMMIOPEDIA</div>
        <div className="wk-logo-tagline">The Open Ecosystem Encyclopedia</div>
      </a>

      <div className="wk-header">
        <div className="wk-personal">
          Not logged in ·{' '}
          <span className="wk-personal-soon" title="Coming soon">
            Create account
          </span>{' '}
          ·{' '}
          <span className="wk-personal-soon" title="Coming soon">
            Log in
          </span>{' '}
          <span className="wk-personal-note">(coming soon)</span>
        </div>
        <div className="wk-tabrow">
          <div className="wk-tabs">
            <a className="wk-tab wk-tab-selected" role="button" tabIndex={0} onClick={(e) => e.preventDefault()}>
              Article
            </a>
            <DeadLinkTab>Talk</DeadLinkTab>
          </div>
          <div className="wk-tabrow-right">
            <div className="wk-tabs">
              <a className="wk-tab wk-tab-selected" role="button" tabIndex={0} onClick={(e) => e.preventDefault()}>
                Read
              </a>
              {star ? (
                <a
                  className="wk-tab wk-tab-star"
                  role="button"
                  tabIndex={0}
                  aria-pressed={star.starred}
                  aria-label={star.starred ? 'Unstar this page' : 'Star this page'}
                  title={star.starred ? 'Remove this page from your favorites' : 'Add this page to your favorites'}
                  onClick={(event) => {
                    event.preventDefault()
                    star.onToggle()
                  }}
                >
                  <span aria-hidden="true">{star.starred ? '★' : '☆'}</span>
                  {star.count !== null && <span className="wk-star-count">{star.count}</span>}
                </a>
              ) : (
                <DeadLinkTab>☆</DeadLinkTab>
              )}
            </div>
            <form className="wk-head-search" role="search" onSubmit={submitSearch}>
              <input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search or ask a question"
                aria-label="Search Symmiopedia"
              />
              <button type="submit" aria-label="Search">
                <svg viewBox="0 0 16 16" width="13" height="13" aria-hidden="true">
                  <circle cx="6.5" cy="6.5" r="4.5" fill="none" stroke="#54595d" strokeWidth="1.8" />
                  <line x1="10" y1="10" x2="14.5" y2="14.5" stroke="#54595d" strokeWidth="1.8" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      <nav className="wk-sidebar">
        <div className="wk-sidebox">
          <h4>Navigation</h4>
          <ul>
            <li>
              <a
                href="/"
                onClick={
                  onMainPage
                    ? (event) => {
                        event.preventDefault()
                        onMainPage()
                      }
                    : undefined
                }
              >
                Main page
              </a>
            </li>
            {featured && <li>{pageLink(featured.id, 'Featured article')}</li>}
            {onRandom && (
              <li>
                <a
                  role="button"
                  tabIndex={0}
                  onClick={(event) => {
                    event.preventDefault()
                    onRandom()
                  }}
                >
                  Random article
                </a>
              </li>
            )}
          </ul>
        </div>

        {ecosystem.length > 0 && (
          <div className="wk-sidebox">
            <h4>Ecosystem</h4>
            <ul>
              {ecosystem.map((entry) => (
                <li key={entry.label}>{pageLink(entry.pageId, entry.label)}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="wk-sidebox">
          <h4>Tools</h4>
          <ul>
            {typeof window !== 'undefined' && (
              <li>
                <a
                  role="button"
                  tabIndex={0}
                  onClick={(event) => {
                    event.preventDefault()
                    window.print()
                  }}
                >
                  Printable version
                </a>
              </li>
            )}
            {sourceRoute && (
              <li>
                <a
                  href={sourceRoute.href}
                  onClick={
                    sourceRoute.onOpen
                      ? (event) => {
                          event.preventDefault()
                          sourceRoute.onOpen?.()
                        }
                      : undefined
                  }
                >
                  Indexed route
                </a>
              </li>
            )}
          </ul>
        </div>

        <div className="wk-sidebox">
          <h4>Languages</h4>
          <ul>
            <li>
              <DeadLink>English</DeadLink>
            </li>
          </ul>
        </div>
      </nav>

      <div className="wk-content-col">
        <main className="wk-content">{children}</main>
        <footer className="wk-footer">
          {updated && <p>This page was last edited on {formatWikiDate(updated)}.</p>}
          <p>
            Text is available under the Open Ecosystem License; additional terms may apply.
            Symmiopedia is a reference work for the ecosystem, not affiliated with any encyclopedia.
          </p>
          <div className="wk-footer-links">
            {sitePageLink('privacy', 'Privacy policy')}
            {sitePageLink('about', 'About Symmiopedia')}
            {sitePageLink('disclaimers', 'Disclaimers')}
          </div>
        </footer>
      </div>
    </div>
  )
}

function DeadLinkTab({ children }: { children: ReactNode }) {
  return (
    <a className="wk-tab" role="button" tabIndex={0} onClick={(e) => e.preventDefault()}>
      {children}
    </a>
  )
}

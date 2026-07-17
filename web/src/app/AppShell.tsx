import { useCallback, useEffect, useState } from 'react'
import { AnnouncementBar, AskField, Sidebar, TopBar } from '@/components/manual'
import { PUBLIC_SECTIONS, READER_SECTION, SECTIONS, sectionFor } from './sections'
import { readAdminArea, useSearchBook } from './useSearchBook'
import { AdminGate } from './AdminGate'
import { CoverView } from './views/CoverView'
import { PortalView } from './views/PortalView'
import { ReaderView } from './views/ReaderView'
import { SearchResultsView } from './views/SearchResultsView'
import { AskView } from './views/AskView'
import { BrowseView } from './views/BrowseView'
import { GlossaryView } from './views/GlossaryView'
import { FaqView } from './views/FaqView'
import { JourneyView } from './views/JourneyView'
import { InsightsView } from './views/InsightsView'
import { SitePageView } from './views/SitePageView'
import { SourceRouteView } from './views/SourceRouteView'

/** Touch/narrow contexts get the tap-toggle drawer; fine pointers keep hover-expand (SYN-360). */
function drawerContext(): boolean {
  return (
    window.matchMedia('(hover: none), (pointer: coarse)').matches ||
    window.matchMedia('(max-width: 900px)').matches
  )
}

/**
 * Field Manual app frame (DESIGN.MD §4): announcement bar, collapsible sidebar
 * (64→272 hover on fine pointers; tap-toggle overlay drawer on touch/narrow),
 * top bar with §NN indicator, single scrollable content pane. One `page` value
 * (variant | active page id) drives everything (§8).
 */
export function AppShell() {
  const app = useSearchBook()
  const [railOpen, setRailOpen] = useState(false)
  // SYN-362: ?admin=1 exposes the ops views behind the server-verified gate.
  const adminArea = readAdminArea()
  const navSections = adminArea ? SECTIONS : PUBLIC_SECTIONS
  const section = app.activePageId ? READER_SECTION : sectionFor(app.variant)

  const closeRail = useCallback(() => setRailOpen(false), [])

  // SYN-368: the Symmiopedia portal is the public landing — no v2 shell chrome.
  // The v2 cover (and the full shell) stays for the admin surface (SYN-363).
  const isPublicLanding = !adminArea && !app.activePageId && app.variant === 'classic'
  const toggleRail = useCallback(() => {
    if (drawerContext()) setRailOpen((open) => !open)
  }, [])

  // Escape closes the drawer (parity with the old mobile rail, L4151).
  useEffect(() => {
    if (!railOpen) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') closeRail()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [railOpen, closeRail])

  const ghostFor = (me: string) => app.activeField !== null && app.activeField !== me && app.query.length > 0
  const askFrom = (field: string) => () => {
    app.setActiveField(app.activeField === field ? null : app.activeField)
    app.handleAsk(app.query)
    closeRail()
  }

  // SYN-370 + favorites QA round: wiki special pages — Search results, the Ask
  // reference desk, the footer site pages, and the operator-gated indexed
  // route. Checked before the page route so a static /page/<id>/?special=…
  // URL resolves to the special page.
  if (app.special?.kind === 'search') return <SearchResultsView app={app} query={app.special.query} />
  if (app.special?.kind === 'ask') return <AskView app={app} query={app.special.query} />
  if (app.special?.kind === 'source') return <SourceRouteView app={app} pageId={app.special.query} />
  if (app.special) return <SitePageView app={app} kind={app.special.kind} />

  // SYN-369: every page route renders the full Symmiopedia article (its own
  // chrome) — the v2 shell stays only for the admin ops surface.
  if (app.activePageId) return <ReaderView app={app} pageId={app.activePageId} />

  if (isPublicLanding) return <PortalView app={app} />

  return (
    <div className="fm-shell flex h-full flex-col overflow-hidden">
      <div className="relative flex min-h-0 flex-1">
        {railOpen && <div className="fm-backdrop" onClick={closeRail} aria-hidden="true" />}

        <Sidebar
          items={navSections.map((s) => ({ id: s.key, num: s.num, name: s.navLabel }))}
          activeId={app.activePageId ? '' : app.variant}
          onNavigate={(id) => {
            app.setVariant(id)
            closeRail()
          }}
          open={railOpen}
          onToggle={toggleRail}
          search={{
            value: app.query,
            onChange: app.setQuery,
            onSubmit: askFrom('side'),
            onFocus: () => app.setActiveField('side'),
            onBlur: () => app.setActiveField(app.activeField === 'side' ? null : app.activeField),
            ghost: ghostFor('side'),
          }}
          backLink={{ label: 'Back to app', href: '../dashboard.html' }}
        />

        {/* Floating rail toggle — visible only under 900px (rail is off-canvas there). */}
        <button
          type="button"
          className="fm-rail-toggle"
          aria-label={railOpen ? 'Close navigation' : 'Open navigation'}
          aria-expanded={railOpen}
          onClick={() => setRailOpen((open) => !open)}
        >
          <svg aria-hidden="true" width="18" height="14" viewBox="0 0 18 14" fill="none">
            <rect x="0" y="0" width="18" height="2" fill="currentColor" />
            <rect x="0" y="6" width="18" height="2" fill="currentColor" />
            <rect x="0" y="12" width="18" height="2" fill="currentColor" />
          </svg>
        </button>

        <div className="fm-content ml-16 flex min-w-0 flex-1 flex-col">
          <AnnouncementBar
            message="Referral Program is officially live — earn rewards by inviting friends."
            cta={{ label: 'JOIN NOW ↗', href: 'https://vibe.trading' }}
          />
          <TopBar breadcrumb="VIBE × SYMM · FIELD MANUAL" section={section}>
            {!app.answer && (
              <AskField
                value={app.query}
                onChange={app.setQuery}
                onSubmit={askFrom('top')}
                onFocus={() => app.setActiveField('top')}
                onBlur={() => app.setActiveField(app.activeField === 'top' ? null : app.activeField)}
                placeholder="Ask the manual —"
                ghost={ghostFor('top')}
              />
            )}
          </TopBar>

          <main className="min-h-0 flex-1 overflow-y-auto">
            <div className="fm-pane">
              {!app.data ? (
                <div
                  style={{
                    margin: 'auto',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 12,
                    letterSpacing: 2,
                    color: '#8fa0d8',
                  }}
                >
                  LOADING INDEX —
                </div>
              ) : app.variant === 'classic' ? (
                <CoverView app={app} />
              ) : (
                <AdminGate>
                  {app.variant === 'browse' ? (
                    <BrowseView app={app} />
                  ) : app.variant === 'glossary' ? (
                    <GlossaryView app={app} />
                  ) : app.variant === 'faq' ? (
                    <FaqView app={app} />
                  ) : app.variant === 'journey' ? (
                    <JourneyView app={app} />
                  ) : (
                    <InsightsView app={app} />
                  )}
                </AdminGate>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

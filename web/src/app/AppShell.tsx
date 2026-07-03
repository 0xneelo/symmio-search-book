import { AnnouncementBar, AskField, Sidebar, TopBar } from '@/components/manual'
import { READER_SECTION, SECTIONS, sectionFor } from './sections'
import { useSearchBook } from './useSearchBook'
import { CoverView } from './views/CoverView'
import { PlaceholderView } from './views/PlaceholderView'

/**
 * Field Manual app frame (DESIGN.MD §4): announcement bar, collapsible sidebar
 * (64→272), top bar with §NN indicator, single scrollable content pane. One
 * `page` value (variant | active page id) drives everything (§8).
 */
export function AppShell() {
  const app = useSearchBook()
  const section = app.activePageId ? READER_SECTION : sectionFor(app.variant)

  const ghostFor = (me: string) => app.activeField !== null && app.activeField !== me && app.query.length > 0
  const askFrom = (field: string) => () => {
    app.setActiveField(app.activeField === field ? null : app.activeField)
    app.handleAsk(app.query)
  }

  return (
    <div className="flex h-full flex-col overflow-hidden">
      <div className="relative flex min-h-0 flex-1">
        <Sidebar
          items={SECTIONS.map((s) => ({ id: s.key, num: s.num, name: s.navLabel }))}
          activeId={app.activePageId ? '' : app.variant}
          onNavigate={(id) => app.setVariant(id)}
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

        <div className="ml-16 flex min-w-0 flex-1 flex-col">
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
            <div
              style={{
                maxWidth: 1240,
                margin: '0 auto',
                padding: '34px 48px 110px',
                minHeight: '100%',
                boxSizing: 'border-box',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
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
              ) : app.activePageId ? (
                <PlaceholderView
                  title="Page reader"
                  fig="FIG_PG0"
                  note={`Page ${app.activePageId} renders here — the SSG page-reader lands in M6 (SYN-353).`}
                />
              ) : app.variant === 'classic' ? (
                <CoverView app={app} />
              ) : app.variant === 'browse' ? (
                <PlaceholderView
                  title="Browse docs"
                  fig="FIG_B00"
                  note="Volumes, collections and the filterable section tree land in M7 (SYN-354)."
                />
              ) : app.variant === 'glossary' ? (
                <PlaceholderView
                  title="Glossary"
                  fig="FIG_G00"
                  note="The routed glossary grid lands in M7 (SYN-354)."
                />
              ) : app.variant === 'faq' ? (
                <PlaceholderView
                  title="FAQ routes"
                  fig="FIG_F00"
                  note="Seeded FAQ routes land in M7 (SYN-354)."
                />
              ) : app.variant === 'journey' ? (
                <PlaceholderView
                  title="Journeys"
                  fig="FIG_J00"
                  note="Guided journeys land in M7 (SYN-354)."
                />
              ) : (
                <PlaceholderView
                  title="Insights"
                  fig="FIG_I00"
                  note="Ops dashboards (metrics, quality audit, requirements, ingestion, Discord routing, gaps, recent, ratings) land in M7 (SYN-354)."
                />
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}

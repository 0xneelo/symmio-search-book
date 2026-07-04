import { corpus, journeyMap } from '@/data/loader'
import type { SearchBookApp } from '../useSearchBook'
import { currentEventLists } from '@/lib/service'
import { useMemo } from 'react'
import { CardGrid, PlateSection, ViewIntro } from '../ops'
import { Chip } from '@/components/manual'
import { ChipRow } from '../chips'

/* eslint-disable @typescript-eslint/no-explicit-any */
type Any = any

/** §04 Journeys — guided paths with numbered steps + recent-questions ledger (L3226, L3581). */
export function JourneyView({ app }: { app: SearchBookApp }) {
  // L3228 — journeyMap with corpus.journeys fallback shaping.
  const journeys: Any[] = useMemo(() => {
    if (journeyMap.journeys && journeyMap.journeys.length) return journeyMap.journeys
    return (corpus.journeys || []).map((journey: Any) => ({
      ...journey,
      promise: journey.focus,
      entryQuestion: journey.focus,
      steps: (journey.pages || [])
        .map((id: string, index: number) => {
          const page = app.data?.pageById.get(id)
          return page ? { index: index + 1, pageId: page.id, title: page.title, why: page.summary || '' } : null
        })
        .filter(Boolean),
    }))
  }, [app.data])

  // insightsVersion keeps the ledger fresh after asks/votes.
  const recent = useMemo(() => currentEventLists().questions.slice(0, 12), [app.insightsVersion])

  return (
    <div data-page="journey">
      <ViewIntro title="Journeys" lead="Guided paths through the manual — each step is a routed page; the entry question asks it live." />

      <PlateSection title="FIG_J01 — GUIDED PATHS" aside={`[ ${journeys.length} JOURNEYS ]`}>
        <CardGrid min={360}>
          {journeys.map((journey: Any) => (
            <article
              key={journey.id || journey.title}
              style={{
                border: '2px solid rgba(255,255,255,0.22)',
                background: 'color-mix(in srgb,var(--paper) 62%,#12246e)',
                boxShadow: '0 4px 0 rgba(0,0,0,0.4)',
                padding: '16px 18px 18px',
              }}
            >
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: 1, color: '#8fa0d8' }}>
                {journey.audience || 'guided path'}
              </div>
              <h3
                style={{
                  margin: '8px 0 6px',
                  fontFamily: 'var(--font-sans)',
                  fontWeight: 600,
                  fontSize: 16,
                  color: '#ffffff',
                }}
              >
                {journey.title}
              </h3>
              <p style={{ margin: '0 0 12px', fontSize: 13.5, lineHeight: 1.6, color: '#d3dbff' }}>
                {journey.promise || journey.focus || ''}
              </p>
              <ChipRow style={{ marginBottom: 14 }}>
                <Chip
                  onClick={() => {
                    const q = journey.entryQuestion || journey.title
                    app.setQuery(q)
                    app.handleAsk(q, 'example')
                  }}
                >
                  {journey.entryQuestion || journey.title}
                </Chip>
              </ChipRow>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {(journey.steps || []).map((step: Any) => (
                  <button
                    key={step.pageId}
                    type="button"
                    onClick={() => app.openPage(step.pageId, 'journey')}
                    style={{
                      display: 'flex',
                      gap: 12,
                      alignItems: 'baseline',
                      background: 'transparent',
                      border: 'none',
                      borderTop: '1px solid rgba(255,255,255,0.10)',
                      textAlign: 'left',
                      padding: '9px 2px',
                      cursor: 'pointer',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: 10,
                        color: 'var(--ink)',
                        minWidth: 18,
                      }}
                    >
                      {String(step.index).padStart(2, '0')}
                    </span>
                    <span style={{ minWidth: 0 }}>
                      <strong
                        style={{
                          display: 'block',
                          fontFamily: 'var(--font-sans)',
                          fontWeight: 600,
                          fontSize: 13,
                          color: '#e6ebff',
                        }}
                      >
                        {step.title}
                      </strong>
                      <span style={{ fontSize: 12, lineHeight: 1.5, color: '#8fa0d8' }}>{step.why}</span>
                    </span>
                  </button>
                ))}
              </div>
            </article>
          ))}
        </CardGrid>
      </PlateSection>

      <PlateSection title="FIG_J02 — RECENT QUESTIONS" aside="[ LEDGER ]">
        {recent.length ? (
          <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
            {recent.map((item) => (
              <li key={item.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.12)', padding: '9px 0' }}>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, letterSpacing: 1, color: '#8fa0d8' }}>
                  {item.status} / score {String(item.score)}
                </span>
                <br />
                <span style={{ fontSize: 13.5, color: '#d3dbff' }}>
                  {item.query} <span style={{ color: '#5f6cb0' }}>→</span> {item.page}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 12, color: '#8fa0d8' }}>
            No questions recorded yet.
          </p>
        )}
      </PlateSection>
    </div>
  )
}

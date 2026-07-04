import { useMemo, useState } from 'react'
import { wordsFor } from '@/lib/search'
import type { FaqEntry } from '@/data/types'
import type { SearchBookApp } from '../useSearchBook'
import { CardGrid, FilterInput, HATCH, PlateSection, ViewIntro } from '../ops'
import { Chip } from '@/components/manual'
import { ChipRow, SourceChip, sourceKeyChips } from '../chips'

/** L3418 — FAQ haystack filter (incl. gap fields). */
function faqMatchesFilter(entry: FaqEntry, filter: string): boolean {
  const words = wordsFor(filter)
  if (!words.length) return true
  const haystack = [
    entry.question,
    entry.category,
    entry.type,
    entry.shortAnswer,
    entry.answerSummary,
    entry.pageTitle,
    entry.pageSection,
    entry.pageTrack,
    entry.gapId,
    entry.gapTitle,
    (entry.sourceKeys || []).join(' '),
  ]
    .join(' ')
    .toLowerCase()
  return words.every((word) => haystack.includes(word))
}

/** §03 FAQ routes — seeded question cards with category filters (L3439). */
export function FaqView({ app }: { app: SearchBookApp }) {
  const [filter, setFilter] = useState('')
  const allEntries = app.data?.faqEntries || []
  const byCategory: Record<string, number> = app.data?.faqMap?.byCategory || {}
  const entries = useMemo(() => allEntries.filter((e) => faqMatchesFilter(e, filter)), [allEntries, filter])

  return (
    <div data-page="faq">
      <ViewIntro title="FAQ routes" lead="Seeded questions with their routed answers — ask any of them live from here." />

      <FilterInput
        value={filter}
        onChange={setFilter}
        placeholder="Filter FAQ entries…"
        count={`${entries.length} of ${allEntries.length} local FAQ entries`}
      />

      <ChipRow style={{ marginBottom: 26 }}>
        {Object.entries(byCategory)
          .sort((a, b) => a[0].localeCompare(b[0]))
          .map(([category, count]) => (
            <Chip key={category} onClick={() => setFilter(category)}>
              {category} / {count}
            </Chip>
          ))}
      </ChipRow>

      <PlateSection title="FIG_F01 — SEEDED ROUTES" aside="[ Q&A INDEX ]">
        {entries.length ? (
          <CardGrid min={340}>
            {entries.map((entry, i) => {
              const answer =
                entry.type === 'answerable'
                  ? entry.shortAnswer || entry.answerSummary || ''
                  : entry.notes || entry.shortAnswer || ''
              return (
                <article
                  key={`${entry.question}-${i}`}
                  style={{
                    border: '2px solid rgba(255,255,255,0.22)',
                    background: 'color-mix(in srgb,var(--paper) 62%,#12246e)',
                    boxShadow: '0 4px 0 rgba(0,0,0,0.4)',
                    padding: '16px 18px 18px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 9,
                    backgroundImage: entry.type === 'reconciliation' ? HATCH : undefined,
                  }}
                >
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, letterSpacing: 1, color: '#8fa0d8' }}>
                    {entry.type} / {entry.category}
                    {entry.confidence ? ` / ${entry.confidence}` : ''}
                  </div>
                  <h3
                    style={{
                      margin: 0,
                      fontFamily: 'var(--font-sans)',
                      fontWeight: 600,
                      fontSize: 15.5,
                      letterSpacing: -0.2,
                      color: '#ffffff',
                    }}
                  >
                    {entry.question}
                  </h3>
                  <p style={{ margin: 0, fontSize: 13.5, lineHeight: 1.6, color: '#d3dbff' }}>{answer}</p>
                  {entry.pageTitle && (
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: '#8fa0d8' }}>
                      Routes to {entry.pageTitle}
                    </div>
                  )}
                  {entry.gapTitle && (
                    <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: 'var(--ink)' }}>
                      {entry.gapId} / {entry.gapTitle}
                    </div>
                  )}
                  <ChipRow>
                    {entry.page ? (
                      <SourceChip
                        href={`?page=${encodeURIComponent(entry.page.id)}`}
                        onClick={() => app.openPage(entry.page!.id, 'browse')}
                      >
                        Open exact page
                      </SourceChip>
                    ) : (
                      <SourceChip>{entry.gapId || 'gap'}</SourceChip>
                    )}
                    <Chip
                      onClick={() => {
                        app.setQuery(entry.question)
                        app.handleAsk(entry.question, 'example')
                      }}
                    >
                      Ask this
                    </Chip>
                  </ChipRow>
                  {(entry.sourceKeys || []).length > 0 && <ChipRow>{sourceKeyChips(entry.sourceKeys, 5)}</ChipRow>}
                </article>
              )
            })}
          </CardGrid>
        ) : (
          <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 12, color: '#8fa0d8' }}>
            No matching FAQ entries.
          </p>
        )}
      </PlateSection>
    </div>
  )
}

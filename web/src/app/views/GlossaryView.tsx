import { useMemo, useState } from 'react'
import { glossary } from '@/data/loader'
import { wordsFor } from '@/lib/search'
import type { GlossaryTerm } from '@/data/types'
import type { SearchBookApp } from '../useSearchBook'
import { FilterInput, PlateSection, ViewIntro } from '../ops'
import { Chip } from '@/components/manual'
import { ChipRow, SourceChip } from '../chips'

/** L3377 — term haystack filter. */
function glossaryMatchesFilter(term: GlossaryTerm, filter: string): boolean {
  const words = wordsFor(filter)
  if (!words.length) return true
  const haystack = [
    term.term,
    (term.aliases || []).join(' '),
    term.category,
    term.definition,
    (term.sourceKeys || []).join(' '),
  ]
    .join(' ')
    .toLowerCase()
  return words.every((word) => haystack.includes(word))
}

/** §02 Glossary — 200px/1fr definition grid with category chips (L3384). */
export function GlossaryView({ app }: { app: SearchBookApp }) {
  const [filter, setFilter] = useState('')
  const allTerms = app.data?.glossaryTerms || []
  const terms = useMemo(() => allTerms.filter((t) => glossaryMatchesFilter(t, filter)), [allTerms, filter])
  const categories = Object.entries(glossary.byCategory || {}).sort((a, b) => a[0].localeCompare(b[0]))

  return (
    <div data-page="glossary">
      <ViewIntro title="Glossary" lead="Routed terms — every entry links back to the page that defines it." />

      <FilterInput
        value={filter}
        onChange={setFilter}
        placeholder="Filter terms…"
        count={`${terms.length} of ${allTerms.length} terms`}
      />

      <ChipRow style={{ marginBottom: 26 }}>
        {categories.map(([category, count]) => (
          <Chip key={category} onClick={() => setFilter(category)}>
            {category} / {count as number}
          </Chip>
        ))}
      </ChipRow>

      <PlateSection title="FIG_G01 — DEFINITIONS" aside="[ REFERENCE ]">
        {terms.length ? (
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.14)' }}>
            {terms.map((term) => (
              <div
                key={term.term}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '200px 1fr',
                  gap: 24,
                  padding: '16px 0',
                  borderBottom: '1px solid rgba(255,255,255,0.12)',
                }}
              >
                <div>
                  <div
                    style={{
                      fontFamily: 'var(--font-sans)',
                      fontSize: 12.5,
                      fontWeight: 700,
                      letterSpacing: 1,
                      color: 'var(--ink)',
                      textTransform: 'uppercase',
                    }}
                  >
                    {term.term}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: 10,
                      color: '#5f6cb0',
                      marginTop: 4,
                      letterSpacing: 1,
                    }}
                  >
                    {term.category}
                  </div>
                </div>
                <div>
                  <div style={{ fontSize: 15, lineHeight: 1.65, color: '#d3dbff' }}>{term.definition}</div>
                  {(term.aliases || []).length > 0 && (
                    <ChipRow style={{ marginTop: 8 }}>
                      {(term.aliases || []).slice(0, 4).map((alias) => (
                        <SourceChip key={alias}>{alias}</SourceChip>
                      ))}
                    </ChipRow>
                  )}
                  <ChipRow style={{ marginTop: 8 }}>
                    {(term.pages || []).slice(0, 3).map((page) => (
                      <SourceChip
                        key={page.id}
                        href={`?page=${encodeURIComponent(page.id)}`}
                        onClick={() => app.openPage(page.id, 'browse')}
                      >
                        {page.title}
                      </SourceChip>
                    ))}
                    {(term.sourceKeys || []).slice(0, 4).map((key) => (
                      <SourceChip key={`sk-${key}`}>{key}</SourceChip>
                    ))}
                  </ChipRow>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 12, color: '#8fa0d8' }}>
            No matching terms.
          </p>
        )}
      </PlateSection>
    </div>
  )
}

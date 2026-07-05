import { corpus, glossary, navigation, volumeMap } from '@/data/loader'
import type { SearchBookApp } from '../useSearchBook'
import { CardGrid, IndexPlate, PlateSection, StatTile } from '../ops'
import { ChipRow, SourceChip } from '../chips'

/* eslint-disable @typescript-eslint/no-explicit-any */
type Any = any

/**
 * Cover index plates below the Ask panel: manifest stats (init() counters,
 * L4025), authored publication candidates (L3206) and high-signal routes
 * (L3181) as bordered plates per design-mapping.
 */
export function CoverIndex({ app }: { app: SearchBookApp }) {
  const data = app.data
  if (!data) return null

  const stats: Any = corpus.manifestStats || {}
  const seen = new Set<string>()
  const highSignalPages = data.seededQuestionRoutes
    .map((route) => route.page)
    .filter((page): page is NonNullable<typeof page> => Boolean(page && !seen.has(page.id) && seen.add(page.id)))
    .slice(0, 12)

  const statItems = [
    { label: 'Manifest pages', value: navigation.totalPages || stats.totalPages || 0 },
    { label: 'Source corpus', value: navigation.sourceCorpusPages || stats.totalPages || 0 },
    { label: 'Sections', value: navigation.counts?.sections || stats.totalSections || 0 },
    {
      label: 'Companion pages',
      value:
        navigation.counts?.sourceCompanionTraceabilityPages ||
        data.pageStateRegistry.sourceCompanionPages ||
        stats.companionPages ||
        0,
    },
    {
      label: 'Authored',
      value: data.publicAuthoredPages.length || data.authored.totalPages || data.authoredPages.length,
    },
    { label: 'Volumes', value: volumeMap.totalVolumes || (volumeMap.volumes || []).length },
    { label: 'Glossary terms', value: glossary.totalTerms || data.glossaryTerms.length },
    { label: 'FAQ entries', value: data.faqMap.totalEntries || data.faqEntries.length },
  ]

  return (
    <div style={{ marginTop: 70 }}>
      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', marginBottom: 34 }}>
        {statItems.map((s) => (
          <StatTile key={s.label} label={s.label} value={s.value} />
        ))}
      </div>

      <PlateSection
        title="FIG_C01 — AUTHORED PUBLICATION CANDIDATES"
        aside={`[ ${data.publicAuthoredPages.length} PUBLIC ]`}
      >
        <CardGrid min={300}>
          {data.publicAuthoredPages.slice(0, 12).map((page) => (
            <IndexPlate
              key={page.id}
              meta={`${page.section || 'docs'} / ${page.status || ''}`}
              title={page.title}
              body={page.summary || ''}
            >
              <ChipRow>
                {(page.sources || []).slice(0, 4).map((s) => (
                  <SourceChip key={s}>{s}</SourceChip>
                ))}
                <SourceChip
                  href={`?page=${encodeURIComponent(page.id)}`}
                  onClick={() => app.openPage(page.id, 'browse')}
                >
                  Open page
                </SourceChip>
              </ChipRow>
            </IndexPlate>
          ))}
        </CardGrid>
      </PlateSection>

      <PlateSection title="FIG_C02 — HIGH-SIGNAL ROUTES" aside="[ TOP 12 ]" style={{ marginBottom: 0 }}>
        <CardGrid min={300}>
          {highSignalPages.map((page) => (
            <IndexPlate
              key={page.id}
              meta={page.section || 'docs'}
              title={page.title}
              body={page.summary || ''}
            >
              <ChipRow>
                {(page.sources || []).slice(0, 3).map((s) => (
                  <SourceChip key={s}>{s}</SourceChip>
                ))}
                <SourceChip
                  href={`?page=${encodeURIComponent(page.id)}`}
                  onClick={() => app.openPage(page.id, 'browse')}
                >
                  Open page
                </SourceChip>
              </ChipRow>
            </IndexPlate>
          ))}
        </CardGrid>
      </PlateSection>
    </div>
  )
}

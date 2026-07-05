import { useMemo, useState } from 'react'
import { navigation, volumeMap } from '@/data/loader'
import { wordsFor } from '@/lib/search'
import type { Page } from '@/data/types'
import type { SearchBookApp } from '../useSearchBook'
import { CardGrid, FilterInput, IndexPlate, PlateSection, ViewIntro } from '../ops'
import { Chip } from '@/components/manual'
import { ChipRow, SourceChip } from '../chips'

/* eslint-disable @typescript-eslint/no-explicit-any */
type Any = any

/** L3277 — every filter word must match the page haystack. */
function pageMatchesFilter(page: Any, filter: string): boolean {
  const words = wordsFor(filter)
  if (!words.length) return true
  const haystack = [
    page.title,
    page.section,
    page.track,
    page.granularity,
    page.status,
    page.sourcePriority,
    (page.sourceKeys || []).join(' '),
  ]
    .join(' ')
    .toLowerCase()
  return words.every((word) => haystack.includes(word))
}

/** §01 Browse — volumes, collections, and the filterable section tree (L3284–3375). */
export function BrowseView({ app }: { app: SearchBookApp }) {
  const [filter, setFilter] = useState('')

  const { sections, visibleCount } = useMemo(() => {
    let count = 0
    const result = (navigation.sections || []).flatMap((section: Any) =>
      (section.tracks || []).flatMap((track: Any) => {
        const pages = (track.pages || []).filter((p: Any) => pageMatchesFilter(p, filter))
        count += pages.length
        if (!pages.length) return []
        return [{ section, track, pages, shown: pages.slice(0, 10) }]
      }),
    )
    return { sections: result, visibleCount: count }
  }, [filter])

  const pageById = app.data?.pageById

  return (
    <div data-page="browse">
      <ViewIntro title="Browse docs" lead="Every routed page in the compendium — volumes, source collections, and the full section tree." />

      <FilterInput
        value={filter}
        onChange={setFilter}
        placeholder="Filter pages — title, section, status…"
        count={`${visibleCount} matching pages`}
      />

      <PlateSection title="FIG_B01 — COMPENDIUM VOLUMES" aside={`[ ${(volumeMap.volumes || []).length} VOLUMES ]`}>
        <CardGrid min={340}>
          {(volumeMap.volumes || []).map((volume: Any) => {
            const overviewPage: Page | undefined = volume.overviewPageId
              ? pageById?.get(volume.overviewPageId)
              : undefined
            const openingPages: Page[] = (volume.openingPageIds || [])
              .map((id: string) => pageById?.get(id))
              .filter(Boolean)
              .filter((p: Page) => p.id !== overviewPage?.id)
              .slice(0, 4)
            return (
              <IndexPlate
                key={volume.id}
                meta={`Volume ${volume.number} / ${volume.totalPages} pages / ${(volume.chapters || []).length} chapters`}
                title={volume.title}
                body={volume.readerPromise || volume.premise || ''}
              >
                <ChipRow>
                  {overviewPage ? (
                    <Chip onClick={() => app.openPage(overviewPage.id, 'browse')}>Open overview</Chip>
                  ) : (
                    <SourceChip>overview pending</SourceChip>
                  )}
                </ChipRow>
                <ChipRow>
                  {(volume.chapters || []).slice(0, 4).map((chapter: Any) => (
                    <SourceChip key={chapter.id || chapter.title}>
                      {chapter.title} / {chapter.totalPages}
                    </SourceChip>
                  ))}
                </ChipRow>
                {openingPages.length > 0 && (
                  <ChipRow>
                    {openingPages.map((p) => (
                      <Chip key={p.id} onClick={() => app.openPage(p.id, 'browse')}>
                        {p.title}
                      </Chip>
                    ))}
                  </ChipRow>
                )}
              </IndexPlate>
            )
          })}
        </CardGrid>
      </PlateSection>

      <PlateSection
        title="FIG_B02 — SOURCE COLLECTIONS"
        aside={`[ ${(navigation.collections || []).length} COLLECTIONS ]`}
      >
        <CardGrid min={300}>
          {(navigation.collections || []).map((collection: Any) => (
            <IndexPlate
              key={collection.key}
              meta={`${collection.pageCount} source pages`}
              title={collection.title}
              body={collection.summary || ''}
            >
              <ChipRow>
                <SourceChip href={collection.sourceUrl || '#'}>Source collection</SourceChip>
              </ChipRow>
            </IndexPlate>
          ))}
        </CardGrid>
      </PlateSection>

      <PlateSection title="FIG_B03 — SECTION TREE" aside="[ FILTERED ]">
        {sections.length ? (
          <CardGrid min={360}>
            {sections.map(({ section, track, pages, shown }: Any) => (
              <IndexPlate
                key={`${section.id}-${track.id}`}
                meta={`${section.label} / ${track.totalPages} pages`}
                title={track.label}
              >
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {shown.map((page: Any) => (
                    <button
                      key={page.id}
                      type="button"
                      onClick={() => app.openPage(page.id, 'browse')}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        borderBottom: '1px solid rgba(255,255,255,0.10)',
                        textAlign: 'left',
                        padding: '6px 2px',
                        cursor: 'pointer',
                        color: '#d3dbff',
                        fontFamily: 'var(--font-sans)',
                        fontSize: 13,
                      }}
                    >
                      {page.title}{' '}
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 10, color: '#5f6cb0' }}>
                        {page.granularity} / {page.status}
                      </span>
                    </button>
                  ))}
                </div>
                {pages.length > shown.length && (
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 10.5, color: '#8fa0d8' }}>
                    Showing {shown.length} of {pages.length} matching pages
                  </div>
                )}
              </IndexPlate>
            ))}
          </CardGrid>
        ) : (
          <p style={{ margin: 0, fontFamily: 'var(--font-mono)', fontSize: 12, color: '#8fa0d8' }}>
            No matching pages.
          </p>
        )}
      </PlateSection>
    </div>
  )
}

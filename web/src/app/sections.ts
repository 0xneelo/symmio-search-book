/**
 * Variant registry — keys and cycle order are parity-critical (index.html L2466:
 * classic, browse, glossary, faq, journey, insights). Labels move from the old
 * "A - Ask"…"F - Insights" letters to field-manual § numbering (checklist §9 delta).
 */
export interface SectionDef {
  key: string
  num: string
  name: string
  /** Sidebar nav label (Poppins 600). */
  navLabel: string
}

export const SECTIONS: SectionDef[] = [
  { key: 'classic', num: '00', name: 'COVER & ASK', navLabel: 'Cover & Ask' },
  { key: 'browse', num: '01', name: 'BROWSE DOCS', navLabel: 'Browse Docs' },
  { key: 'glossary', num: '02', name: 'GLOSSARY', navLabel: 'Glossary' },
  { key: 'faq', num: '03', name: 'FAQ ROUTES', navLabel: 'FAQ Routes' },
  { key: 'journey', num: '04', name: 'JOURNEYS', navLabel: 'Journeys' },
  { key: 'insights', num: '05', name: 'INSIGHTS', navLabel: 'Insights' },
]

/**
 * SYN-362: first user testing exposes only the core loop — §00 plus the
 * reader pages. The other five views live behind the admin gate.
 */
export const PUBLIC_SECTIONS: SectionDef[] = SECTIONS.filter((s) => s.key === 'classic')

export const READER_SECTION = { num: 'PG', name: 'PAGE READER' }

export function sectionFor(key: string): SectionDef {
  return SECTIONS.find((s) => s.key === key) || SECTIONS[0]
}

export function isVariantKey(value: string | null): boolean {
  return SECTIONS.some((s) => s.key === value)
}

export function isPublicVariantKey(value: string | null): boolean {
  return PUBLIC_SECTIONS.some((s) => s.key === value)
}

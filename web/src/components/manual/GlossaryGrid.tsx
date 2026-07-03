export interface GlossaryEntry {
  term: string
  definition: string
}

/** Glossary (DESIGN.MD §6): 200px/1fr definition grid, ink uppercase terms, hairline dividers. */
export function GlossaryGrid({
  entries,
  maxWidth = 900,
}: {
  entries: GlossaryEntry[]
  maxWidth?: number
}) {
  return (
    <div style={{ maxWidth, borderTop: '1px solid rgba(255,255,255,0.14)' }}>
      {entries.map((e) => (
        <div
          key={e.term}
          style={{
            display: 'grid',
            gridTemplateColumns: '200px 1fr',
            gap: 24,
            padding: '16px 0',
            borderBottom: '1px solid rgba(255,255,255,0.12)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: 12.5,
              fontWeight: 700,
              letterSpacing: 1,
              color: 'var(--ink)',
            }}
          >
            {e.term.toUpperCase()}
          </div>
          <div style={{ fontSize: 15, lineHeight: 1.65, color: '#d3dbff' }}>{e.definition}</div>
        </div>
      ))}
    </div>
  )
}

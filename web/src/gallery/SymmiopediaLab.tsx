/**
 * Symmiopedia v3 scratch route (SYN-367): proves the M1 foundation — the
 * extracted puzzle globe crisp at its three instance sizes, the design tokens,
 * and the global chrome register — before any view rewrites. Reached at
 * /symmiopedia (dev-review only, like /components for v2).
 */
import '../wiki.css'
import { PuzzleGlobe, PuzzleGlobeDefs } from '../components/wiki/PuzzleGlobe'

const CHROME_SWATCHES: Array<[string, string]> = [
  ['canvas', '#f6f6f6'],
  ['content', '#ffffff'],
  ['chrome line', '#a7d7f9'],
  ['rule / box border', '#a2a9b1'],
  ['figure border', '#c8ccd1'],
  ['box fill', '#f8f9fa'],
  ['table header', '#eaecf0'],
  ['text', '#202122'],
  ['muted', '#54595d'],
  ['link', '#0645ad'],
  ['external', '#3366bb'],
  ['red link', '#ba0000'],
]

export function SymmiopediaLab() {
  return (
    <div className="wiki" style={{ minHeight: '100vh', padding: '24px 32px' }}>
      <PuzzleGlobeDefs />

      <div
        style={{
          background: 'var(--wk-content)',
          border: '1px solid var(--wk-chrome-line)',
          padding: '18px 40px 40px 32px',
          maxWidth: 980,
          margin: '0 auto',
        }}
      >
        <h1>Symmiopedia foundation</h1>
        <p className="wk-muted" style={{ fontSize: 12 }}>
          M1 scratch route (SYN-367) — globe instances, tokens, chrome register. Not a public
          surface.
        </p>

        <h2>Puzzle globe — one def, three instances</h2>
        <div style={{ display: 'flex', gap: 40, alignItems: 'flex-end', flexWrap: 'wrap' }}>
          {([
            [118, 'logo cell'],
            [228, 'portal'],
            [250, 'infobox'],
          ] as Array<[number, string]>).map(([size, label]) => (
            <figure key={label} style={{ margin: 0, textAlign: 'center' }}>
              <PuzzleGlobe size={size} />
              <figcaption className="wk-muted" style={{ fontSize: 11.8 }}>
                {size}px — {label}
              </figcaption>
            </figure>
          ))}
        </div>

        <h2>Color tokens</h2>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          {CHROME_SWATCHES.map(([name, hex]) => (
            <figure key={name} style={{ margin: 0, textAlign: 'center' }}>
              <div
                style={{
                  width: 72,
                  height: 44,
                  background: hex,
                  border: '1px solid var(--wk-figure-border)',
                }}
              />
              <figcaption className="wk-muted" style={{ fontSize: 11 }}>
                {name}
                <br />
                {hex}
              </figcaption>
            </figure>
          ))}
        </div>

        <h2>Type & link register</h2>
        <p>
          Body 14px/1.6 sans. A <a href="#specimen">wiki link</a>, an{' '}
          <a className="wk-external" href="#specimen">
            external link
          </a>{' '}
          and a{' '}
          <a className="wk-redlink" href="#specimen">
            red link
          </a>
          . Underline appears on hover only.
        </p>
        <h3>h3 — 16px bold sans</h3>
        <p className="wk-muted" style={{ fontSize: 12.6 }}>
          References register, 12.6px muted.
        </p>

        <h2>Search bar (2px radius ceiling)</h2>
        <form style={{ display: 'flex', width: 'min(480px, 92vw)' }} onSubmit={(e) => e.preventDefault()}>
          <input
            className="wk-r2"
            type="search"
            placeholder="Search Symmiopedia — or ask a question"
            style={{
              flex: 1,
              height: 46,
              border: '1px solid var(--wk-rule)',
              borderRight: 'none',
              borderRadius: '2px 0 0 2px',
              padding: '0 12px',
              fontSize: 16,
              fontFamily: 'var(--wk-sans)',
              color: 'var(--wk-text)',
              background: 'var(--wk-content)',
              outline: 'none',
            }}
          />
          <button
            type="submit"
            aria-label="Search"
            style={{
              width: 52,
              height: 46,
              border: '1px solid var(--wk-rule)',
              background: 'var(--wk-box-fill)',
              cursor: 'pointer',
            }}
          >
            <svg viewBox="0 0 16 16" width="18" height="18" aria-hidden="true">
              <circle cx="6.5" cy="6.5" r="4.5" fill="none" stroke="#54595d" strokeWidth="1.8" />
              <line x1="10" y1="10" x2="14.5" y2="14.5" stroke="#54595d" strokeWidth="1.8" />
            </svg>
          </button>
        </form>
      </div>
    </div>
  )
}

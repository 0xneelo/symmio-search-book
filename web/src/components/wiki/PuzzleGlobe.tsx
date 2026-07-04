/**
 * Symmiopedia puzzle globe (SYN-367, DESIGN.MD Part B §5).
 *
 * `pglobe-defs.svg` is the live-DOM extraction from the operator comp
 * (`docs/goals/symmiopedia-v3/comp/field-manual-wikipedia.html`, rendered in a
 * browser and lifted — never hand-unescaped from the bundler wrapper). It
 * defines `<g id="pglobe">` plus its gradients/filters/clipPath inside a 0×0
 * `<svg><defs>`; the curved label textPaths (pgTp1–pgTp6) are the
 * fidelity-critical part. Mount <PuzzleGlobeDefs> once per document, then
 * instance with <PuzzleGlobe size={n}>.
 */
import defsMarkup from './pglobe-defs.svg?raw'

/** Native geometry of the extracted artwork. */
export const PGLOBE_VIEWBOX = '0 0 640 672'
const PGLOBE_RATIO = 672 / 640

export function PuzzleGlobeDefs() {
  return <span aria-hidden="true" dangerouslySetInnerHTML={{ __html: defsMarkup }} />
}

export function PuzzleGlobe({
  size,
  className,
  alt = '',
}: {
  /** Rendered width in px — 118 (logo cell), 228 (portal), ~250 (infobox). */
  size: number
  className?: string
  alt?: string
}) {
  const labelled = alt !== ''
  return (
    <svg
      viewBox={PGLOBE_VIEWBOX}
      width={size}
      height={Math.round(size * PGLOBE_RATIO)}
      className={className}
      role={labelled ? 'img' : undefined}
      aria-label={labelled ? alt : undefined}
      aria-hidden={labelled ? undefined : true}
    >
      <use href="#pglobe" />
    </svg>
  )
}

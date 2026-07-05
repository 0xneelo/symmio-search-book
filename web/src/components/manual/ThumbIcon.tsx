/** Pixel-art thumb SVG from the comp; `down` renders it rotated 180°. */
export function ThumbIcon({ down = false }: { down?: boolean }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 512 435"
      width="18"
      height="15"
      fill="none"
      style={{
        flex: 'none',
        display: 'block',
        transform: down ? 'rotate(180deg)' : undefined,
      }}
    >
      <rect x="20" y="178" width="79" height="237" stroke="currentColor" strokeWidth="40" />
      <rect x="158" y="158" width="39" height="237" fill="currentColor" />
      <rect x="473" y="158" width="39" height="197" fill="currentColor" />
      <rect x="197" y="118" width="40" height="40" fill="currentColor" />
      <rect x="434" y="356" width="38" height="39" fill="currentColor" />
      <rect x="236" y="79" width="40" height="39" fill="currentColor" />
      <rect x="276" width="39" height="78" fill="currentColor" />
      <rect x="315" width="79" height="39" fill="currentColor" />
      <rect x="355" y="39" width="39" height="79" fill="currentColor" />
      <rect x="315" y="118" width="158" height="40" fill="currentColor" />
      <rect x="198" y="395" width="235" height="40" fill="currentColor" />
    </svg>
  )
}

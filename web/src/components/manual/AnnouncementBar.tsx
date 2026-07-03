export interface AnnouncementBarProps {
  message: string
  cta?: { label: string; href: string }
}

/** 44px solid blueprint-blue announcement bar (DESIGN.MD §4). Blue, never magenta. */
export function AnnouncementBar({ message, cta }: AnnouncementBarProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 14,
        height: 44,
        padding: '0 16px',
        background: '#2e6bff',
        flex: 'none',
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-sans)',
          fontWeight: 500,
          fontSize: 12.5,
          color: '#fff',
          letterSpacing: 0.2,
        }}
      >
        {message}
      </span>
      {cta && (
        <a
          href={cta.href}
          style={{
            fontFamily: 'var(--font-sans)',
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: 0.8,
            color: '#0a1027',
            background: '#fff',
            padding: '5px 12px',
            textDecoration: 'none',
            boxShadow: '0 3px 0 rgba(0,0,0,0.3)',
          }}
        >
          {cta.label}
        </a>
      )}
    </div>
  )
}

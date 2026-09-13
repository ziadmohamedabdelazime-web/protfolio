import { useState } from 'react'
import ThemeToggle from './ThemeToggle'

const LINKS = [
  { href: '#about', label: 'About' },
  { href: '#skills', label: 'Skills' },
  { href: '#projects', label: 'Projects' },
  { href: '#certifications', label: 'Certifications' },
  { href: '#experience', label: 'Experience' },
  { href: '#insights', label: 'Insights' },
  { href: '#contact', label: 'Contact' },
]

export default function Nav({ name }: { name: string }) {
  const [open, setOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-40 border-b backdrop-blur"
      style={{ borderColor: 'var(--border)', backgroundColor: 'color-mix(in srgb, var(--bg) 85%, transparent)' }}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
        <a href="#top" className="flex items-center gap-2 font-display text-lg font-semibold tracking-tight" style={{ color: 'var(--accent)' }}>
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-60" style={{ backgroundColor: 'var(--accent)' }} />
            <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
          </span>
          {name}
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            
              <a
                            key={l.href}
              href={l.href}
              className="text-sm transition-colors hover:opacity-70"
              style={{ color: 'var(--text-muted)' }}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            className="flex h-9 w-9 items-center justify-center rounded-full border md:hidden"
            style={{ borderColor: 'var(--border)' }}
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text)" strokeWidth="1.8" strokeLinecap="round">
              {open ? <path d="M5 5l14 14M19 5L5 19" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="flex flex-col gap-1 border-t px-5 py-3 md:hidden" style={{ borderColor: 'var(--border)' }}>
          {LINKS.map((l) => (
            
              <a
                            key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="rounded-md px-2 py-2.5 text-sm"
              style={{ color: 'var(--text)' }}
            >
              {l.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  )
}
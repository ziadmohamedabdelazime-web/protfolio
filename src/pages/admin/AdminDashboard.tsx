import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import ThemeToggle from '../../components/ThemeToggle'
import ProjectsManager from './ProjectsManager'

const SECTIONS = ['Projects', 'Skills', 'Certifications', 'Experience', 'Profile'] as const
type Section = (typeof SECTIONS)[number]

export default function AdminDashboard() {
  const { signOut } = useAuth()
  const navigate = useNavigate()
  const [section, setSection] = useState<Section>('Projects')

  async function handleSignOut() {
    await signOut()
    navigate('/admin')
  }

  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>
      <header className="flex items-center justify-between border-b px-6 py-4" style={{ borderColor: 'var(--border)' }}>
        <h1 className="font-display text-lg font-semibold" style={{ color: 'var(--text)' }}>Admin Panel</h1>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button onClick={handleSignOut} className="rounded-full border px-4 py-2 text-sm" style={{ borderColor: 'var(--border)', color: 'var(--text)' }}>
            Sign out
          </button>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl gap-8 px-6 py-8">
        <nav className="w-44 shrink-0 space-y-1">
          {SECTIONS.map((s) => (
            <button
              key={s}
              onClick={() => setSection(s)}
              className="block w-full rounded-lg px-3 py-2 text-left text-sm"
              style={{
                backgroundColor: section === s ? 'var(--surface-2)' : 'transparent',
                color: section === s ? 'var(--text)' : 'var(--text-muted)',
              }}
            >
              {s}
            </button>
          ))}
        </nav>

        <main className="flex-1">
          {section === 'Projects' ? (
            <ProjectsManager />
          ) : (
            <div className="rounded-2xl border border-dashed p-10 text-center text-sm" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
              {section} editor follows the same pattern as Projects — next phase.
              <br />
              For now, add rows directly in Supabase Table Editor for "{section.toLowerCase()}".
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

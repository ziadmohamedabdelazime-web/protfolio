import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { isSupabaseConfigured } from '../../lib/supabaseClient'

export default function AdminLogin() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const { error } = await signIn(email, password)
    setLoading(false)
    if (error) {
      setError(error)
      return
    }
    navigate('/admin/dashboard')
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-5" style={{ backgroundColor: 'var(--bg)' }}>
      <div className="w-full max-w-sm rounded-2xl border p-8" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)', boxShadow: 'var(--shadow)' }}>
        <h1 className="font-display text-xl font-semibold" style={{ color: 'var(--text)' }}>Admin sign in</h1>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>Manage your portfolio content.</p>

        {!isSupabaseConfigured && (
          <p className="mt-4 rounded-lg border p-3 text-xs" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
            Supabase isn't configured yet. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env.local to enable sign-in.
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm" style={{ color: 'var(--text)' }}>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)', color: 'var(--text)' }}
            />
          </div>
          <div>
            <label className="text-sm" style={{ color: 'var(--text)' }}>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 w-full rounded-lg border px-3 py-2 text-sm outline-none"
              style={{ borderColor: 'var(--border)', backgroundColor: 'var(--bg)', color: 'var(--text)' }}
            />
          </div>
          {error && <p className="text-sm" style={{ color: '#DC5B4B' }}>{error}</p>}
          <button
            type="submit"
            disabled={loading || !isSupabaseConfigured}
            className="w-full rounded-full py-2.5 text-sm font-medium text-white disabled:opacity-50"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </div>
    </div>
  )
}

import { useEffect, useState, type FormEvent } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { mapProjectRow } from '../../data/mappers'
import type { Project } from '../../data/seed'

const emptyForm = {
  title: '',
  short_description: '',
  full_description: '',
  technologies: '',
  github_url: '',
  live_url: '',
  category: '',
  project_date: '',
  featured: false,
}

export default function ProjectsManager() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function load() {
    if (!supabase) return
    setLoading(true)
    const { data, error } = await supabase.from('projects').select('*').order('sort_order', { ascending: true })
    if (!error && data) setProjects(data.map(mapProjectRow))
    setLoading(false)
  }

  useEffect(() => {
    load()
  }, [])

  function startEdit(p: Project) {
    setEditingId(p.id)
    setForm({
      title: p.title,
      short_description: p.shortDescription,
      full_description: p.fullDescription,
      technologies: p.technologies.join(', '),
      github_url: p.githubUrl ?? '',
      live_url: p.liveUrl ?? '',
      category: p.category,
      project_date: p.date,
      featured: p.featured,
    })
  }

  function resetForm() {
    setEditingId(null)
    setForm(emptyForm)
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!supabase) return
    setSaving(true)
    setError(null)

    const payload = {
      title: form.title,
      short_description: form.short_description,
      full_description: form.full_description,
      technologies: form.technologies.split(',').map((t) => t.trim()).filter(Boolean),
      github_url: form.github_url || null,
      live_url: form.live_url || null,
      category: form.category,
      project_date: form.project_date,
      featured: form.featured,
    }

    const { error } = editingId
      ? await supabase.from('projects').update(payload).eq('id', editingId)
      : await supabase.from('projects').insert(payload)

    setSaving(false)
    if (error) {
      setError(error.message)
      return
    }
    resetForm()
    load()
  }

  async function handleDelete(id: string) {
    if (!supabase) return
    if (!confirm('Delete this project?')) return
    await supabase.from('projects').delete().eq('id', id)
    load()
  }

  const inputStyle = {
    borderColor: 'var(--border)',
    backgroundColor: 'var(--bg)',
    color: 'var(--text)',
  }

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <h2 className="font-display text-lg font-semibold" style={{ color: 'var(--text)' }}>
          {editingId ? 'Edit project' : 'Add project'}
        </h2>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <input required placeholder="Title" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" style={inputStyle} />
          <input required placeholder="Short description" value={form.short_description} onChange={(e) => setForm({ ...form, short_description: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" style={inputStyle} />
          <textarea required placeholder="Full description" value={form.full_description} onChange={(e) => setForm({ ...form, full_description: e.target.value })} rows={4} className="w-full rounded-lg border px-3 py-2 text-sm" style={inputStyle} />
          <input placeholder="Technologies (comma separated)" value={form.technologies} onChange={(e) => setForm({ ...form, technologies: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" style={inputStyle} />
          <div className="grid grid-cols-2 gap-3">
            <input placeholder="Category" value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="rounded-lg border px-3 py-2 text-sm" style={inputStyle} />
            <input placeholder="Date (e.g. 2026)" value={form.project_date} onChange={(e) => setForm({ ...form, project_date: e.target.value })} className="rounded-lg border px-3 py-2 text-sm" style={inputStyle} />
          </div>
          <input placeholder="GitHub URL" value={form.github_url} onChange={(e) => setForm({ ...form, github_url: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" style={inputStyle} />
          <input placeholder="Live demo URL" value={form.live_url} onChange={(e) => setForm({ ...form, live_url: e.target.value })} className="w-full rounded-lg border px-3 py-2 text-sm" style={inputStyle} />
          <label className="flex items-center gap-2 text-sm" style={{ color: 'var(--text)' }}>
            <input type="checkbox" checked={form.featured} onChange={(e) => setForm({ ...form, featured: e.target.checked })} />
            Featured
          </label>
          {error && <p className="text-sm" style={{ color: '#DC5B4B' }}>{error}</p>}
          <div className="flex gap-2">
            <button type="submit" disabled={saving} className="rounded-full px-5 py-2 text-sm font-medium text-white disabled:opacity-50" style={{ backgroundColor: 'var(--accent)' }}>
              {saving ? 'Saving…' : editingId ? 'Update' : 'Add project'}
            </button>
            {editingId && (
              <button type="button" onClick={resetForm} className="rounded-full border px-5 py-2 text-sm" style={{ borderColor: 'var(--border)', color: 'var(--text)' }}>
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <div>
        <h2 className="font-display text-lg font-semibold" style={{ color: 'var(--text)' }}>Existing projects</h2>
        {loading ? (
          <p className="mt-4 text-sm" style={{ color: 'var(--text-muted)' }}>Loading…</p>
        ) : (
          <div className="mt-4 space-y-3">
            {projects.map((p) => (
              <div key={p.id} className="flex items-center justify-between rounded-xl border p-4" style={{ borderColor: 'var(--border)' }}>
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--text)' }}>{p.title}</p>
                  <p className="text-xs" style={{ color: 'var(--text-muted)' }}>{p.category}</p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => startEdit(p)} className="text-xs underline" style={{ color: 'var(--accent)' }}>Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="text-xs underline" style={{ color: '#DC5B4B' }}>Delete</button>
                </div>
              </div>
            ))}
            {projects.length === 0 && <p className="text-sm" style={{ color: 'var(--text-muted)' }}>No projects in the database yet — add one on the left.</p>}
          </div>
        )}
      </div>
    </div>
  )
}

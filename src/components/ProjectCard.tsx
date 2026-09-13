import { useState } from 'react'
import type { Project } from '../data/seed'
import Modal from './Modal'

export default function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="group flex h-full flex-col rounded-2xl border p-6 text-left transition-transform hover:-translate-y-0.5"
        style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
      >
        <div className="flex items-start justify-between gap-3">
          <span className="font-mono text-xs" style={{ color: 'var(--accent)' }}>{project.category}</span>
          <span className="font-mono text-xs" style={{ color: 'var(--text-muted)' }}>{project.date}</span>
        </div>
        <h3 className="font-display mt-3 text-lg font-semibold" style={{ color: 'var(--text)' }}>
          {project.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
          {project.shortDescription}
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <span
              key={t}
              className="rounded-full border px-2.5 py-1 text-xs"
              style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}
            >
              {t}
            </span>
          ))}
        </div>
      </button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <span className="font-mono text-xs" style={{ color: 'var(--accent)' }}>{project.category} · {project.date}</span>
        <h3 className="font-display mt-2 text-2xl font-semibold" style={{ color: 'var(--text)' }}>{project.title}</h3>
        <p className="mt-4 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{project.fullDescription}</p>
        <div className="mt-5 flex flex-wrap gap-2">
          {project.technologies.map((t) => (
            <span key={t} className="rounded-full border px-2.5 py-1 text-xs" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
              {t}
            </span>
          ))}
        </div>
        <div className="mt-6 flex gap-3">
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noreferrer" className="rounded-full border px-4 py-2 text-sm" style={{ borderColor: 'var(--border)', color: 'var(--text)' }}>
              View code
            </a>
          )}
          {project.liveUrl && (
            <a href={project.liveUrl} target="_blank" rel="noreferrer" className="rounded-full px-4 py-2 text-sm text-white" style={{ backgroundColor: 'var(--accent)' }}>
              Live demo
            </a>
          )}
          {!project.githubUrl && !project.liveUrl && (
            <p className="text-xs italic" style={{ color: 'var(--text-muted)' }}>Links added soon.</p>
          )}
        </div>
      </Modal>
    </>
  )
}

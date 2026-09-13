import type { Certificate } from '../data/seed'

export default function CertificateCard({ cert }: { cert: Certificate }) {
  const content = (
    <div
      className="flex h-full flex-col justify-between rounded-2xl border p-5 transition-transform hover:-translate-y-0.5"
      style={{ backgroundColor: 'var(--surface)', borderColor: 'var(--border)', boxShadow: 'var(--shadow)' }}
    >
      <div>
        <h3 className="font-display text-base font-semibold" style={{ color: 'var(--text)' }}>{cert.title}</h3>
        <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>{cert.organization}</p>
      </div>
      <p className="font-mono mt-4 text-xs" style={{ color: 'var(--accent)' }}>{cert.issueDate}</p>
    </div>
  )

  if (cert.credentialUrl) {
    return (
      <a href={cert.credentialUrl} target="_blank" rel="noreferrer" className="block h-full">
        {content}
      </a>
    )
  }
  return content
}

import Nav from '../components/Nav'
import DataNetworkHero from '../components/DataNetworkHero'
import HudCoreWidget from '../components/HudCoreWidget'
import TerminalWidget from '../components/TerminalWidget'
import SectionHeading from '../components/SectionHeading'
import ProjectCard from '../components/ProjectCard'
import CertificateCard from '../components/CertificateCard'
import { useContent } from '../hooks/useContent'
import {
  profile as seedProfile,
  skills as seedSkills,
  projects as seedProjects,
  certificates as seedCertificates,
  experience as seedExperience,
  education as seedEducation,
  type Project,
  type Certificate,
  type Skill,
  type Experience,
  type Education,
  type Profile,
} from '../data/seed'
import {
  mapProjectRow,
  mapCertificateRow,
  mapSkillRow,
  mapExperienceRow,
  mapEducationRow,
  mapProfileRow,
} from '../data/mappers'

export default function Home() {
  const { data: profile } = useContent<any, Profile>('profile', seedProfile, (rows) =>
    rows[0] ? mapProfileRow(rows[0]) : seedProfile
  )
  const { data: skills } = useContent<any, Skill[]>('skills', seedSkills, (rows) => rows.map(mapSkillRow), 'sort_order')
  const { data: projects } = useContent<any, Project[]>('projects', seedProjects, (rows) => rows.map(mapProjectRow), 'sort_order')
  const { data: certificates } = useContent<any, Certificate[]>('certificates', seedCertificates, (rows) => rows.map(mapCertificateRow), 'sort_order')
  const { data: experience } = useContent<any, Experience[]>('experience', seedExperience, (rows) => rows.map(mapExperienceRow), 'sort_order')
  const { data: education } = useContent<any, Education[]>('education', seedEducation, (rows) => rows.map(mapEducationRow), 'sort_order')

  const skillCategories = Array.from(new Set(skills.map((s) => s.category)))
  const featured = projects.filter((p) => p.featured)
  const rest = projects.filter((p) => !p.featured)

  return (
    <div id="top">
      <Nav name={profile.name} />

      {/* Hero */}
      <section className="relative overflow-hidden border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-20 md:grid-cols-2 md:py-28">
          <div>
            <div className="mb-6 flex flex-wrap gap-2">
              <span className="glow-border inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] tracking-widest" style={{ backgroundColor: 'var(--surface)', color: 'var(--accent)' }}>
                <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: 'var(--accent)' }} />
                AVAILABLE FOR WORK
              </span>
              <span className="rounded-full border px-3 py-1 font-mono text-[10px] tracking-widest" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
                PORTFOLIO 2026
              </span>
            </div>

            <p className="font-mono text-sm" style={{ color: 'var(--accent)' }}>{profile.title}</p>
            <h1 className="font-display mt-3 text-4xl font-semibold leading-[1.1] tracking-tight sm:text-5xl" style={{ color: 'var(--text)' }}>
              {profile.name}
            </h1>
            <p className="mt-5 max-w-md text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              {profile.bio}
            </p>

            <div className="mt-6 flex items-center gap-3">
              <span className="font-mono text-[10px] tracking-widest" style={{ color: 'var(--text-muted)' }}>LIVE STATUS</span>
              <span className="h-px flex-1" style={{ backgroundColor: 'var(--border)' }} />
            </div>

            <div className="mt-4 flex flex-wrap gap-3">
              <a href="#projects" className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-xs" style={{ borderColor: 'var(--border)', color: 'var(--text)' }}>
                {'</>'} CODE
              </a>
              <a href="#about" className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-xs" style={{ borderColor: 'var(--border)', color: 'var(--text)' }}>
                👤 PROFILE
              </a>
              {profile.github && (
                <a href={profile.github} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-mono text-xs" style={{ borderColor: 'var(--border)', color: 'var(--text)' }}>
                  🗂️ SOURCE
                </a>
              )}
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#projects" className="glow-border rounded-full px-5 py-2.5 text-sm font-medium text-white" style={{ backgroundColor: 'var(--accent)' }}>
                See my work
              </a>
              <a href="#contact" className="rounded-full border px-5 py-2.5 text-sm font-medium" style={{ borderColor: 'var(--border)', color: 'var(--text)' }}>
                Get in touch
              </a>
            </div>
          </div>

          <div className="relative flex h-auto items-center justify-center">
            <div className="absolute inset-0 -z-10 opacity-60">
              <DataNetworkHero />
            </div>
            <HudCoreWidget projectsCount={projects.length} skillsCount={skills.length} />
          </div>
        </div>
      </section>

      {/* About / Full-stack intro */}
      <section id="about" className="border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto max-w-6xl px-5 py-20">
          <SectionHeading kicker="About" title="Background" />
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <p className="max-w-md text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>{profile.bio}</p>
              <div className="mt-5 flex flex-wrap gap-2">
                {skills.slice(0, 6).map((s) => (
                  <span key={s.id} className="rounded-full border px-3 py-1 font-mono text-xs" style={{ borderColor: 'var(--border)', color: 'var(--accent)' }}>
                    {s.name}
                  </span>
                ))}
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {profile.cvUrl && (
                  <a href={profile.cvUrl} target="_blank" rel="noreferrer" className="glow-border rounded-full px-5 py-2.5 text-sm font-medium text-white" style={{ backgroundColor: 'var(--accent)' }}>
                    Download CV
                  </a>
                )}
                <a href="#projects" className="rounded-full border px-5 py-2.5 text-sm font-medium" style={{ borderColor: 'var(--border)', color: 'var(--text)' }}>
                  View Projects
                </a>
              </div>
            </div>
            <TerminalWidget />
          </div>

          <div className="mt-14 grid gap-10 md:grid-cols-[auto,1fr]">
            {profile.profileImage && (
              <div className="glow-border h-40 w-40 shrink-0 overflow-hidden rounded-2xl" style={{ backgroundColor: 'var(--surface-2)' }}>
                <img src={profile.profileImage} alt={profile.name} className="h-full w-full object-cover" />
              </div>
            )}
            <div>
              {profile.quote && (
                <blockquote className="rounded-2xl border-l-4 p-4 text-sm italic" style={{ borderColor: 'var(--accent)', backgroundColor: 'var(--surface)', color: 'var(--text-muted)' }}>
                  "{profile.quote}"
                </blockquote>
              )}
              <div className="mt-4 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border p-5" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
                  <p className="font-display text-3xl font-semibold" style={{ color: 'var(--accent)' }}>{projects.length}</p>
                  <p className="mt-1 font-mono text-xs tracking-wide" style={{ color: 'var(--text-muted)' }}>TOTAL PROJECTS</p>
                </div>
                <div className="rounded-2xl border p-5" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
                  <p className="font-display text-3xl font-semibold" style={{ color: 'var(--accent)' }}>{certificates.length}</p>
                  <p className="mt-1 font-mono text-xs tracking-wide" style={{ color: 'var(--text-muted)' }}>CERTIFICATES</p>
                </div>
                <div className="rounded-2xl border p-5" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
                  <p className="font-display text-3xl font-semibold" style={{ color: 'var(--accent)' }}>{skills.length}</p>
                  <p className="mt-1 font-mono text-xs tracking-wide" style={{ color: 'var(--text-muted)' }}>SKILLS</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            {education.map((ed) => (
              <div key={ed.id} className="rounded-2xl border p-5" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
                <p className="font-display text-sm font-semibold" style={{ color: 'var(--text)' }}>{ed.degree}</p>
                <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>{ed.institution}</p>
                {(ed.startDate || ed.endDate) && (
                  <p className="font-mono mt-2 text-xs" style={{ color: 'var(--accent)' }}>
                    {ed.startDate || '—'} – {ed.endDate ?? 'Present'}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" className="border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto max-w-6xl px-5 py-20">
          <SectionHeading kicker="Skills" title="Tools & methods" description="Grouped by how they're used day to day." />
          <div className="grid gap-8 sm:grid-cols-2">
            {skillCategories.map((cat) => (
              <div key={cat}>
                <h3 className="font-display text-sm font-semibold" style={{ color: 'var(--text)' }}>{cat}</h3>
                <div className="mt-3 flex flex-wrap gap-2">
                  {skills.filter((s) => s.category === cat).map((s) => (
                    <span key={s.id} className="rounded-full border px-3 py-1.5 text-sm" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
                      {s.name}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto max-w-6xl px-5 py-20">
          <SectionHeading kicker="Work" title="Projects" description="Click any project for the full breakdown." />
          {featured.length > 0 && (
            <div className="mb-8 grid gap-5 sm:grid-cols-2">
              {featured.map((p) => <ProjectCard key={p.id} project={p} />)}
            </div>
          )}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((p) => <ProjectCard key={p.id} project={p} />)}
          </div>
        </div>
      </section>

      {/* Certifications */}
      <section id="certifications" className="border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto max-w-6xl px-5 py-20">
          <SectionHeading kicker="Credentials" title="Certifications" />
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {certificates.map((c) => <CertificateCard key={c.id} cert={c} />)}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto max-w-6xl px-5 py-20">
          <SectionHeading kicker="Career" title="Experience" />
          <div className="space-y-6">
            {experience.map((e) => (
              <div key={e.id} className="rounded-2xl border p-6" style={{ borderColor: 'var(--border)', backgroundColor: 'var(--surface)' }}>
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h3 className="font-display text-base font-semibold" style={{ color: 'var(--text)' }}>{e.position}</h3>
                  <span className="font-mono text-xs" style={{ color: 'var(--accent)' }}>
                    {e.startDate} – {e.endDate ?? 'Present'}
                  </span>
                </div>
                <p className="mt-1 text-sm" style={{ color: 'var(--text-muted)' }}>{e.organization}</p>
                <ul className="mt-4 space-y-2">
                  {e.description.map((d, i) => (
                    <li key={i} className="flex gap-2 text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                      <span style={{ color: 'var(--accent-2)' }}>—</span>{d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insights placeholder */}
      <section id="insights" className="border-b" style={{ borderColor: 'var(--border)' }}>
        <div className="mx-auto max-w-6xl px-5 py-20">
          <SectionHeading kicker="Notes" title="Insights" description="Short write-ups on data problems and what I learned. Add these anytime from the Admin Panel." />
          <div className="rounded-2xl border border-dashed p-10 text-center text-sm" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
            No insights published yet.
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <SectionHeading kicker="Contact" title="Let's talk data" />
          <div className="flex flex-wrap gap-4">
            <a href={`mailto:${profile.email}`} className="glow-border rounded-full px-5 py-2.5 text-sm font-medium text-white" style={{ backgroundColor: 'var(--accent)' }}>
              {profile.email}
            </a>
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="rounded-full border px-5 py-2.5 text-sm font-medium" style={{ borderColor: 'var(--border)', color: 'var(--text)' }}>
                LinkedIn
              </a>
            )}
            {profile.github && (
              <a href={profile.github} target="_blank" rel="noreferrer" className="rounded-full border px-5 py-2.5 text-sm font-medium" style={{ borderColor: 'var(--border)', color: 'var(--text)' }}>
                GitHub
              </a>
            )}
          </div>
        </div>
      </section>

      <footer className="border-t px-5 py-8 text-center text-xs" style={{ borderColor: 'var(--border)', color: 'var(--text-muted)' }}>
        © {new Date().getFullYear()} {profile.name}. Built with React, Tailwind & Supabase.
        <a href="/admin" className="ml-2 underline decoration-dotted">Admin</a>
      </footer>
    </div>
  )
}
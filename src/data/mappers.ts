import type { Project, Certificate, Skill, Experience, Education, Profile } from './seed'

export function mapProjectRow(r: any): Project {
  return {
    id: r.id,
    title: r.title,
    shortDescription: r.short_description,
    fullDescription: r.full_description,
    technologies: r.technologies ?? [],
    githubUrl: r.github_url,
    liveUrl: r.live_url,
    category: r.category,
    date: r.project_date,
    featured: r.featured,
    image: r.image_url,
  }
}

export function mapCertificateRow(r: any): Certificate {
  return {
    id: r.id,
    title: r.title,
    organization: r.organization,
    issueDate: r.issue_date,
    credentialUrl: r.credential_url,
    image: r.image_url,
  }
}

export function mapSkillRow(r: any): Skill {
  return { id: r.id, name: r.name, category: r.category, description: r.description ?? undefined }
}

export function mapExperienceRow(r: any): Experience {
  return {
    id: r.id,
    organization: r.organization,
    position: r.position,
    startDate: r.start_date,
    endDate: r.end_date,
    description: r.description ?? [],
  }
}

export function mapEducationRow(r: any): Education {
  return { id: r.id, institution: r.institution, degree: r.degree, startDate: r.start_date ?? '', endDate: r.end_date }
}

export function mapProfileRow(r: any): Profile {
  return {
    name: r.name,
    title: r.title,
    bio: r.bio,
    quote: r.quote ?? null,
    email: r.email,
    linkedin: r.linkedin,
    github: r.github,
    cvUrl: r.cv_url,
    profileImage: r.profile_image,
  }
}

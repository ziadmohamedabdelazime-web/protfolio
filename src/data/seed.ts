// Real content sourced from Ziad's CV, used as fallback seed data until the
// Supabase database is configured and populated via the Admin Panel.
// No invented projects, stats, results, or dates — only what was provided.

export interface Profile {
  name: string
  title: string
  bio: string
  quote: string | null
  email: string
  linkedin: string
  github: string | null
  cvUrl: string | null
  profileImage: string | null
}

export const profile: Profile = {
  name: 'Ziad Mohamed',
  title: 'Data Analyst',
  bio: 'Detail-oriented Data Analyst with hands-on experience across the full data analysis lifecycle — database design, data cleaning, normalization, relational modeling, KPI development, and interactive dashboard design. Proficient in SQL, Python, Excel, Power BI, and Tableau. Graduate of the Digital Egypt Pioneers Initiative (DEPI) Data Analysis track.',
  quote: null,
  email: 'ziadmohamedabdelazime@gmail.com',
  linkedin: 'https://linkedin.com/in/ziadmohamed43',
  github: null,
  cvUrl: null,
  profileImage: null,
}

export interface Skill {
  id: string
  name: string
  category: 'Data Analysis' | 'Business Intelligence' | 'Other'
  description?: string
}

export const skills: Skill[] = [
  { id: 's1', name: 'SQL', category: 'Data Analysis' },
  { id: 's2', name: 'Python', category: 'Data Analysis' },
  { id: 's3', name: 'Advanced Excel', category: 'Data Analysis' },
  { id: 's4', name: 'Power Query', category: 'Data Analysis' },
  { id: 's5', name: 'Power Pivot (DAX)', category: 'Data Analysis' },
  { id: 's6', name: 'Pivot Tables', category: 'Data Analysis' },
  { id: 's7', name: 'Data Cleaning', category: 'Data Analysis' },
  { id: 's8', name: 'Normalization', category: 'Data Analysis' },
  { id: 's9', name: 'Relational Modeling', category: 'Data Analysis' },
  { id: 's10', name: 'KPI Development', category: 'Data Analysis' },
  { id: 's11', name: 'Trend Analysis', category: 'Data Analysis' },
  { id: 's12', name: 'Power BI', category: 'Business Intelligence' },
  { id: 's13', name: 'Tableau', category: 'Business Intelligence' },
  { id: 's14', name: 'Dashboard Design', category: 'Business Intelligence' },
]

export interface Project {
  id: string
  title: string
  shortDescription: string
  fullDescription: string
  technologies: string[]
  githubUrl: string | null
  liveUrl: string | null
  category: string
  date: string
  featured: boolean
  image: string | null
}

export const projects: Project[] = [
  {
    id: 'p1',
    title: 'Manufacturing Line Analytics Dashboard',
    shortDescription: 'End-to-end analytics solution covering 38 batches, 6 products, and 4 operators.',
    fullDescription:
      'Built an end-to-end analytics solution from raw data ingestion to published dashboard. Performed data cleaning, normalization, and modeling in Python and SQL; engineered KPIs including on-time delivery rate, productivity score (64%), and shift efficiency. Designed Tableau and Power BI dashboards revealing a 92% batch delay rate and comparative shift performance, enabling targeted operational improvements.',
    technologies: ['Python', 'SQL', 'Excel', 'Power BI', 'Tableau'],
    githubUrl: null,
    liveUrl: null,
    category: 'Manufacturing Analytics',
    date: '2026',
    featured: true,
    image: null,
  },
  {
    id: 'p2',
    title: 'Hospital Prescription Management System',
    shortDescription: 'Normalized relational database with multi-table JOINs and aggregate reporting.',
    fullDescription:
      'Designed and built a normalized relational database with 4 tables: Doctor, Patient, Medication, and Prescription. Wrote multi-table JOIN queries to retrieve full prescription records per doctor and per patient, and used subqueries to identify prescriptions with above-average dosages. Built aggregate queries (GROUP BY, HAVING, COUNT) to track total medications per doctor and flag high-volume prescribers.',
    technologies: ['SQL Server'],
    githubUrl: null,
    liveUrl: null,
    category: 'Database Design',
    date: '2025',
    featured: false,
    image: null,
  },
  {
    id: 'p3',
    title: 'ITI Training Center Database System',
    shortDescription: 'Multi-entity schema with self-referencing supervisor relationships.',
    fullDescription:
      'Modeled a multi-entity schema (Student, Instructor, Course, Department, Topic) with self-referencing supervisor relationships and many-to-many enrollment tables. Implemented advanced SQL: subqueries for salary benchmarking, COALESCE for null handling, self-joins for supervisor hierarchies, and stored procedures for parameterized reporting. Created reusable views and aggregate reports for department-level student counts and topic-level course distribution.',
    technologies: ['SQL Server'],
    githubUrl: null,
    liveUrl: null,
    category: 'Database Design',
    date: '2025',
    featured: false,
    image: null,
  },
  {
    id: 'p4',
    title: 'Sales Operations & Performance Dashboards',
    shortDescription: '5 Excel dashboards covering global sales, team performance, and 5-year analytics.',
    fullDescription:
      'Built 5 Excel dashboards covering: global sales profitability, sales team performance and payment trends, sales analysis (2018–2024, 3,500+ orders), financial performance by city and category, and 5-year sales analytics (2020–2024, $6.18M revenue). Used Power Query for automated data transformation, Power Pivot for DAX-based KPI modeling, and interactive slicers for dynamic, decision-ready reporting.',
    technologies: ['Excel', 'Power Query', 'Power Pivot (DAX)'],
    githubUrl: null,
    liveUrl: null,
    category: 'BI Dashboards',
    date: '2024–2025',
    featured: false,
    image: null,
  },
]

export interface Certificate {
  id: string
  title: string
  organization: string
  issueDate: string
  credentialUrl: string | null
  image: string | null
}

export const certificates: Certificate[] = [
  { id: 'c1', title: 'Data Analysis with Power BI & Power Query', organization: 'KorsatCode', issueDate: '2026-01', credentialUrl: null, image: null },
  { id: 'c2', title: 'Advanced Excel', organization: 'Edraak', issueDate: '2026-01', credentialUrl: null, image: null },
  { id: 'c3', title: 'Accounting in Excel', organization: 'TeraCourses', issueDate: '2026-01', credentialUrl: null, image: null },
  { id: 'c4', title: 'Pivot Tables in Excel', organization: 'M3aarf Platform', issueDate: '2026-01', credentialUrl: null, image: null },
]

export interface Experience {
  id: string
  organization: string
  position: string
  startDate: string
  endDate: string | null
  description: string[]
}

export const experience: Experience[] = [
  {
    id: 'e1',
    organization: 'Green Pack | Sticker & Label Manufacturing',
    position: 'Data Analysis Trainee',
    startDate: '2026-07',
    endDate: null,
    description: [
      'Digitizing a fully paper-based production line by designing an Excel-to-SQL Server data pipeline, laying the foundation for real-time Power BI reporting.',
      'Installed and configured SQL Server 2022 as the central data store for daily production batch records.',
    ],
  },
  {
    id: 'e2',
    organization: 'iLearn | Digital Egypt Pioneers Initiative (DEPI) — Ministry of Communications',
    position: 'Data Analyst Intern',
    startDate: '2025-11',
    endDate: '2026-07',
    description: [
      'Executed an end-to-end analytics project on a manufacturing line dataset using SQL, Python, Excel, Power BI, and Tableau.',
      'Wrote optimized SQL queries and Python scripts for cleaning and transforming complex multi-table datasets.',
      'Applied DAX measures and star-schema data modeling to solve real-world business intelligence problems.',
      'Designed and delivered 5+ interactive dashboards to surface operational KPIs and accelerate decision-making.',
    ],
  },
]

export interface Education {
  id: string
  institution: string
  degree: string
  startDate: string
  endDate: string | null
}

export const education: Education[] = [
  {
    id: 'ed1',
    institution: 'Faculty of Computers and Information',
    degree: 'B.Sc. in Computer Science & Information Technology — Cybersecurity Major',
    startDate: '',
    endDate: null,
  },
  {
    id: 'ed2',
    institution: 'Digital Egypt Pioneers Initiative (DEPI) — Ministry of Communications',
    degree: 'Data Analysis Professional Track',
    startDate: '2025-11',
    endDate: '2026-07',
  },
]

export const projectKeys = [
  'upominkly',
  'planning-poker',
  'not-bad-studio',
] as const

export type ProjectKey = (typeof projectKeys)[number]

type Project = {
  name: string
  image: string | undefined
  liveUrl: string
  repoUrl: string | undefined
  published: boolean
  stack: readonly string[]
}

export const projects = {
  upominkly: {
    name: 'Upominkly',
    image: '/images/portfolio/projects/upominkly.webp',
    liveUrl: 'https://www.upominkly.com',
    repoUrl: undefined,
    published: true,
    stack: ['Next.js', 'Supabase', 'Tailwind', 'Vercel'],
  },
  'planning-poker': {
    name: 'Planning Poker',
    image: undefined,
    liveUrl: 'https://planning-poker.sebastiansiejek.dev',
    repoUrl: 'https://github.com/sebastiansiejek/planning-poker',
    published: false,
    stack: [
      'Next.js',
      'TypeScript',
      'WebSockets',
      'Supabase',
      'Tailwind',
      'Vercel',
    ],
  },
  'not-bad-studio': {
    name: 'Not Bad Studio',
    image: '/images/portfolio/projects/not-bad-studio.webp',
    liveUrl: 'https://notbadstudio.pl',
    repoUrl: undefined,
    published: true,
    stack: ['WordPress', 'WooCommerce', 'PHP', 'JavaScript'],
  },
} as const satisfies Record<ProjectKey, Project>

export const isProjectKey = (value: string): value is ProjectKey =>
  projectKeys.includes(value as ProjectKey)

export const publishedProjectKeys = projectKeys.filter(
  (projectKey) => projects[projectKey].published,
)

export const isPublishedProjectKey = (
  value: string,
): value is ProjectKey => isProjectKey(value) && projects[value].published

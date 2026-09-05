export const projectKeys = [
  'upominkly',
  'planning-poker',
  'not-bad-studio',
] as const

export type ProjectKey = (typeof projectKeys)[number]

type Project = {
  name: string
  image: string | null
  liveUrl: string
  repoUrl: string | null
  stack: readonly string[]
}

export const projects = {
  upominkly: {
    name: 'Upominkly',
    image: '/images/portfolio/projects/upominkly.webp',
    liveUrl: 'https://www.upominkly.com',
    repoUrl: null,
    stack: ['Next.js', 'Supabase', 'Tailwind', 'Vercel'],
  },
  'planning-poker': {
    name: 'Planning Poker',
    image: null,
    liveUrl: 'https://planning-poker.sebastiansiejek.dev',
    repoUrl: 'https://github.com/sebastiansiejek/planning-poker',
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
    repoUrl: null,
    stack: ['WordPress', 'WooCommerce', 'PHP', 'JavaScript'],
  },
} as const satisfies Record<ProjectKey, Project>

export const isProjectKey = (value: string): value is ProjectKey =>
  projectKeys.includes(value as ProjectKey)

interface IPost {
  content: string
  excerpt?: string
  publishedAt: string
  slug: string
  title: string
  thumbnail?: string
  tags: string
  url?: string
}

type IPosts = IPost[]

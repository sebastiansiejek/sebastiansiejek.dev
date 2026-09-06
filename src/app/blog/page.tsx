import { getAllResources, sortResources } from 'shared/lib/resources'
import path from 'node:path'
import { Metadata } from 'next'
import BlogPosts from 'shared/ui/blog-posts/blog-posts'

export const metadata: Metadata = {
  title: 'Blog - SebastianSiejek.dev',
  description:
    'Artykuły Sebastiana Siejka o tworzeniu oprogramowania, automatyzacji i narzędziach deweloperskich.',
  alternates: {
    canonical: '/blog',
  },
}

export default function Blog() {
  const posts = sortResources(
    getAllResources(path.join(process.cwd(), 'src/content/posts')),
  )

  return <BlogPosts posts={posts} />
}

import { getAllResources, sortResources } from 'lib/resources/resourcesService'
import path from 'path'
import { Metadata } from 'next'
import BlogPosts from 'shared/ui/BlogPosts'

export const metadata: Metadata = {
  title: 'Blog - SebastianSiejek.dev',
}

export default function Blog() {
  const posts = sortResources(
    getAllResources(path.join(process.cwd(), 'src/content/posts')),
  )

  return <BlogPosts posts={posts} />
}

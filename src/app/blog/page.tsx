import { getAllResources, sortResources } from 'lib/resources/resourcesService'
import path from 'path'
import BlogPosts from 'components/views/BlogPosts'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - SebastianSiejek.dev',
}

export default function Blog() {
  const posts = sortResources(
    getAllResources(path.join(process.cwd(), 'src/content/posts')),
  )

  return <BlogPosts posts={posts} />
}

import path from 'path'
import { Metadata } from 'next'
import BlogPosts from '@/shared/ui/BlogPosts/BlogPosts'
import {
  getAllResources,
  sortResources,
} from '@/shared/lib/resources/resourcesService'

export const metadata: Metadata = {
  title: 'Blog - SebastianSiejek.dev',
}

export default function Blog() {
  const posts = sortResources(
    getAllResources(path.join(process.cwd(), 'src/content/posts')),
  )

  return <BlogPosts posts={posts} />
}

import { MetadataRoute } from 'next'
import * as process from 'node:process'
import { getAllResources } from '@/lib/resources/resourcesService'
import path from 'path'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const blogPosts: MetadataRoute.Sitemap = getAllResources(
    path.join(process.cwd(), 'src/content/posts'),
  ).map((post) => ({
    url: `${process.env.SITE_URL}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [
    {
      url: process.env.SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${process.env.SITE_URL}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogPosts,
  ]
}

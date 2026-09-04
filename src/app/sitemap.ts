import { MetadataRoute } from 'next'
import * as process from 'node:process'
import { getAllResources } from 'lib/resources/resourcesService'
import path from 'path'
import { routing } from 'i18n/routing'
import { getProjectPath } from 'lib/portfolio/paths'
import { projectKeys } from 'lib/portfolio/projects'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.SITE_URL || 'https://sebastiansiejek.dev'
  const blogPosts: MetadataRoute.Sitemap = getAllResources(
    path.join(process.cwd(), 'src/content/posts'),
  ).map((post) => ({
    url: `${siteUrl}/blog/${post.slug}`,
    lastModified: new Date(post.publishedAt),
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  const landingPages: MetadataRoute.Sitemap = routing.locales.map((locale) => ({
    url: `${siteUrl}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1,
    alternates: {
      languages: {
        pl: `${siteUrl}/pl`,
        en: `${siteUrl}/en`,
      },
    },
  }))

  const caseStudies: MetadataRoute.Sitemap = projectKeys.flatMap((projectKey) =>
    routing.locales.map((locale) => ({
      url: `${siteUrl}${getProjectPath(locale, projectKey)}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
      alternates: {
        languages: {
          pl: `${siteUrl}${getProjectPath('pl', projectKey)}`,
          en: `${siteUrl}${getProjectPath('en', projectKey)}`,
        },
      },
    })),
  )

  return [
    ...landingPages,
    ...caseStudies,
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogPosts,
  ]
}

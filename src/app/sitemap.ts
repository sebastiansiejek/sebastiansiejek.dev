import { MetadataRoute } from 'next'
import * as process from 'node:process'
import { getProjectPath, publishedProjectKeys } from 'entities/project'
import { getAllResources } from 'shared/lib/resources/index.server'
import path from 'node:path'
import { routing } from 'shared/i18n/routing'
import { getPathname } from 'shared/i18n/navigation'

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

  const caseStudies: MetadataRoute.Sitemap = publishedProjectKeys.flatMap(
    (projectKey) =>
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

  const privacyPages: MetadataRoute.Sitemap = routing.locales.map((locale) => ({
    url: `${siteUrl}${getPathname({ locale, href: '/privacy' })}`,
    lastModified: new Date(),
    changeFrequency: 'yearly',
    priority: 0.2,
    alternates: {
      languages: {
        pl: `${siteUrl}${getPathname({ locale: 'pl', href: '/privacy' })}`,
        en: `${siteUrl}${getPathname({ locale: 'en', href: '/privacy' })}`,
      },
    },
  }))

  return [
    ...landingPages,
    ...caseStudies,
    ...privacyPages,
    {
      url: `${siteUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    ...blogPosts,
  ]
}

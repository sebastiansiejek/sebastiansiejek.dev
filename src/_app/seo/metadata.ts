import { Metadata } from 'next'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { getProjectPath, type ProjectKey } from 'entities/project'
import { getLocalizedProjects } from 'entities/project/index.server'
import { getPathname } from 'shared/i18n/navigation'

const siteUrl = process.env.SITE_URL || 'https://sebastiansiejek.dev'

export const landingMetadata = async (locale: Locale): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata.landing' })
  const siteT = await getTranslations({ locale, namespace: 'Site' })
  const title = t('title')
  const description = t('description')

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `${siteUrl}/${locale}`,
      languages: {
        pl: `${siteUrl}/pl`,
        en: `${siteUrl}/en`,
        'x-default': `${siteUrl}/pl`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}/${locale}`,
      siteName: 'Sebastian Siejek',
      locale: locale === 'pl' ? 'pl_PL' : 'en_US',
      type: 'website',
      images: [
        {
          url: `${siteUrl}/images/portfolio/hero.webp`,
          width: 1109,
          height: 1536,
          alt: siteT('hero.imageAlt'),
        },
      ],
    },
  }
}

export const privacyMetadata = async (locale: Locale): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata.privacy' })
  const path = getPathname({ locale, href: '/privacy' })
  const polishPath = getPathname({ locale: 'pl', href: '/privacy' })
  const englishPath = getPathname({ locale: 'en', href: '/privacy' })
  const title = t('title')
  const description = t('description')

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: `${siteUrl}${path}`,
      languages: {
        pl: `${siteUrl}${polishPath}`,
        en: `${siteUrl}${englishPath}`,
        'x-default': `${siteUrl}${polishPath}`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteUrl}${path}`,
      siteName: 'Sebastian Siejek',
      locale: locale === 'pl' ? 'pl_PL' : 'en_US',
      type: 'website',
    },
  }
}

export const caseStudyMetadata = async (
  locale: Locale,
  projectKey: ProjectKey,
): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'Metadata' })
  const localizedProjects = await getLocalizedProjects(locale)
  const project = localizedProjects[projectKey]
  const path = getProjectPath(locale, projectKey)
  const title = `${project.name} | ${t('caseStudyTitle')}`

  return {
    title: { absolute: title },
    description: project.summary,
    alternates: {
      canonical: `${siteUrl}${path}`,
      languages: {
        pl: `${siteUrl}${getProjectPath('pl', projectKey)}`,
        en: `${siteUrl}${getProjectPath('en', projectKey)}`,
      },
    },
    openGraph: {
      title,
      description: project.summary,
      url: `${siteUrl}${path}`,
      siteName: 'Sebastian Siejek',
      locale: locale === 'pl' ? 'pl_PL' : 'en_US',
      type: 'article',
      images: project.image
        ? [{ url: `${siteUrl}${project.image}`, alt: project.imageAlt }]
        : [
            {
              url: `${siteUrl}/images/portfolio/hero.webp`,
              alt: 'Sebastian Siejek portfolio',
            },
          ],
    },
  }
}

export const notFoundMetadata = async (locale: Locale): Promise<Metadata> => {
  const t = await getTranslations({ locale, namespace: 'NotFound' })

  return {
    title: t('metadataTitle'),
    robots: {
      follow: false,
      index: false,
    },
  }
}

import { brandSocialImages } from 'shared/config/brand'
import { landingMetadata, privacyMetadata, caseStudyMetadata } from './metadata'
import { siteMetadata } from './site-metadata'

let mockProjectImage: string | undefined = '/images/project.webp'

jest.mock('next-intl/server', () => ({
  getTranslations: jest.fn(async ({ locale, namespace }: { locale: string; namespace: string }) =>
    (key: string) => `${locale}:${namespace}:${key}`,
  ),
}))

jest.mock('../../shared/i18n/navigation', () => ({
  getPathname: ({ locale }: { locale: string }) => `/${locale}/privacy`,
}))

jest.mock('../../entities/project', () => ({
  getProjectPath: (locale: string, key: string) => `/${locale}/projects/${key}`,
}))

jest.mock('../../entities/project/index.server', () => ({
  getLocalizedProjects: jest.fn(async () => ({
    upominkly: {
      name: 'Upominkly',
      summary: 'Event gift lists',
      image: mockProjectImage,
      imageAlt: 'Upominkly demo',
    },
  })),
}))

const expectedImage = (locale: 'pl' | 'en') => ({
  ...brandSocialImages[locale],
  url: new URL(brandSocialImages[locale].url, siteMetadata.metadataBase ?? undefined).toString(),
})

beforeEach(() => {
  mockProjectImage = '/images/project.webp'
})

describe('branded sharing metadata', () => {
  it.each(['pl', 'en'] as const)('uses the %s brand card for landing and privacy', async (locale) => {
    for (const metadata of [await landingMetadata(locale), await privacyMetadata(locale)]) {
      expect(metadata.openGraph).toMatchObject({ images: [expectedImage(locale)] })
      expect(metadata.twitter).toMatchObject({
        card: 'summary_large_image',
        images: [expectedImage(locale)],
        title: metadata.openGraph?.title,
        description: metadata.description,
      })
    }
  })

  it('preserves project-specific images for both sharing protocols', async () => {
    const metadata = await caseStudyMetadata('en', 'upominkly')
    const image = {
      url: new URL('/images/project.webp', siteMetadata.metadataBase ?? undefined).toString(),
      alt: 'Upominkly demo',
    }
    expect(metadata.openGraph).toMatchObject({ images: [image] })
    expect(metadata.twitter).toMatchObject({ card: 'summary_large_image', images: [image] })
  })

  it('uses the localized brand card when a project has no image', async () => {
    mockProjectImage = undefined
    const metadata = await caseStudyMetadata('en', 'upominkly')
    expect(metadata.openGraph).toMatchObject({ images: [expectedImage('en')] })
    expect(metadata.twitter).toMatchObject({ images: [expectedImage('en')] })
  })

  it('provides the Polish branded fallback to unlocalized pages', () => {
    expect(siteMetadata.openGraph).toMatchObject({ images: [expectedImage('pl')] })
    expect(siteMetadata.twitter).toMatchObject({ card: 'summary_large_image', images: [expectedImage('pl')] })
  })
})

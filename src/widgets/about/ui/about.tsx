import Image from 'next/image'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { siteConfig } from 'shared/config/site'
import { SiteContainer } from 'shared/ui/site-layout'
import { ArrowLink } from 'shared/ui/arrow-link'
import { SectionTitle } from 'shared/ui/typography'

export async function About({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'Site.about' })
  const paragraphs = [
    t('paragraphs.experience', {
      years: siteConfig.facts.commercialExperienceYears,
      users: siteConfig.facts.saasUsers,
    }),
    t('paragraphs.approach'),
  ]

  return (
    <section
      className="bg-secondary py-20 md:py-28 lg:py-36"
      id="about"
    >
      <SiteContainer className="grid grid-cols-5 items-center gap-4 md:gap-12 lg:gap-32 max-md:grid-cols-1">
        <div
          className="col-span-2 flex min-h-152 -scale-x-100 flex-col justify-between max-md:col-auto max-md:min-h-108"
          role="img"
          aria-label={t('photoAlt')}
        >
          <Image
            src="/images/portfolio/o-mnie.webp"
            fill
            alt=""
            className="object-contain mask-b-from-50% mask-b-to-85%"
          />
        </div>
        <div className="col-span-3 max-md:col-auto">
          <SectionTitle>{t('title')}</SectionTitle>
          {paragraphs.map((paragraph) => (
            <p
              className="mt-6 max-w-prose text-base text-muted-foreground md:text-lg"
              key={paragraph}
            >
              {paragraph}
            </p>
          ))}
          <ArrowLink
            className="mt-8"
            direction="external"
            href="https://www.linkedin.com/in/sebastiansiejek/"
            target="_blank"
            rel="noreferrer"
          >
            {t('linkedin')}
          </ArrowLink>
        </div>
      </SiteContainer>
    </section>
  )
}

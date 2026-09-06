import Image from 'next/image'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { ActionLink } from 'shared/ui/action'
import { SiteContainer } from 'shared/ui/site-layout'
import { SectionLabel } from 'shared/ui/section-heading'

export async function HomeHero({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'Site.hero' })

  return (
    <section aria-labelledby="hero-title">
      <SiteContainer className="grid grid-cols-3 items-end gap-8 lg:gap-20 max-md:grid-cols-1">
        <div className="relative z-10 col-span-2 pt-4 md:py-8 lg:py-12 max-md:col-auto">
          <SectionLabel>{t('eyebrow')}</SectionLabel>
          <h1
            className="m-0 max-w-3xl text-4xl leading-none font-semibold tracking-tighter text-foreground text-balance md:text-5xl lg:text-6xl"
            id="hero-title"
          >
            {t('title')}
          </h1>
          <p className="mt-5 max-w-prose text-base leading-relaxed text-muted md:mt-6 md:text-lg">
            {t('description')}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3 max-md:mt-6 max-md:flex-col max-md:items-stretch">
            <ActionLink
              className="max-md:w-full max-md:whitespace-normal"
              href={`/${locale}#contact`}
            >
              {t('primary')}
            </ActionLink>
            <ActionLink
              className="max-md:w-full max-md:whitespace-normal"
              href={`/${locale}#work`}
              variant="secondary"
            >
              {t('secondary')}
            </ActionLink>
          </div>
        </div>
        <figure className="relative m-0 h-full min-h-40 self-end overflow-hidden max-md:min-h-80">
          <Image
            className="z-10 object-contain object-bottom"
            src="/images/portfolio/hero.webp"
            alt={t('imageAlt')}
            fill
            priority
            sizes="(max-width: 767px) 100vw, 48vw"
          />
        </figure>
      </SiteContainer>
    </section>
  )
}

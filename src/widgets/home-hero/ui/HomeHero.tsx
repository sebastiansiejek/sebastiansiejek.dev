import Image from 'next/image'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { ActionLink } from 'shared/ui/portfolio-button'
import { SiteContainer } from 'shared/ui/portfolio-layout'
import { SectionLabel } from 'shared/ui/portfolio-section-heading'

export async function HomeHero({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'Site.hero' })

  return (
    <section aria-labelledby="hero-title">
      <SiteContainer className="grid grid-cols-[minmax(0,1.65fr)_minmax(280px,0.85fr)] items-end gap-[clamp(2rem,4vw,5rem)] max-lg:grid-cols-[minmax(0,1.4fr)_minmax(250px,0.6fr)] max-lg:gap-8 max-md:grid-cols-1">
        <div className="relative z-1 pt-[3vh] lg:pt-0 md:py-[clamp(2rem,8vh,3rem)]">
          <SectionLabel>{t('eyebrow')}</SectionLabel>
          <h1
            className="m-0 max-w-[18ch] text-[clamp(2.6rem,4.4vw,4.25rem)] leading-[1.02] font-[650] tracking-[-0.055em] text-portfolio-text text-balance max-lg:text-[clamp(2.5rem,5vw,3.25rem)] max-md:max-w-[16ch] max-md:text-[clamp(2.25rem,10.5vw,3.25rem)]"
            id="hero-title"
          >
            {t('title')}
          </h1>
          <p className="mt-6 max-w-[58ch] text-[clamp(1rem,1.3vw,1.16rem)] leading-[1.65] text-portfolio-muted max-md:mt-[1.1rem]">
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
        <figure className="relative m-0 h-full min-h-40 self-end overflow-hidden max-md:min-h-82.5">
          <Image
            className="z-1 object-contain object-bottom"
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

import Image from 'next/image'
import Link from 'next/link'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { ActionLink } from 'shared/ui/portfolio-button'
import { SiteContainer } from 'shared/ui/portfolio-layout'
import {
  SectionHeading,
  SectionLabel,
} from 'shared/ui/portfolio-section-heading'
import { ArrowLink } from 'shared/ui/portfolio-text-link'

export async function LatestWriting({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'Site.writing' })

  return (
    <section id="writing">
      <SiteContainer className="py-[clamp(5rem,10vw,9rem)] max-md:py-20">
        <SectionHeading title={t('title')} intro={t('intro')} />
        <div className="grid grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] items-center gap-[clamp(2rem,6vw,6rem)] max-md:grid-cols-1 max-md:gap-6">
          <Link
            className="group relative block aspect-[16/10] overflow-hidden rounded-xl bg-portfolio-surface after:pointer-events-none after:absolute after:inset-0 after:ring-1 after:ring-inset after:ring-portfolio-text/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-accent focus-visible:ring-offset-2 focus-visible:ring-offset-portfolio-bg"
            href="/blog/daily-standup"
            aria-label={t('featured')}
          >
            <Image
              className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]"
              src="/images/posts/daily-standup/daily-standup.png"
              alt=""
              fill
              sizes="(max-width: 767px) 100vw, 54vw"
            />
          </Link>
          <div>
            <SectionLabel className="mb-3">{t('language')}</SectionLabel>
            <h3 className="m-0 text-[clamp(1.6rem,3vw,2.4rem)] font-[650] tracking-[-0.04em] text-portfolio-text">
              {t('featured')}
            </h3>
            <p className="mt-3 max-w-[58ch] text-portfolio-muted">
              {t('featuredDescription')}
            </p>
            <ArrowLink href="/blog/daily-standup">{t('read')}</ArrowLink>
          </div>
        </div>
        <ActionLink className="mt-12" href="/blog" variant="secondary">
          {t('all')}
        </ActionLink>
      </SiteContainer>
    </section>
  )
}

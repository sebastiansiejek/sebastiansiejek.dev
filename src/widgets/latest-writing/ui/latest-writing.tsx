import Image from 'next/image'
import Link from 'next/link'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { ActionLink } from 'shared/ui/action'
import { SiteContainer } from 'shared/ui/site-layout'
import {
  SectionHeading,
  SectionLabel,
} from 'shared/ui/section-heading'
import { ArrowLink } from 'shared/ui/arrow-link'
import { CardTitle } from 'shared/ui/typography'
import { MediaFrame } from 'shared/ui/media-frame'

export async function LatestWriting({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'Site.writing' })

  return (
    <section id="writing">
      <SiteContainer className="py-20 md:py-28 lg:py-36">
        <SectionHeading title={t('title')} intro={t('intro')} />
        <div className="grid grid-cols-5 items-center gap-6 md:gap-12 lg:gap-24 max-md:grid-cols-1">
          <MediaFrame
            as={Link}
            interactive
            className="group col-span-3 block aspect-8/5 max-md:col-auto"
            href="/blog/daily-standup"
            aria-label={t('featured')}
          >
            <Image
              className="object-cover transition-transform duration-500 ease-fluid group-hover:scale-105"
              src="/images/posts/daily-standup/daily-standup.png"
              alt=""
              fill
              sizes="(max-width: 767px) 100vw, 54vw"
            />
          </MediaFrame>
          <div className="col-span-2 max-md:col-auto">
            <SectionLabel className="mb-3">{t('language')}</SectionLabel>
            <CardTitle>{t('featured')}</CardTitle>
            <p className="mt-3 max-w-prose text-muted">
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

import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { ActionLink } from 'shared/ui/action'
import { SiteContainer, SiteShell } from 'shared/ui/site-layout'
import { SectionLabel } from 'shared/ui/section-heading'
import { SiteFooter } from 'widgets/site-footer'
import { SiteHeader } from 'widgets/site-header'

export async function NotFoundPage({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'NotFound' })
  const alternateLocale = locale === 'pl' ? 'en' : 'pl'

  return (
    <SiteShell lang={locale}>
      <SiteHeader locale={locale} alternateHref={`/${alternateLocale}`} />
      <main className="flex flex-1">
        <SiteContainer className="flex flex-col items-start justify-center py-16">
          <SectionLabel>{t('eyebrow')}</SectionLabel>
          <h1 className="m-0 max-w-xl text-5xl leading-none font-semibold tracking-tighter md:text-7xl lg:text-8xl">
            {t('title')}
          </h1>
          <p className="mt-6 text-muted">{t('description')}</p>
          <ActionLink className="mt-8" href={`/${locale}`}>
            {t('back')}
          </ActionLink>
        </SiteContainer>
      </main>
      <SiteFooter locale={locale} />
    </SiteShell>
  )
}

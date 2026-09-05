import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { ActionLink } from 'shared/ui/portfolio-button'
import { SiteContainer, SiteShell } from 'shared/ui/portfolio-layout'
import { SectionLabel } from 'shared/ui/portfolio-section-heading'
import { SiteFooter } from 'widgets/site-footer'
import { SiteHeader } from 'widgets/site-header'

export async function NotFoundPage({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'NotFound' })
  const alternateLocale = locale === 'pl' ? 'en' : 'pl'

  return (
    <SiteShell lang={locale}>
      <SiteHeader locale={locale} alternateHref={`/${alternateLocale}`} />
      <main>
        <SiteContainer className="flex min-h-[calc(100dvh-188px)] flex-col items-start justify-center py-16">
          <SectionLabel>{t('eyebrow')}</SectionLabel>
          <h1 className="m-0 max-w-[12ch] text-[clamp(3rem,8vw,7rem)] leading-[0.95] font-[650] tracking-[-0.065em]">
            {t('title')}
          </h1>
          <p className="mt-6 text-portfolio-muted">{t('description')}</p>
          <ActionLink className="mt-8" href={`/${locale}`}>
            {t('back')}
          </ActionLink>
        </SiteContainer>
      </main>
      <SiteFooter locale={locale} />
    </SiteShell>
  )
}

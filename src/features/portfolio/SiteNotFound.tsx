import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { PortfolioButtonLink } from './PortfolioButton'
import { PortfolioHeader } from './PortfolioHeader'
import { PortfolioLabel } from './PortfolioSectionHeading'
import { PortfolioContainer, PortfolioShell } from './PortfolioShell'
import { SiteFooter } from './SiteFooter'

export async function SiteNotFound({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'NotFound' })
  const alternateLocale = locale === 'pl' ? 'en' : 'pl'

  return (
    <PortfolioShell lang={locale}>
      <PortfolioHeader locale={locale} alternateHref={`/${alternateLocale}`} />
      <main>
        <PortfolioContainer className="flex min-h-[calc(100dvh-188px)] flex-col items-start justify-center py-16">
          <PortfolioLabel>{t('eyebrow')}</PortfolioLabel>
          <h1 className="m-0 max-w-[12ch] text-[clamp(3rem,8vw,7rem)] leading-[0.95] font-[650] tracking-[-0.065em]">
            {t('title')}
          </h1>
          <p className="mt-6 text-portfolio-muted">{t('description')}</p>
          <PortfolioButtonLink className="mt-8" href={`/${locale}`}>
            {t('back')}
          </PortfolioButtonLink>
        </PortfolioContainer>
      </main>
      <SiteFooter locale={locale} />
    </PortfolioShell>
  )
}

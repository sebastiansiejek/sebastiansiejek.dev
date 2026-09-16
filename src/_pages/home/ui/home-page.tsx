import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { SiteShell } from 'shared/ui/site-layout'
import { SkipLink } from 'shared/ui/skip-link'
import { About } from 'widgets/about'
import { Contact } from 'widgets/contact'
import { HomeHero } from 'widgets/home-hero'
import { LatestWriting } from 'widgets/latest-writing'
import { ProofStrip } from 'widgets/proof-strip'
import { SelectedWork } from 'widgets/selected-work'
import { Services } from 'widgets/services'
import { SiteFooter } from 'widgets/site-footer'
import { SiteHeader } from 'widgets/site-header'
import { WorkProcess } from 'widgets/work-process'

export async function HomePage({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'Site' })
  const alternateLocale = locale === 'pl' ? 'en' : 'pl'
  const alternateHref = `/${alternateLocale}`

  return (
    <SiteShell lang={locale}>
      <SkipLink href="#main">{t('skipToContent')}</SkipLink>
      <SiteHeader locale={locale} alternateHref={alternateHref} />

      <main id="main">
        <HomeHero locale={locale} />
        <ProofStrip locale={locale} />
        <SelectedWork locale={locale} />
        <Services locale={locale} />
        <WorkProcess locale={locale} />
        <About locale={locale} />
        <LatestWriting locale={locale} />
        <Contact locale={locale} />
      </main>

      <SiteFooter locale={locale} alternateHref={alternateHref} />
    </SiteShell>
  )
}

import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { SiteShell } from 'shared/ui/portfolio-layout'
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

  return (
    <SiteShell lang={locale}>
      <a
        className="fixed top-3 left-3 z-[100] -translate-y-[150%] rounded-lg bg-portfolio-accent px-4 py-[0.7rem] text-portfolio-accent-contrast focus:translate-y-0"
        href="#main"
      >
        {t('skipToContent')}
      </a>
      <SiteHeader locale={locale} alternateHref={`/${alternateLocale}`} />

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

      <SiteFooter locale={locale} />
    </SiteShell>
  )
}

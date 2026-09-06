import Link from 'next/link'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { SiteContainer } from 'shared/ui/portfolio-layout'

type SiteHeaderProps = {
  locale: Locale
  alternateHref: string
}

export async function SiteHeader({ locale, alternateHref }: SiteHeaderProps) {
  const t = await getTranslations({ locale, namespace: 'Site' })
  const home = `/${locale}`
  const links = [
    [t('nav.work'), `${home}#work`],
    [t('nav.services'), `${home}#services`],
    [t('nav.about'), `${home}#about`],
    [t('nav.writing'), `${home}#writing`],
    [t('nav.contact'), `${home}#contact`],
  ]

  return (
    <header className="sticky top-0 z-20 h-[72px] border-b border-portfolio-accent/15 bg-portfolio-bg/90 backdrop-blur-2xl max-md:h-16 [@media(prefers-reduced-transparency:reduce)]:bg-portfolio-bg [@media(prefers-reduced-transparency:reduce)]:backdrop-filter-none">
      <SiteContainer className="flex h-full items-center justify-between gap-8">
        <Link
          className="inline-flex items-center gap-3 text-[0.95rem] font-bold tracking-[-0.02em] text-portfolio-text no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-accent focus-visible:ring-offset-2 focus-visible:ring-offset-portfolio-bg"
          href={home}
          aria-label="Sebastian Siejek"
        >
          <span
            className="grid size-9 place-items-center rounded-lg bg-portfolio-accent font-mono text-[0.8rem] font-medium text-portfolio-accent-contrast"
            aria-hidden="true"
          >
            SS
          </span>
          <span className="max-md:hidden">Sebastian Siejek</span>
        </Link>

        <nav
          className="flex items-center gap-[clamp(1.1rem,2.5vw,2rem)] whitespace-nowrap max-lg:gap-4 max-md:hidden"
          aria-label={t('navigationLabel')}
        >
          {links.map(([label, href]) => (
            <Link
              className="text-[0.86rem] font-semibold text-portfolio-muted no-underline transition-colors duration-[180ms] hover:text-portfolio-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-accent focus-visible:ring-offset-2 focus-visible:ring-offset-portfolio-bg max-lg:text-[0.8rem]"
              key={href}
              href={href}
            >
              {label}
            </Link>
          ))}
          <Link
            className="rounded-lg border border-portfolio-line px-[0.7rem] py-[0.45rem] text-[0.86rem] font-semibold text-portfolio-accent no-underline transition-colors duration-[180ms] hover:text-portfolio-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-accent focus-visible:ring-offset-2 focus-visible:ring-offset-portfolio-bg max-lg:text-[0.8rem]"
            href={alternateHref}
            hrefLang={locale === 'pl' ? 'en' : 'pl'}
          >
            {t('alternateLocaleName')}
          </Link>
        </nav>

        <details className="relative hidden max-md:block">
          <summary className="cursor-pointer list-none rounded-lg border border-portfolio-line px-3 py-[0.55rem] text-[0.82rem] font-bold text-portfolio-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-accent focus-visible:ring-offset-2 focus-visible:ring-offset-portfolio-bg [&::-webkit-details-marker]:hidden">
            {t('menu')}
          </summary>
          <nav
            className="absolute top-[calc(100%+0.75rem)] right-0 grid w-[min(78vw,290px)] rounded-xl border border-portfolio-line bg-portfolio-surface-strong p-3 shadow-[0_18px_45px_rgb(5_8_6_/_0.4)]"
            aria-label="Mobile navigation"
          >
            {links.map(([label, href]) => (
              <Link
                className="rounded-lg p-3 text-portfolio-text no-underline hover:bg-portfolio-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-accent"
                key={href}
                href={href}
              >
                {label}
              </Link>
            ))}
            <Link
              className="rounded-lg p-3 text-portfolio-text no-underline hover:bg-portfolio-accent-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-accent"
              href={alternateHref}
              hrefLang={locale === 'pl' ? 'en' : 'pl'}
            >
              {t('alternateLocaleName')}
            </Link>
          </nav>
        </details>
      </SiteContainer>
    </header>
  )
}

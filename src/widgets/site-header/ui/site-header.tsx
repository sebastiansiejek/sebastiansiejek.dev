import Link from 'next/link'
import { ComponentProps } from 'react'
import clsx from 'clsx'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { SiteContainer } from 'shared/ui/site-layout'

type HeaderLinkProperties = ComponentProps<typeof Link> & {
  variant?: 'brand' | 'navigation' | 'locale' | 'menu'
}

function HeaderLink({
  className,
  variant = 'navigation',
  ...properties
}: HeaderLinkProperties) {
  return (
    <Link
      className={clsx(
        'no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        variant === 'brand' &&
          'inline-flex items-center gap-3 text-sm font-bold tracking-tight text-foreground',
        variant === 'navigation' &&
          'text-xs font-semibold text-muted transition-colors duration-200 hover:text-foreground lg:text-sm',
        variant === 'locale' &&
          'rounded-lg border border-border px-3 py-2 text-xs font-semibold text-accent transition-colors duration-200 hover:text-foreground lg:text-sm',
        variant === 'menu' &&
          'rounded-lg p-3 text-foreground hover:bg-accent-muted',
        className,
      )}
      {...properties}
    />
  )
}

type SiteHeaderProperties = {
  locale: Locale
  alternateHref: string
}

export async function SiteHeader({ locale, alternateHref }: SiteHeaderProperties) {
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
    <header className="site-header sticky top-0 z-20 h-18 border-b border-accent/15 bg-background/90 backdrop-blur-2xl max-md:h-16">
      <SiteContainer className="flex h-full items-center justify-between gap-8">
        <HeaderLink
          variant="brand"
          href={home}
          aria-label="Sebastian Siejek"
        >
          <span
            className="grid size-9 place-items-center rounded-lg bg-accent font-mono text-xs font-medium text-accent-foreground"
            aria-hidden="true"
          >
            SS
          </span>
          <span className="max-md:hidden">Sebastian Siejek</span>
        </HeaderLink>

        <nav
          className="flex items-center gap-5 whitespace-nowrap lg:gap-8 max-md:hidden"
          aria-label={t('navigationLabel')}
        >
          {links.map(([label, href]) => (
            <HeaderLink
              key={href}
              href={href}
            >
              {label}
            </HeaderLink>
          ))}
          <HeaderLink
            variant="locale"
            href={alternateHref}
            hrefLang={locale === 'pl' ? 'en' : 'pl'}
          >
            {t('alternateLocaleName')}
          </HeaderLink>
        </nav>

        <details className="relative hidden max-md:block">
          <summary
            className="menu-summary cursor-pointer list-none rounded-lg border border-border px-3 py-2 text-sm font-bold text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {t('menu')}
          </summary>
          <nav
            className="absolute top-full right-0 mt-3 grid w-72 rounded-xl border border-border bg-surface-raised p-3 shadow-menu"
            aria-label="Mobile navigation"
          >
            {links.map(([label, href]) => (
              <HeaderLink
                variant="menu"
                key={href}
                href={href}
              >
                {label}
              </HeaderLink>
            ))}
            <HeaderLink
              variant="menu"
              href={alternateHref}
              hrefLang={locale === 'pl' ? 'en' : 'pl'}
            >
              {t('alternateLocaleName')}
            </HeaderLink>
          </nav>
        </details>
      </SiteContainer>
    </header>
  )
}

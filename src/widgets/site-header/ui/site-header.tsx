import Link from 'next/link'
import { ComponentProps } from 'react'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { cn } from 'shared/lib/utilities'
import { buttonVariants } from 'shared/ui/button'
import { SiteContainer } from 'shared/ui/site-layout'
import { MobileNavigation } from './mobile-navigation'

type HeaderLinkProperties = ComponentProps<typeof Link> & {
  variant?: 'brand' | 'navigation'
}

function HeaderLink({
  className,
  variant = 'navigation',
  ...properties
}: HeaderLinkProperties) {
  return (
    <Link
      className={cn(
        'no-underline focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
        variant === 'brand' &&
          'inline-flex items-center gap-3 text-sm font-bold tracking-tight text-foreground',
        variant === 'navigation' &&
          'text-xs font-semibold text-muted-foreground transition-colors duration-200 hover:text-foreground lg:text-sm',
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
    { label: t('nav.work'), href: `${home}#work` },
    { label: t('nav.services'), href: `${home}#services` },
    { label: t('nav.about'), href: `${home}#about` },
    { label: t('nav.writing'), href: `${home}#writing` },
    { label: t('nav.contact'), href: `${home}#contact` },
  ]

  return (
    <header className="site-header sticky top-0 z-20 h-18 border-b border-primary/15 bg-background/90 backdrop-blur-2xl max-md:h-16">
      <SiteContainer className="flex h-full items-center justify-between gap-8">
        <HeaderLink
          variant="brand"
          href={home}
          aria-label="Sebastian Siejek"
        >
          <span
            className="grid size-9 place-items-center rounded-lg bg-primary font-mono text-xs font-medium text-primary-foreground"
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
          {links.map(({ label, href }) => (
            <HeaderLink
              key={href}
              href={href}
            >
              {label}
            </HeaderLink>
          ))}
          <Link
            className={buttonVariants({ size: 'sm', variant: 'outline' })}
            href={alternateHref}
            hrefLang={locale === 'pl' ? 'en' : 'pl'}
          >
            {t('alternateLocaleName')}
          </Link>
        </nav>

        <MobileNavigation
          alternateHref={alternateHref}
          alternateHrefLang={locale === 'pl' ? 'en' : 'pl'}
          alternateLocaleName={t('alternateLocaleName')}
          label={t('menu')}
          links={links}
        />
      </SiteContainer>
    </header>
  )
}

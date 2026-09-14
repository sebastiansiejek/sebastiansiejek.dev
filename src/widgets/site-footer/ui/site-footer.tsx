import NextLink from 'next/link'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import {
  DesktopThemeSwitcher,
  type ThemeSwitcherLabels,
} from 'features/theme-switcher'
import { siteConfig } from 'shared/config/site'
import { getPathname } from 'shared/i18n/navigation'
import { buttonVariants } from 'shared/ui/button'
import { SiteContainer } from 'shared/ui/site-layout'

export async function SiteFooter({
  alternateHref,
  locale,
}: {
  alternateHref: string
  locale: Locale
}) {
  const t = await getTranslations({ locale, namespace: 'Site' })
  const themeLabels: ThemeSwitcherLabels = {
    label: t('theme.label'),
    system: t('theme.system'),
    light: t('theme.light'),
    dark: t('theme.dark'),
  }

  return (
    <footer className="border-t border-border bg-background">
      <SiteContainer className="flex min-h-28 items-center justify-between gap-8 max-md:flex-col max-md:items-start max-md:py-8">
        <p className="m-0 text-xs text-muted-foreground">{t('footer')}</p>
        <div className="flex items-center gap-6 max-md:w-full max-md:flex-col max-md:items-start max-md:gap-5">
          <div className="flex gap-6 max-md:flex-wrap">
            <a
              className="text-xs text-muted-foreground"
              href={`mailto:${siteConfig.contactEmail}`}
            >
              Email
            </a>
            <a
              className="text-xs text-muted-foreground"
              href="https://www.linkedin.com/in/sebastiansiejek/"
              target="_blank"
              rel="noreferrer"
            >
              LinkedIn
            </a>
            <a
              className="text-xs text-muted-foreground"
              href="https://github.com/sebastiansiejek"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
            <NextLink className="text-xs text-muted-foreground" href="/blog">
              Blog
            </NextLink>
            <NextLink
              className="text-xs text-muted-foreground"
              href={getPathname({ locale, href: '/privacy' })}
            >
              {t('footerPrivacy')}
            </NextLink>
          </div>
          <div className="flex items-center gap-1">
            <DesktopThemeSwitcher labels={themeLabels} />
            <NextLink
              className={buttonVariants({ size: 'sm', variant: 'outline' })}
              href={alternateHref}
              hrefLang={locale === 'pl' ? 'en' : 'pl'}
            >
              {t('alternateLocaleName')}
            </NextLink>
          </div>
        </div>
      </SiteContainer>
    </footer>
  )
}

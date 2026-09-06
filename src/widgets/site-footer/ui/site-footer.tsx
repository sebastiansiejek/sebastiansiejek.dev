import Link from 'next/link'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { siteConfig } from 'shared/config/site'
import { SiteContainer } from 'shared/ui/site-layout'

export async function SiteFooter({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'Site' })

  return (
    <footer className="border-t border-border bg-background">
      <SiteContainer className="flex min-h-28 items-center justify-between gap-8 max-md:flex-col max-md:items-start max-md:py-8">
        <p className="m-0 text-xs text-muted-foreground">{t('footer')}</p>
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
          <Link className="text-xs text-muted-foreground" href="/blog">
            Blog
          </Link>
        </div>
      </SiteContainer>
    </footer>
  )
}

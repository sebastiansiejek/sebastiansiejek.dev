import Link from 'next/link'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { siteConfig } from 'shared/config/site'
import { SiteContainer } from 'shared/ui/portfolio-layout'

export async function SiteFooter({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'Site' })

  return (
    <footer className="border-t border-portfolio-line bg-portfolio-bg">
      <SiteContainer className="flex min-h-[116px] items-center justify-between gap-8 max-md:flex-col max-md:items-start max-md:py-8">
        <p className="m-0 text-[0.82rem] text-portfolio-faint">{t('footer')}</p>
        <div className="flex gap-[1.4rem] max-md:flex-wrap">
          <a
            className="text-[0.82rem] text-portfolio-muted"
            href={`mailto:${siteConfig.contactEmail}`}
          >
            Email
          </a>
          <a
            className="text-[0.82rem] text-portfolio-muted"
            href="https://www.linkedin.com/in/sebastiansiejek/"
            target="_blank"
            rel="noreferrer"
          >
            LinkedIn
          </a>
          <a
            className="text-[0.82rem] text-portfolio-muted"
            href="https://github.com/sebastiansiejek"
            target="_blank"
            rel="noreferrer"
          >
            GitHub
          </a>
          <Link className="text-[0.82rem] text-portfolio-muted" href="/blog">
            Blog
          </Link>
        </div>
      </SiteContainer>
    </footer>
  )
}

import { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { PortfolioPage } from 'features/portfolio/PortfolioPage'
import { routing } from 'i18n/routing'
import { landingMetadata } from 'lib/portfolio/metadata'

type PageProps = {
  params: Promise<{ locale: string }>
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale } = await params
  return hasLocale(routing.locales, locale) ? landingMetadata(locale) : {}
}

export default async function LocalizedHomePage({ params }: PageProps) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  setRequestLocale(locale)

  return <PortfolioPage locale={locale} />
}

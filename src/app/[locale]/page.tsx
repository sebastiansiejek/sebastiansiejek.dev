import { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { landingMetadata } from '_app/seo/index.server'
import { HomePage } from '_pages/home'
import { routing } from 'shared/i18n/routing'

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

  return <HomePage locale={locale} />
}

import type { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { privacyMetadata } from '_app/seo/index.server'
import { PrivacyPage } from '_pages/privacy'
import { routing } from 'shared/i18n/routing'

type PageProperties = {
  params: Promise<{ locale: string }>
}

export async function generateMetadata({
  params,
}: PageProperties): Promise<Metadata> {
  const { locale } = await params
  return hasLocale(routing.locales, locale) ? privacyMetadata(locale) : {}
}

export default async function LocalizedPrivacyPage({ params }: PageProperties) {
  const { locale } = await params

  if (!hasLocale(routing.locales, locale)) notFound()

  setRequestLocale(locale)

  return <PrivacyPage locale={locale} />
}

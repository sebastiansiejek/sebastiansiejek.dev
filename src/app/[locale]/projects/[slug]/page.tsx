import { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { caseStudyMetadata } from '_app/seo/index.server'
import { CaseStudyPage } from '_pages/case-study'
import {
  isPublishedProjectKey,
  publishedProjectKeys,
} from 'entities/project'
import { routing } from 'shared/i18n/routing'

type PageProperties = {
  params: Promise<{ locale: string; slug: string }>
}

// eslint-disable-next-line unicorn/prevent-abbreviations -- Next.js route segment config requires this export name.
export const dynamicParams = false

export function generateStaticParams() {
  return publishedProjectKeys.flatMap((slug) =>
    routing.locales.map((locale) => ({ locale, slug })),
  )
}

export async function generateMetadata({
  params,
}: PageProperties): Promise<Metadata> {
  const { locale, slug } = await params

  return hasLocale(routing.locales, locale) && isPublishedProjectKey(slug)
    ? caseStudyMetadata(locale, slug)
    : {}
}

export default async function LocalizedProjectPage({ params }: PageProperties) {
  const { locale, slug } = await params

  if (!hasLocale(routing.locales, locale) || !isPublishedProjectKey(slug)) {
    notFound()
  }

  setRequestLocale(locale)

  return <CaseStudyPage locale={locale} projectKey={slug} />
}

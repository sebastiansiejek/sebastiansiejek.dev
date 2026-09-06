import { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { caseStudyMetadata } from '_app/seo/index.server'
import { CaseStudyPage } from '_pages/case-study'
import { isProjectKey, projectKeys } from 'entities/project'
import { routing } from 'shared/i18n/routing'

type PageProps = {
  params: Promise<{ locale: string; slug: string }>
}

export function generateStaticParams() {
  return projectKeys.flatMap((slug) =>
    routing.locales.map((locale) => ({ locale, slug })),
  )
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { locale, slug } = await params

  return hasLocale(routing.locales, locale) && isProjectKey(slug)
    ? caseStudyMetadata(locale, slug)
    : {}
}

export default async function LocalizedProjectPage({ params }: PageProps) {
  const { locale, slug } = await params

  if (!hasLocale(routing.locales, locale) || !isProjectKey(slug)) {
    notFound()
  }

  setRequestLocale(locale)

  return <CaseStudyPage locale={locale} projectKey={slug} />
}

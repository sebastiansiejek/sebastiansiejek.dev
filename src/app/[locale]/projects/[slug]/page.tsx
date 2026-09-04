import { Metadata } from 'next'
import { hasLocale } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { ProjectPage } from 'features/portfolio/ProjectPage'
import { routing } from 'i18n/routing'
import { caseStudyMetadata } from 'lib/portfolio/metadata'
import { isProjectKey, projectKeys } from 'lib/portfolio/projects'

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

  return <ProjectPage locale={locale} projectKey={slug} />
}

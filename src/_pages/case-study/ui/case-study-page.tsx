import Image from 'next/image'
import Link from 'next/link'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { getProjectPath, type ProjectKey } from 'entities/project'
import { getLocalizedProjects } from 'entities/project/index.server'
import { cn } from 'shared/lib/utilities'
import { Alert, AlertDescription } from 'shared/ui/alert'
import { Badge } from 'shared/ui/badge'
import { buttonVariants } from 'shared/ui/button'
import { Card, CardContent, CardHeader } from 'shared/ui/card'
import { SiteContainer, SiteShell } from 'shared/ui/site-layout'
import { SectionLabel } from 'shared/ui/section-heading'
import { SiteFooter } from 'widgets/site-footer'
import { SiteHeader } from 'widgets/site-header'
import { ArrowLink } from 'shared/ui/arrow-link'
import { SkipLink } from 'shared/ui/skip-link'
import { MediaFrame } from 'shared/ui/media-frame'
import { SectionTitle, SubsectionTitle } from 'shared/ui/typography'
import { TextLink } from 'shared/ui/text-link'
import { ArrowLeftIcon, InfoIcon } from 'lucide-react'

export async function CaseStudyPage({
  locale,
  projectKey,
}: {
  locale: Locale
  projectKey: ProjectKey
}) {
  const t = await getTranslations({ locale, namespace: 'ProjectMeta' })
  const siteT = await getTranslations({ locale, namespace: 'Site' })
  const localizedProjects = await getLocalizedProjects(locale)
  const project = localizedProjects[projectKey]
  const alternateLocale = locale === 'pl' ? 'en' : 'pl'

  return (
    <SiteShell lang={locale}>
      <SkipLink href="#main">{siteT('skipToContent')}</SkipLink>
      <SiteHeader
        locale={locale}
        alternateHref={getProjectPath(alternateLocale, projectKey)}
      />

      <main id="main">
        <article>
          <header>
            <SiteContainer className="pt-16 pb-12 md:pt-24 md:pb-16 lg:pt-32 lg:pb-20">
              <TextLink
                className="mb-12 inline-flex items-center gap-2 text-sm font-bold text-muted-foreground decoration-primary decoration-1 underline-offset-4 md:mb-16 lg:mb-24"
                href={`/${locale}#work`}
              >
                <ArrowLeftIcon aria-hidden="true" /> {t('back')}
              </TextLink>
              <SectionLabel className="mb-4">{project.kind}</SectionLabel>
              <h1 className="m-0 text-6xl leading-none font-semibold tracking-tighter md:text-8xl lg:text-9xl">
                {project.name}
              </h1>
              <p className="mt-8 max-w-prose text-lg text-muted-foreground md:text-xl">
                {project.summary}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3 max-md:flex-col max-md:items-stretch">
                <ArrowLink
                  className="max-md:w-full"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  direction={'external'}
                  variant="default"
                >
                  {t('live')}
                </ArrowLink>
                {project.repoUrl ? (
                  <ArrowLink
                    className="max-md:w-full"
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {t('repo')}
                  </ArrowLink>
                ) : undefined}
              </div>
            </SiteContainer>
          </header>

          {project.image ? (
            <MediaFrame
              as="figure"
              className="mx-4 aspect-4/3 max-w-7xl px-0 sm:mx-auto sm:w-full sm:px-5 md:aspect-2/1"
            >
              <Image
                className="object-cover"
                src={project.image}
                alt={project.imageAlt}
                fill
                priority
                sizes="(max-width: 767px) 100vw, 1200px"
              />
            </MediaFrame>
          ) : (
            <MediaFrame
              tone="accent"
              className="mx-4 flex aspect-4/3 max-w-7xl place-items-center justify-center gap-4 px-0 sm:mx-auto sm:w-full sm:px-5 md:aspect-2/1"
              aria-label="Planning Poker"
            >
              <Image
                className="object-contain p-4"
                src={'/images/portfolio/planning-poker.webp'}
                fill
                alt={'Planning Poker'}
              />
            </MediaFrame>
          )}

          <SiteContainer className="mt-8 grid grid-cols-2 border-b border-border max-md:grid-cols-1">
            <section className="py-8">
              <h2 className="mt-0 mb-2 font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {t('role')}
              </h2>
              <p className="m-0 max-w-prose">{project.role}</p>
            </section>
            <section className="border-l border-border py-8 pl-8 max-md:border-t max-md:border-l-0 max-md:pl-0">
              <h2 className="mt-0 mb-2 font-mono text-xs font-medium uppercase tracking-widest text-muted-foreground">
                {t('stack')}
              </h2>
              <p className="m-0 max-w-prose">{project.stack.join(', ')}</p>
            </section>
          </SiteContainer>

          <div className="mx-auto w-full max-w-5xl px-4 py-20 md:px-5 md:py-28 lg:py-36">
            <section className="grid grid-cols-3 gap-6 pb-20 md:gap-12 md:pb-28 max-md:grid-cols-1">
              <SubsectionTitle>
                {t('challenge')}
              </SubsectionTitle>
              <p className="col-span-2 m-0 text-lg text-muted-foreground md:text-xl max-md:col-auto">
                {project.challenge}
              </p>
            </section>

            <section className="border-t border-border py-20 md:py-24">
              <SubsectionTitle>
                {t('decisions')}
              </SubsectionTitle>
              <ol className="mt-10 grid list-none grid-cols-2 gap-4 p-0 max-md:grid-cols-1">
                {project.decisions.map((decision, index) => (
                  <li key={decision}>
                    <Card className="min-h-52">
                      <CardHeader>
                        <Badge variant="outline">0{index + 1}</Badge>
                      </CardHeader>
                      <CardContent className="mt-auto">
                        <p className="text-muted-foreground">{decision}</p>
                      </CardContent>
                    </Card>
                  </li>
                ))}
              </ol>
            </section>

            <section className="grid grid-cols-2 gap-6 border-t border-border pt-20 md:gap-16 md:pt-24 max-md:grid-cols-1">
              <div>
                <SubsectionTitle>
                  {t('result')}
                </SubsectionTitle>
                <p className="mt-5 text-muted-foreground">{project.result}</p>
              </div>
              <div>
                <SubsectionTitle>
                  {t('lesson')}
                </SubsectionTitle>
                <p className="mt-5 text-muted-foreground">{project.lesson}</p>
              </div>
            </section>

            {project.credit ? (
              <Alert className="mt-16">
                <InfoIcon aria-hidden="true" />
                <AlertDescription>{project.credit}</AlertDescription>
              </Alert>
            ) : undefined}
          </div>

          <aside className="bg-card py-20 md:py-28 lg:py-32">
            <SiteContainer>
              <SectionTitle className="max-w-lg">{t('next')}</SectionTitle>
              <Link
                className={cn(buttonVariants({ size: 'lg' }), 'mt-8')}
                href={`/${locale}#contact`}
              >
                {t('contact')}
              </Link>
            </SiteContainer>
          </aside>
        </article>
      </main>
      <SiteFooter locale={locale} />
    </SiteShell>
  )
}

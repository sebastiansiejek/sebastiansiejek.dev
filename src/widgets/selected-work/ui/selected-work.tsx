import Image from 'next/image'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { projectKeys } from 'entities/project'
import { getLocalizedProjects } from 'entities/project/index.server'
import { Link as LocalizedLink } from 'shared/i18n/navigation'
import {
  SectionHeading,
  SectionLabel,
} from 'shared/ui/section-heading'
import { ArrowLink } from 'shared/ui/arrow-link'
import { SiteContainer } from 'shared/ui/site-layout'
import clsx from 'clsx'
import { CardTitle } from 'shared/ui/typography'
import { MediaFrame } from 'shared/ui/media-frame'

export async function SelectedWork({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'Site' })
  const localizedProjects = await getLocalizedProjects(locale)

  return (
    <section className="py-20 md:py-28 lg:py-36" id="work">
      <SiteContainer>
        <SectionHeading title={t('work.title')} intro={t('work.intro')} />
        <div className="grid grid-cols-5 gap-x-6 gap-y-10 md:gap-x-12 md:gap-y-16 lg:gap-y-20 max-md:grid-cols-1">
          {projectKeys.map((key, index) => {
            const project = localizedProjects[key]

            return (
              <article
                className={clsx(
                  index === 0 && 'col-span-full max-md:col-auto',
                  index === 1 && 'col-span-3 max-md:col-auto',
                  index === 2 && 'col-span-2 max-md:col-auto',
                )}
                key={key}
              >
                {project.image ? (
                  <MediaFrame
                    as={LocalizedLink}
                    interactive
                    className={clsx(
                      'group block h-auto aspect-4/3',
                      index === 0 ? 'md:aspect-2/1' : 'md:aspect-8/5',
                    )}
                    href={{
                      pathname: '/projects/[slug]',
                      params: { slug: key },
                    }}
                    aria-label={`${t('work.view')}: ${project.name}`}
                  >
                    <Image
                      className="object-cover transition-transform duration-500 ease-fluid group-hover:scale-105"
                      src={project.image}
                      alt={project.imageAlt}
                      fill
                      sizes={
                        index === 0
                          ? '(max-width: 767px) 100vw, 70vw'
                          : '(max-width: 767px) 100vw, 40vw'
                      }
                    />
                  </MediaFrame>
                ) : (
                  <MediaFrame
                    as={LocalizedLink}
                    interactive
                    tone="accent"
                    className="flex h-auto aspect-4/3 flex-wrap place-items-center justify-center gap-4 font-mono no-underline md:aspect-8/5"
                    href={{
                      pathname: '/projects/[slug]',
                      params: { slug: key },
                    }}
                  >
                    <Image
                      className="object-contain p-4"
                      src={'/images/portfolio/planning-poker.webp'}
                      fill
                      alt={'Planning Poker'}
                    />
                  </MediaFrame>
                )}
                <div className="pt-6">
                  <SectionLabel className="mb-3">
                    {project.kind}
                  </SectionLabel>
                  <CardTitle>{project.name}</CardTitle>
                  <p className="mt-3 max-w-prose text-muted">
                    {project.summary}
                  </p>
                  <ArrowLink
                    href={{
                      pathname: `/projects/${key}`,
                    }}
                    className={'mt-6'}
                  >
                    {t('work.view')}{' '}
                  </ArrowLink>
                </div>
              </article>
            )
          })}
        </div>
        <article className="mt-14 grid grid-cols-3 items-center gap-8 border-t border-border py-8 md:mt-20 lg:mt-28 max-md:grid-cols-1 max-md:gap-4">
          <div>
            <SectionLabel className="mb-1">
              {t('writing.kind')}
            </SectionLabel>
            <h3 className="m-0 text-2xl tracking-tight">
              Daily Standup
            </h3>
          </div>
          <p className="m-0 text-muted">
            {t('writing.featuredDescription')}
          </p>
          <ArrowLink
            className="mt-0 whitespace-nowrap max-md:justify-self-start"
            href="/blog/daily-standup"
          >
            {t('writing.readArticle')}
          </ArrowLink>
        </article>
      </SiteContainer>
    </section>
  )
}

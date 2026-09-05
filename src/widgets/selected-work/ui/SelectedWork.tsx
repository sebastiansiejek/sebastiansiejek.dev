import Image from 'next/image'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { PlanningPokerPreview, projectKeys } from 'entities/project'
import { getLocalizedProjects } from 'entities/project/index.server'
import { Link as LocalizedLink } from 'shared/i18n/navigation'
import {
  SectionHeading,
  SectionLabel,
} from 'shared/ui/portfolio-section-heading'
import { ArrowLink } from 'shared/ui/portfolio-text-link'

export async function SelectedWork({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'Site' })
  const localizedProjects = await getLocalizedProjects(locale)

  return (
    <section
      className="mx-auto w-full max-w-[1280px] px-5 py-[clamp(5rem,10vw,9rem)] max-md:px-4 max-md:py-20"
      id="work"
    >
      <SectionHeading title={t('work.title')} intro={t('work.intro')} />
      <div className="grid grid-cols-[1.25fr_0.75fr] gap-x-[clamp(1.5rem,3vw,3rem)] gap-y-[clamp(2.5rem,5vw,5rem)] max-md:grid-cols-1">
        {projectKeys.map((key, index) => {
          const project = localizedProjects[key]

          return (
            <article
              className={index === 0 ? 'col-span-full max-md:col-auto' : ''}
              key={key}
            >
              {project.image ? (
                <LocalizedLink
                  className={`group relative block aspect-[16/10] h-auto overflow-hidden rounded-xl bg-portfolio-surface after:pointer-events-none after:absolute after:inset-0 after:ring-1 after:ring-inset after:ring-portfolio-text/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-accent focus-visible:ring-offset-2 focus-visible:ring-offset-portfolio-bg ${index === 0 ? 'aspect-[2/1] max-md:aspect-[4/3]' : 'max-md:aspect-[4/3]'}`}
                  href={{
                    pathname: '/projects/[slug]',
                    params: { slug: key },
                  }}
                  aria-label={`${t('work.view')}: ${project.name}`}
                >
                  <Image
                    className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]"
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes={
                      index === 0
                        ? '(max-width: 767px) 100vw, 70vw'
                        : '(max-width: 767px) 100vw, 40vw'
                    }
                  />
                </LocalizedLink>
              ) : (
                <LocalizedLink
                  className="relative flex aspect-16/10 h-auto flex-wrap place-items-center justify-center gap-4 overflow-hidden rounded-xl bg-[linear-gradient(135deg,transparent_0_44%,rgb(119_217_184/0.09)_44%_56%,transparent_56%),var(--color-portfolio-surface-strong)] p-4 font-mono text-portfolio-accent no-underline after:pointer-events-none after:absolute after:inset-0 after:ring-1 after:ring-inset after:ring-portfolio-text/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-accent focus-visible:ring-offset-2 focus-visible:ring-offset-portfolio-bg max-md:aspect-[4/3]"
                  href={{
                    pathname: '/projects/[slug]',
                    params: { slug: key },
                  }}
                >
                  {['1', '2', '3', '5', '7', '13'].map((estimate) => (
                    <PlanningPokerPreview key={estimate}>
                      {estimate}
                    </PlanningPokerPreview>
                  ))}
                </LocalizedLink>
              )}
              <div className="pt-6">
                <SectionLabel className="mb-[0.65rem]">
                  {project.kind}
                </SectionLabel>
                <h3 className="m-0 text-[clamp(1.6rem,3vw,2.4rem)] font-[650] tracking-[-0.04em] text-portfolio-text">
                  {project.name}
                </h3>
                <p className="mt-3 max-w-[58ch] text-portfolio-muted">
                  {project.summary}
                </p>
                <LocalizedLink
                  className="group mt-4 inline-flex items-center gap-2 font-bold text-portfolio-text underline decoration-portfolio-accent decoration-1 underline-offset-[0.35rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-accent focus-visible:ring-offset-2 focus-visible:ring-offset-portfolio-bg"
                  href={{
                    pathname: '/projects/[slug]',
                    params: { slug: key },
                  }}
                >
                  {t('work.view')}{' '}
                  <span
                    className="text-portfolio-accent transition-transform duration-[180ms] group-hover:translate-x-[0.2rem]"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </LocalizedLink>
              </div>
            </article>
          )
        })}
      </div>
      <article className="mt-[clamp(3.5rem,7vw,7rem)] grid grid-cols-[0.8fr_1.4fr_auto] items-center gap-8 border-t border-portfolio-line py-8 max-md:grid-cols-1 max-md:gap-4">
        <div>
          <SectionLabel className="mb-[0.35rem]">
            {t('writing.kind')}
          </SectionLabel>
          <h3 className="m-0 text-[1.45rem] tracking-[-0.035em]">
            Daily Standup
          </h3>
        </div>
        <p className="m-0 text-portfolio-muted">
          {t('writing.featuredDescription')}
        </p>
        <ArrowLink
          className="mt-0 whitespace-nowrap max-md:justify-self-start"
          href="/blog/daily-standup"
        >
          {t('writing.readArticle')}
        </ArrowLink>
      </article>
    </section>
  )
}

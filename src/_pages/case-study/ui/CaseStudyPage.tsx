import Image from 'next/image'
import Link from 'next/link'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { getProjectPath, type ProjectKey } from 'entities/project'
import { getLocalizedProjects } from 'entities/project/index.server'
import { ActionLink } from 'shared/ui/portfolio-button'
import { SiteContainer, SiteShell } from 'shared/ui/portfolio-layout'
import { SectionLabel } from 'shared/ui/portfolio-section-heading'
import { SiteFooter } from 'widgets/site-footer'
import { SiteHeader } from 'widgets/site-header'

export async function CaseStudyPage({
  locale,
  projectKey,
}: {
  locale: Locale
  projectKey: ProjectKey
}) {
  const t = await getTranslations({ locale, namespace: 'ProjectMeta' })
  const siteT = await getTranslations({ locale, namespace: 'Site' })
  const project = (await getLocalizedProjects(locale))[projectKey]
  const alternateLocale = locale === 'pl' ? 'en' : 'pl'

  return (
    <SiteShell lang={locale}>
      <a
        className="fixed top-3 left-3 z-[100] -translate-y-[150%] rounded-lg bg-portfolio-accent px-4 py-[0.7rem] text-portfolio-accent-contrast focus:translate-y-0"
        href="#main"
      >
        {siteT('skipToContent')}
      </a>
      <SiteHeader
        locale={locale}
        alternateHref={getProjectPath(alternateLocale, projectKey)}
      />

      <main id="main">
        <article>
          <header>
            <SiteContainer className="pt-[clamp(4rem,9vw,8rem)] pb-[clamp(3rem,6vw,5rem)] max-md:pt-12">
              <Link
                className="mb-[clamp(3rem,7vw,6rem)] inline-flex items-center gap-2 text-[0.86rem] font-bold text-portfolio-muted underline decoration-portfolio-accent decoration-1 underline-offset-[0.35rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-accent focus-visible:ring-offset-2 focus-visible:ring-offset-portfolio-bg max-md:mb-12"
                href={`/${locale}#work`}
              >
                <span aria-hidden="true">←</span> {t('back')}
              </Link>
              <SectionLabel className="mb-4">{project.kind}</SectionLabel>
              <h1 className="m-0 text-[clamp(3.5rem,10vw,8.5rem)] leading-[0.9] font-[650] tracking-[-0.075em] max-md:text-[clamp(3.4rem,19vw,5.4rem)]">
                {project.name}
              </h1>
              <p className="mt-8 max-w-[68ch] text-[clamp(1.1rem,2vw,1.45rem)] text-portfolio-muted">
                {project.summary}
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-3 max-md:flex-col max-md:items-stretch">
                <ActionLink
                  className="max-md:w-full"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {t('live')} <span aria-hidden="true">↗</span>
                </ActionLink>
                {project.repoUrl ? (
                  <ActionLink
                    className="max-md:w-full"
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    variant="secondary"
                  >
                    {t('repo')} <span aria-hidden="true">↗</span>
                  </ActionLink>
                ) : null}
              </div>
            </SiteContainer>
          </header>

          {project.image ? (
            <figure className="relative mx-auto block aspect-2/1 w-full max-w-7xl overflow-hidden rounded-xl bg-portfolio-surface px-5 after:pointer-events-none after:absolute after:inset-0 after:ring-1 after:ring-inset after:ring-portfolio-text/8 max-md:w-[calc(100%-2rem)] max-md:aspect-[4/3] max-md:px-0">
              <Image
                className="object-cover"
                src={project.image}
                alt={project.imageAlt}
                fill
                priority
                sizes="(max-width: 767px) 100vw, 1200px"
              />
            </figure>
          ) : (
            <div
              className="relative mx-auto aspect-2/1 w-full max-w-7xl gap-4 flex justify-center place-items-center overflow-hidden rounded-xl bg-[linear-gradient(135deg,transparent_0_44%,rgb(119_217_184/0.09)_44%_56%,transparent_56%),var(--color-portfolio-surface-strong)] px-5 text-portfolio-accent after:pointer-events-none after:absolute after:inset-0 after:ring-1 after:ring-inset after:ring-portfolio-text/8 max-md:w-[calc(100%-2rem)] max-md:aspect-[4/3] max-md:px-0"
              aria-label="Planning Poker"
            >
              <Image
                className="object-contain p-4"
                src={'/images/portfolio/planning-poker.webp'}
                fill
                alt={'Planning Poker'}
              />
            </div>
          )}

          <SiteContainer className="mt-8 grid grid-cols-2 border-b border-portfolio-line max-md:grid-cols-1">
            <section className="py-8">
              <h2 className="mt-0 mb-[0.6rem] font-mono text-[0.72rem] font-medium uppercase tracking-[0.12em] text-portfolio-faint">
                {t('role')}
              </h2>
              <p className="m-0 max-w-[54ch]">{project.role}</p>
            </section>
            <section className="border-l border-portfolio-line py-8 pl-8 max-md:border-t max-md:border-l-0 max-md:pl-0">
              <h2 className="mt-0 mb-[0.6rem] font-mono text-[0.72rem] font-medium uppercase tracking-[0.12em] text-portfolio-faint">
                {t('stack')}
              </h2>
              <p className="m-0 max-w-[54ch]">{project.stack.join(', ')}</p>
            </section>
          </SiteContainer>

          <div className="mx-auto w-full max-w-[1020px] px-5 py-[clamp(5rem,10vw,9rem)] max-md:px-4">
            <section className="grid grid-cols-[0.45fr_1fr] gap-12 pb-[clamp(4rem,8vw,7rem)] max-md:grid-cols-1 max-md:gap-6">
              <h2 className="m-0 text-[clamp(1.7rem,3.5vw,2.7rem)] font-[650] tracking-[-0.045em] text-portfolio-text">
                {t('challenge')}
              </h2>
              <p className="m-0 text-[clamp(1.15rem,2vw,1.45rem)] text-portfolio-muted">
                {project.challenge}
              </p>
            </section>

            <section className="border-t border-portfolio-line py-[clamp(4rem,7vw,6rem)]">
              <h2 className="m-0 text-[clamp(1.7rem,3.5vw,2.7rem)] font-[650] tracking-[-0.045em] text-portfolio-text">
                {t('decisions')}
              </h2>
              <ol className="mt-10 grid list-none grid-cols-2 gap-4 p-0 max-md:grid-cols-1">
                {project.decisions.map((decision, index) => (
                  <li
                    className="min-h-[210px] rounded-xl border border-portfolio-line bg-portfolio-surface p-6"
                    key={decision}
                  >
                    <span className="font-mono text-xs text-portfolio-accent">
                      0{index + 1}
                    </span>
                    <p className="mt-14 text-portfolio-muted">{decision}</p>
                  </li>
                ))}
              </ol>
            </section>

            <section className="grid grid-cols-2 gap-[clamp(2rem,6vw,6rem)] border-t border-portfolio-line pt-[clamp(4rem,7vw,6rem)] max-md:grid-cols-1 max-md:gap-6">
              <div>
                <h2 className="m-0 text-[clamp(1.7rem,3.5vw,2.7rem)] font-[650] tracking-[-0.045em] text-portfolio-text">
                  {t('result')}
                </h2>
                <p className="mt-5 text-portfolio-muted">{project.result}</p>
              </div>
              <div>
                <h2 className="m-0 text-[clamp(1.7rem,3.5vw,2.7rem)] font-[650] tracking-[-0.045em] text-portfolio-text">
                  {t('lesson')}
                </h2>
                <p className="mt-5 text-portfolio-muted">{project.lesson}</p>
              </div>
            </section>

            {project.credit ? (
              <p className="mt-16 border-l-[3px] border-portfolio-accent bg-portfolio-surface p-6 text-portfolio-muted">
                {project.credit}
              </p>
            ) : null}
          </div>

          <aside className="bg-portfolio-surface py-[clamp(5rem,10vw,8rem)]">
            <SiteContainer>
              <h2 className="m-0 max-w-[16ch] text-[clamp(2.25rem,4.4vw,4rem)] leading-[1.06] font-[650] tracking-[-0.05em] text-portfolio-text text-balance">
                {t('next')}
              </h2>
              <ActionLink className="mt-8" href={`/${locale}#contact`}>
                {t('contact')}
              </ActionLink>
            </SiteContainer>
          </aside>
        </article>
      </main>
      <SiteFooter locale={locale} />
    </SiteShell>
  )
}

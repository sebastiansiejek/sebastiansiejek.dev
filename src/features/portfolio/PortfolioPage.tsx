import Image from 'next/image'
import Link from 'next/link'
import type { Locale } from 'next-intl'
import { getFormatter, getTranslations } from 'next-intl/server'
import { Link as LocalizedLink } from 'i18n/navigation'
import { projectKeys } from 'lib/portfolio/projects'
import { siteConfig } from 'lib/portfolio/site'
import { getLocalizedProjects } from 'lib/portfolio/translations'
import { PortfolioHeader } from './PortfolioHeader'
import { ContactForm } from './ContactForm'
import { SiteFooter } from './SiteFooter'
import { PortfolioButtonLink } from './PortfolioButton'
import { PortfolioShell } from './PortfolioShell'
import {
  PortfolioLabel,
  PortfolioSectionHeading,
} from './PortfolioSectionHeading'
import { PortfolioTextLink } from './PortfolioTextLink'
import { PlanningPokerCard } from 'features/portfolio/planning-poker/planning-poker-card'

export async function PortfolioPage({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'Site' })
  const format = await getFormatter({ locale })
  const localizedProjects = await getLocalizedProjects(locale)
  const alternateLocale = locale === 'pl' ? 'en' : 'pl'
  const proofs = [
    [
      `${format.number(siteConfig.facts.commercialExperienceYears)}+`,
      t('proofs.experience.label'),
    ],
    [`${format.number(siteConfig.facts.saasUsers)}+`, t('proofs.users.label')],
    [
      `${format.number(siteConfig.facts.deliveredWebProjects)}+`,
      t('proofs.projects.label'),
    ],
    [t('proofs.delivery.value'), t('proofs.delivery.label')],
  ]
  const services = [
    {
      title: t('services.items.applications.title'),
      text: t('services.items.applications.text'),
    },
    {
      title: t('services.items.automation.title'),
      text: t('services.items.automation.text'),
    },
    {
      title: t('services.items.commerce.title'),
      text: t('services.items.commerce.text'),
    },
  ]
  const processSteps = [
    [
      t('process.steps.discovery.title'),
      t('process.steps.discovery.description'),
    ],
    [
      t('process.steps.proposal.title'),
      t('process.steps.proposal.description'),
    ],
    [t('process.steps.build.title'), t('process.steps.build.description')],
    [t('process.steps.launch.title'), t('process.steps.launch.description')],
  ]
  const aboutParagraphs = [
    t('about.paragraphs.experience', {
      years: siteConfig.facts.commercialExperienceYears,
      users: siteConfig.facts.saasUsers,
    }),
    t('about.paragraphs.approach'),
  ]

  return (
    <PortfolioShell lang={locale}>
      <a
        className="fixed top-3 left-3 z-[100] -translate-y-[150%] rounded-lg bg-portfolio-accent px-4 py-[0.7rem] text-[#101411] focus:translate-y-0"
        href="#main"
      >
        {t('skipToContent')}
      </a>
      <PortfolioHeader locale={locale} alternateHref={`/${alternateLocale}`} />

      <main id="main">
        <section
          className="mx-auto grid min-h-[calc(70dvh-72px)] w-full max-w-[1280px] grid-cols-[minmax(0,1.65fr)_minmax(280px,0.85fr)] items-center gap-[clamp(2rem,4vw,5rem)] px-5 pt-[clamp(1rem,5vh,3rem)] max-lg:grid-cols-[minmax(0,1.4fr)_minmax(250px,0.6fr)] max-lg:gap-8 max-md:grid-cols-1 max-md:gap-6 max-md:px-4 max-md:pt-10"
          aria-labelledby="hero-title"
        >
          <div className="relative z-1">
            <PortfolioLabel>{t('hero.eyebrow')}</PortfolioLabel>
            <h1
              className="m-0 max-w-[18ch] text-[clamp(2.6rem,4.4vw,4.25rem)] leading-[1.02] font-[650] tracking-[-0.055em] text-portfolio-text text-balance max-lg:text-[clamp(2.5rem,5vw,3.25rem)] max-md:max-w-[16ch] max-md:text-[clamp(2.25rem,10.5vw,3.25rem)]"
              id="hero-title"
            >
              {t('hero.title')}
            </h1>
            <p className="mt-6 max-w-[58ch] text-[clamp(1rem,1.3vw,1.16rem)] leading-[1.65] text-portfolio-muted max-md:mt-[1.1rem]">
              {t('hero.description')}
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3 max-md:mt-6 max-md:flex-col max-md:items-stretch">
              <PortfolioButtonLink
                className="max-md:w-full max-md:whitespace-normal"
                href={`/${locale}#contact`}
              >
                {t('hero.primary')}
              </PortfolioButtonLink>
              <PortfolioButtonLink
                className="max-md:w-full max-md:whitespace-normal"
                href={`/${locale}#work`}
                variant="secondary"
              >
                {t('hero.secondary')}
              </PortfolioButtonLink>
            </div>
          </div>
          <figure className="relative m-0 min-h-[min(63vh,650px)] self-end overflow-hidden max-md:min-h-[230px]">
            <div
              className="absolute bottom-0 left-1/2 aspect-square w-[min(100%,950px)] -translate-x-1/2 rounded-full bg-portfolio-accent max-md:w-[230px]"
              aria-hidden="true"
            />
            <Image
              className="z-1 object-contain object-bottom"
              src="/images/portfolio/hero4.webp"
              alt={t('hero.imageAlt')}
              fill
              priority
              sizes="(max-width: 767px) 100vw, 48vw"
            />
          </figure>
        </section>

        <section
          className="border-y border-portfolio-line"
          aria-label={t('proofs.label')}
        >
          <div className="mx-auto grid w-full max-w-[1280px] grid-cols-4 px-5 max-md:grid-cols-2 max-md:px-4">
            {proofs.map(([value, label]) => (
              <div
                className={`flex min-h-[150px] flex-col justify-center gap-[0.35rem] border-r border-portfolio-line px-[clamp(1rem,2.5vw,2rem)] py-6 first:pl-0 last:border-r-0 max-md:min-h-[135px] max-md:border-b max-md:p-[1.2rem] max-md:first:pl-[1.2rem] max-md:nth-[2n]:border-r-0 max-md:nth-[n+3]:border-b-0`}
                key={label}
              >
                <strong className="font-mono text-[clamp(1.3rem,2.2vw,2rem)] font-medium tracking-[-0.04em] text-portfolio-text">
                  {value}
                </strong>
                <span className="max-w-[22ch] text-[0.85rem] leading-[1.45] text-portfolio-muted">
                  {label}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section
          className="mx-auto w-full max-w-[1280px] px-5 py-[clamp(5rem,10vw,9rem)] max-md:px-4 max-md:py-20"
          id="work"
        >
          <PortfolioSectionHeading
            title={t('work.title')}
            intro={t('work.intro')}
          />
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
                      className="relative flex font-mono flex-wrap p-4 gap-4 justify-center aspect-16/10 h-auto place-items-center overflow-hidden rounded-xl bg-[linear-gradient(135deg,transparent_0_44%,rgb(119_217_184/0.09)_44%_56%,transparent_56%),var(--color-portfolio-surface-strong)] text-portfolio-accent no-underline after:pointer-events-none after:absolute after:inset-0 after:ring-1 after:ring-inset after:ring-portfolio-text/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-accent focus-visible:ring-offset-2 focus-visible:ring-offset-portfolio-bg max-md:aspect-[4/3]"
                      href={{
                        pathname: '/projects/[slug]',
                        params: { slug: key },
                      }}
                    >
                      {['1', '2', '3', '5', '7', '13'].map((estimate) => (
                        <PlanningPokerCard key={estimate}>
                          {estimate}
                        </PlanningPokerCard>
                      ))}
                    </LocalizedLink>
                  )}
                  <div className="pt-6">
                    <PortfolioLabel className="mb-[0.65rem]">
                      {project.kind}
                    </PortfolioLabel>
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
              <PortfolioLabel className="mb-[0.35rem]">
                {t('writing.kind')}
              </PortfolioLabel>
              <h3 className="m-0 text-[1.45rem] tracking-[-0.035em]">
                Daily Standup
              </h3>
            </div>
            <p className="m-0 text-portfolio-muted">
              {t('writing.featuredDescription')}
            </p>
            <PortfolioTextLink
              className="mt-0 whitespace-nowrap max-md:justify-self-start"
              href="/blog/daily-standup"
            >
              {t('writing.readArticle')}
            </PortfolioTextLink>
          </article>
        </section>

        <section
          className="bg-portfolio-surface py-[clamp(5rem,10vw,9rem)] max-md:py-20"
          id="services"
        >
          <div className="mx-auto w-full max-w-[1280px] px-5 max-md:px-4">
            <PortfolioSectionHeading
              className="max-w-[820px]"
              eyebrow={t('services.eyebrow')}
              title={t('services.title')}
              intro={t('services.intro')}
            />
            <div className="grid grid-cols-[1.15fr_0.85fr] grid-rows-2 gap-4 max-md:grid-cols-1 max-md:grid-rows-none">
              {services.map((service, index) => (
                <article
                  className={`rounded-xl border border-portfolio-line bg-portfolio-bg p-[clamp(1.75rem,4vw,3.5rem)] ${
                    index === 0
                      ? 'row-span-2 flex min-h-[460px] flex-col justify-end bg-[radial-gradient(circle_at_85%_15%,rgb(119_217_184_/_0.14),transparent_36%),var(--color-portfolio-bg)] max-md:row-auto max-md:min-h-0'
                      : index === 1
                        ? 'bg-portfolio-surface-strong'
                        : ''
                  }`}
                  key={service.title}
                >
                  <span
                    className="mb-auto font-mono text-[0.78rem] text-portfolio-faint max-md:mb-12 max-md:block"
                    aria-hidden="true"
                  >
                    0{index + 1}
                  </span>
                  <h3 className="m-0 max-w-[18ch] text-[clamp(1.45rem,2.4vw,2.25rem)] leading-[1.15] font-[650] tracking-[-0.04em]">
                    {service.title}
                  </h3>
                  <p className="mt-4 max-w-[52ch] text-portfolio-muted">
                    {service.text}
                  </p>
                </article>
              ))}
            </div>
            <p className="mt-6 max-w-[64ch] text-portfolio-muted">
              {t('services.extra')}
            </p>
          </div>
        </section>

        <section className="mx-auto w-full max-w-[1280px] px-5 py-[clamp(5rem,10vw,9rem)] max-md:px-4 max-md:py-20">
          <PortfolioSectionHeading
            title={t('process.title')}
            intro={t('process.intro')}
          />
          <ol className="m-0 grid list-none grid-cols-4 p-0 max-lg:grid-cols-2 max-md:grid-cols-1">
            {processSteps.map(([title, description], index) => (
              <li
                className={`min-h-[270px] border-l border-portfolio-line p-8 max-lg:nth-[3]:border-l-0 max-lg:nth-[3]:pl-0 max-md:min-h-0 max-md:border-t max-md:border-l-0 max-md:px-0 max-md:py-7 ${index === 0 ? 'border-l-0 pl-0' : ''}`}
                key={title}
              >
                <h3 className="mt-0 mb-20 text-xl font-[650] tracking-[-0.03em] max-lg:mb-12 max-md:mb-5">
                  {title}
                </h3>
                <p className="m-0 text-[0.92rem] text-portfolio-muted">
                  {description}
                </p>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="bg-portfolio-surface-strong py-[clamp(5rem,10vw,9rem)] max-md:py-20"
          id="about"
        >
          <div className="mx-auto grid w-full max-w-[1280px] grid-cols-[minmax(300px,0.75fr)_minmax(0,1.25fr)] items-center gap-[clamp(3rem,8vw,8rem)] px-5 max-md:grid-cols-1 max-md:px-4">
            <div
              className="flex min-h-[610px] relative flex-col justify-between rounded-xl -scale-x-100 bg-[linear-gradient(145deg,rgb(119_217_184_/_0.11),transparent_52%),var(--color-portfolio-bg)] text-portfolio-muted max-md:min-h-[430px]"
              role="img"
              aria-label={t('about.photoAlt')}
            >
              <Image
                src={'/images/portfolio/o-mnie.webp'}
                fill
                alt={''}
                className={'object-contain mask-b-from-50% mask-b-to-85%'}
              />
            </div>
            <div>
              <h2 className="m-0 text-[clamp(2.25rem,4.4vw,4rem)] leading-[1.06] font-[650] tracking-[-0.05em] text-portfolio-text text-balance">
                {t('about.title')}
              </h2>
              {aboutParagraphs.map((paragraph) => (
                <p
                  className="mt-6 max-w-[66ch] text-[1.02rem] text-portfolio-muted"
                  key={paragraph}
                >
                  {paragraph}
                </p>
              ))}
              <PortfolioTextLink
                className="mt-8"
                direction="external"
                href="https://www.linkedin.com/in/sebastiansiejek/"
                target="_blank"
                rel="noreferrer"
              >
                {t('about.linkedin')}
              </PortfolioTextLink>
            </div>
          </div>
        </section>

        <section
          className="mx-auto w-full max-w-[1280px] px-5 py-[clamp(5rem,10vw,9rem)] max-md:px-4 max-md:py-20"
          id="writing"
        >
          <PortfolioSectionHeading
            title={t('writing.title')}
            intro={t('writing.intro')}
          />
          <div className="grid grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)] items-center gap-[clamp(2rem,6vw,6rem)] max-md:grid-cols-1 max-md:gap-6">
            <Link
              className="group relative block aspect-[16/10] overflow-hidden rounded-xl bg-portfolio-surface after:pointer-events-none after:absolute after:inset-0 after:ring-1 after:ring-inset after:ring-portfolio-text/8 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-accent focus-visible:ring-offset-2 focus-visible:ring-offset-portfolio-bg"
              href="/blog/daily-standup"
              aria-label={t('writing.featured')}
            >
              <Image
                className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.025]"
                src="/images/posts/daily-standup/daily-standup.png"
                alt=""
                fill
                sizes="(max-width: 767px) 100vw, 54vw"
              />
            </Link>
            <div>
              <PortfolioLabel className="mb-3">
                {t('writing.language')}
              </PortfolioLabel>
              <h3 className="m-0 text-[clamp(1.6rem,3vw,2.4rem)] font-[650] tracking-[-0.04em] text-portfolio-text">
                {t('writing.featured')}
              </h3>
              <p className="mt-3 max-w-[58ch] text-portfolio-muted">
                {t('writing.featuredDescription')}
              </p>
              <PortfolioTextLink href="/blog/daily-standup">
                {t('writing.read')}
              </PortfolioTextLink>
            </div>
          </div>
          <PortfolioButtonLink
            className="mt-12"
            href="/blog"
            variant="secondary"
          >
            {t('writing.all')}
          </PortfolioButtonLink>
        </section>

        <section
          className="bg-portfolio-surface py-[clamp(5rem,10vw,9rem)] max-md:py-20"
          id="contact"
        >
          <div className="mx-auto grid w-full max-w-[1280px] grid-cols-[minmax(0,0.85fr)_minmax(360px,1.15fr)] gap-[clamp(3rem,8vw,8rem)] px-5 max-md:grid-cols-1 max-md:gap-10 max-md:px-4">
            <div>
              <PortfolioLabel>{t('contact.eyebrow')}</PortfolioLabel>
              <h2 className="m-0 text-[clamp(2.25rem,4.4vw,4rem)] leading-[1.06] font-[650] tracking-[-0.05em] text-portfolio-text text-balance">
                {t('contact.title')}
              </h2>
              <p className="mt-5 max-w-[64ch] text-[1.06rem] text-portfolio-muted">
                {t('contact.intro')}
              </p>
            </div>
            <ContactForm />
          </div>
        </section>
      </main>

      <SiteFooter locale={locale} />
    </PortfolioShell>
  )
}

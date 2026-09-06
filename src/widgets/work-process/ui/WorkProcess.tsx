import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { SiteContainer } from 'shared/ui/portfolio-layout'
import { SectionHeading } from 'shared/ui/portfolio-section-heading'

export async function WorkProcess({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'Site.process' })
  const steps = [
    [t('steps.discovery.title'), t('steps.discovery.description')],
    [t('steps.proposal.title'), t('steps.proposal.description')],
    [t('steps.build.title'), t('steps.build.description')],
    [t('steps.launch.title'), t('steps.launch.description')],
  ]

  return (
    <section>
      <SiteContainer className="py-[clamp(5rem,10vw,9rem)] max-md:py-20">
        <SectionHeading title={t('title')} intro={t('intro')} />
        <ol className="m-0 grid list-none grid-cols-4 p-0 max-lg:grid-cols-2 max-md:grid-cols-1">
          {steps.map(([title, description], index) => (
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
      </SiteContainer>
    </section>
  )
}

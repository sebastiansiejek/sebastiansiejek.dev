import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { cn } from 'shared/lib/utilities'
import { SiteContainer } from 'shared/ui/site-layout'
import { SectionHeading } from 'shared/ui/section-heading'

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
      <SiteContainer className="py-20 md:py-28 lg:py-36">
        <SectionHeading title={t('title')} intro={t('intro')} />
        <ol className="m-0 grid list-none grid-cols-4 p-0 max-lg:grid-cols-2 max-md:grid-cols-1">
          {steps.map(([title, description], index) => (
            <li
              className={cn(
                'min-h-64 border-l border-border p-8 max-md:min-h-0 max-md:border-t max-md:border-l-0 max-md:px-0 max-md:py-7',
                index === 0 &&
                  'border-l-0 pl-0 max-md:border-t-0',
                index === 2 && 'max-lg:border-l-0 max-lg:pl-0',
              )}
              key={title}
            >
              <h3 className="mt-0 mb-20 text-xl font-semibold tracking-tight max-lg:mb-12 max-md:mb-5">
                {title}
              </h3>
              <p className="m-0 text-sm text-muted-foreground md:text-base">
                {description}
              </p>
            </li>
          ))}
        </ol>
      </SiteContainer>
    </section>
  )
}

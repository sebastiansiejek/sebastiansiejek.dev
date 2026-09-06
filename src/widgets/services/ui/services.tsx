import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { SiteContainer } from 'shared/ui/site-layout'
import { SectionHeading } from 'shared/ui/section-heading'
import { CardTitle } from 'shared/ui/typography'

export async function Services({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'Site.services' })
  const services = [
    {
      title: t('items.applications.title'),
      text: t('items.applications.text'),
    },
    {
      title: t('items.automation.title'),
      text: t('items.automation.text'),
    },
    {
      title: t('items.commerce.title'),
      text: t('items.commerce.text'),
    },
  ]

  return (
    <section
      className="bg-surface py-20 md:py-28 lg:py-36"
      id="services"
    >
      <SiteContainer>
        <SectionHeading
          className="max-w-4xl"
          eyebrow={t('eyebrow')}
          title={t('title')}
          intro={t('intro')}
        />
        <div className="grid grid-cols-2 grid-rows-2 gap-4 max-md:grid-cols-1 max-md:grid-rows-none">
          {services.map((service, index) => (
            <article
              className={`rounded-xl border border-border bg-background p-8 lg:p-14 ${
                index === 0
                  ? 'accent-wash row-span-2 flex min-h-112 flex-col justify-end max-md:row-auto max-md:min-h-0'
                  : (index === 1
                    ? 'bg-surface-raised'
                    : '')
              }`}
              key={service.title}
            >
              <span
                className="mb-auto font-mono text-xs text-subtle max-md:mb-12 max-md:block"
                aria-hidden="true"
              >
                0{index + 1}
              </span>
              <CardTitle className="max-w-lg">
                {service.title}
              </CardTitle>
              <p className="mt-4 max-w-prose text-muted">
                {service.text}
              </p>
            </article>
          ))}
        </div>
        <p className="mt-6 max-w-prose text-muted">{t('extra')}</p>
      </SiteContainer>
    </section>
  )
}

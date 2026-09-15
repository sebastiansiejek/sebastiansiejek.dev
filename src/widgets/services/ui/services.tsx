import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { Card, CardContent, CardHeader, CardTitle } from 'shared/ui/card'
import { SiteContainer } from 'shared/ui/site-layout'
import { SectionHeading } from 'shared/ui/section-heading'

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
  ]

  return (
    <section
      className="bg-secondary py-20 md:py-28 lg:py-36"
      id="services"
    >
      <SiteContainer>
        <SectionHeading
          className="max-w-4xl"
          eyebrow={t('eyebrow')}
          title={t('title')}
          intro={t('intro')}
        />
        <div className="grid grid-cols-2 gap-4 max-md:grid-cols-1">
          {services.map((service, index) => (
            <Card
              key={service.title}
              variant={index === 0 ? 'accent' : 'default'}
            >
              <CardHeader>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="max-w-prose text-muted-foreground">
                  {service.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
        <p className="mt-6 max-w-prose text-muted-foreground">{t('extra')}</p>
      </SiteContainer>
    </section>
  )
}

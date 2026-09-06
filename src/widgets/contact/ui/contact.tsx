import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { ContactForm } from 'features/contact-form'
import { SiteContainer } from 'shared/ui/site-layout'
import { SectionHeading } from 'shared/ui/section-heading'

export async function Contact({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'Site.contact' })

  return (
    <section
      className="bg-surface py-20 md:py-28 lg:py-36"
      id="contact"
    >
      <SiteContainer className="grid grid-cols-2 gap-10 md:gap-16 lg:gap-32 max-md:grid-cols-1">
        <SectionHeading
          className="mb-0"
          eyebrow={t('eyebrow')}
          title={t('title')}
          intro={t('intro')}
        />
        <ContactForm />
      </SiteContainer>
    </section>
  )
}

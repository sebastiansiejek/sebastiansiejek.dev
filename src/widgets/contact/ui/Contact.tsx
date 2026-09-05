import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { ContactForm } from 'features/contact-form'
import { SectionLabel } from 'shared/ui/portfolio-section-heading'

export async function Contact({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'Site.contact' })

  return (
    <section
      className="bg-portfolio-surface py-[clamp(5rem,10vw,9rem)] max-md:py-20"
      id="contact"
    >
      <div className="mx-auto grid w-full max-w-[1280px] grid-cols-[minmax(0,0.85fr)_minmax(360px,1.15fr)] gap-[clamp(3rem,8vw,8rem)] px-5 max-md:grid-cols-1 max-md:gap-10 max-md:px-4">
        <div>
          <SectionLabel>{t('eyebrow')}</SectionLabel>
          <h2 className="m-0 text-[clamp(2.25rem,4.4vw,4rem)] leading-[1.06] font-[650] tracking-[-0.05em] text-portfolio-text text-balance">
            {t('title')}
          </h2>
          <p className="mt-5 max-w-[64ch] text-[1.06rem] text-portfolio-muted">
            {t('intro')}
          </p>
        </div>
        <ContactForm />
      </div>
    </section>
  )
}

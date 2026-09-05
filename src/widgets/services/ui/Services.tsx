import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { SectionHeading } from 'shared/ui/portfolio-section-heading'

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
      className="bg-portfolio-surface py-[clamp(5rem,10vw,9rem)] max-md:py-20"
      id="services"
    >
      <div className="mx-auto w-full max-w-[1280px] px-5 max-md:px-4">
        <SectionHeading
          className="max-w-[820px]"
          eyebrow={t('eyebrow')}
          title={t('title')}
          intro={t('intro')}
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
        <p className="mt-6 max-w-[64ch] text-portfolio-muted">{t('extra')}</p>
      </div>
    </section>
  )
}

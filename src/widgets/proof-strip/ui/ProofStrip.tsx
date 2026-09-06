import type { Locale } from 'next-intl'
import { getFormatter, getTranslations } from 'next-intl/server'
import { siteConfig } from 'shared/config/site'
import { SiteContainer } from 'shared/ui/portfolio-layout'

export async function ProofStrip({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'Site.proofs' })
  const format = await getFormatter({ locale })
  const proofs = [
    [
      `${format.number(siteConfig.facts.commercialExperienceYears)}+`,
      t('experience.label'),
    ],
    [`${format.number(siteConfig.facts.saasUsers)}+`, t('users.label')],
    [
      `${format.number(siteConfig.facts.deliveredWebProjects)}+`,
      t('projects.label'),
    ],
    [t('delivery.value'), t('delivery.label')],
  ]

  return (
    <section className="border-y border-portfolio-line" aria-label={t('label')}>
      <SiteContainer className="grid grid-cols-4 max-md:grid-cols-2">
        {proofs.map(([value, label]) => (
          <div
            className="flex min-h-[150px] flex-col justify-center gap-[0.35rem] border-r border-portfolio-line px-[clamp(1rem,2.5vw,2rem)] py-6 first:pl-0 last:border-r-0 max-md:min-h-[135px] max-md:border-b max-md:p-[1.2rem] max-md:first:pl-[1.2rem] max-md:nth-[2n]:border-r-0 max-md:nth-[n+3]:border-b-0"
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
      </SiteContainer>
    </section>
  )
}

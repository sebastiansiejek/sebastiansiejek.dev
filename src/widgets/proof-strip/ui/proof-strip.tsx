import type { Locale } from 'next-intl'
import { getFormatter, getTranslations } from 'next-intl/server'
import { siteConfig } from 'shared/config/site'
import { SiteContainer } from 'shared/ui/site-layout'

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
    <section className="border-y border-border" aria-label={t('label')}>
      <SiteContainer className="grid grid-cols-4 gap-px bg-border max-md:grid-cols-2">
        {proofs.map(([value, label]) => (
          <div
            className="flex min-h-32 flex-col justify-center gap-1 bg-background p-5 md:min-h-36 md:px-6 lg:px-8"
            key={label}
          >
            <strong className="font-mono text-xl font-medium tracking-tighter text-foreground md:text-2xl lg:text-3xl">
              {value}
            </strong>
            <span className="max-w-48 text-sm leading-snug text-muted-foreground">
              {label}
            </span>
          </div>
        ))}
      </SiteContainer>
    </section>
  )
}

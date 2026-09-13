import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { siteConfig } from 'shared/config/site'
import { SiteContainer, SiteShell } from 'shared/ui/site-layout'
import { SkipLink } from 'shared/ui/skip-link'
import { TextLink } from 'shared/ui/text-link'
import { SiteFooter } from 'widgets/site-footer'
import { SiteHeader } from 'widgets/site-header'
import { ArrowLink } from 'shared/ui/arrow-link'

const sectionKeys = [
  'controller',
  'data',
  'purpose',
  'recipients',
  'retention',
  'rights',
  'automation',
] as const

export async function PrivacyPage({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'Privacy' })
  const siteT = await getTranslations({ locale, namespace: 'Site' })
  const alternateHref =
    locale === 'pl' ? '/en/privacy' : '/pl/polityka-prywatnosci'

  return (
    <SiteShell lang={locale}>
      <SkipLink href="#main">{siteT('skipToContent')}</SkipLink>
      <SiteHeader locale={locale} alternateHref={alternateHref} />

      <main id="main">
        <SiteContainer className="max-w-4xl py-20 md:py-28 lg:py-36">
          <header className="mb-16 flex flex-col gap-5 md:mb-20">
            <p className="m-0 font-mono text-xs tracking-[0.18em] text-primary uppercase">
              {t('eyebrow')}
            </p>
            <h1 className="m-0 max-w-3xl text-4xl leading-tight font-semibold tracking-tight text-balance md:text-6xl">
              {t('title')}
            </h1>
            <p className="m-0 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
              {t('intro')}
            </p>
            <p className="m-0 text-xs text-muted-foreground">{t('updated')}</p>
          </header>

          <div className="flex max-w-3xl flex-col gap-12">
            {sectionKeys.map((section) => (
              <section className="flex flex-col gap-3" key={section}>
                <h2 className="m-0 text-xl font-semibold tracking-tight md:text-2xl">
                  {t(`sections.${section}.title`)}
                </h2>
                <p className="m-0 text-sm leading-7 text-muted-foreground md:text-base">
                  {t(`sections.${section}.text`)}{' '}
                  {section === 'controller' && (
                    <>
                      {t('sections.controller.contact')}{' '}
                      <TextLink
                        href={`mailto:${siteConfig.contactEmail}`}
                        className="text-foreground"
                      >
                        {siteConfig.contactEmail}
                      </TextLink>
                      .
                    </>
                  )}
                </p>
              </section>
            ))}
          </div>

          <ArrowLink className="mt-16 inline-flex" href={`/${locale}`}>
            {t('back')}
          </ArrowLink>
        </SiteContainer>
      </main>

      <SiteFooter locale={locale} />
    </SiteShell>
  )
}

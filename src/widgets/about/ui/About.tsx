import Image from 'next/image'
import type { Locale } from 'next-intl'
import { getTranslations } from 'next-intl/server'
import { siteConfig } from 'shared/config/site'
import { SiteContainer } from 'shared/ui/portfolio-layout'
import { ArrowLink } from 'shared/ui/portfolio-text-link'

export async function About({ locale }: { locale: Locale }) {
  const t = await getTranslations({ locale, namespace: 'Site.about' })
  const paragraphs = [
    t('paragraphs.experience', {
      years: siteConfig.facts.commercialExperienceYears,
      users: siteConfig.facts.saasUsers,
    }),
    t('paragraphs.approach'),
  ]

  return (
    <section
      className="bg-portfolio-surface-strong py-[clamp(5rem,10vw,9rem)] max-md:py-20"
      id="about"
    >
      <SiteContainer className="grid grid-cols-[minmax(300px,0.75fr)_minmax(0,1.25fr)] items-center gap-[clamp(3rem,8vw,8rem)] max-md:grid-cols-1">
        <div
          className="relative flex min-h-[610px] -scale-x-100 flex-col justify-between rounded-xl bg-[linear-gradient(145deg,rgb(119_217_184_/_0.11),transparent_52%),var(--color-portfolio-bg)] text-portfolio-muted max-md:min-h-[430px]"
          role="img"
          aria-label={t('photoAlt')}
        >
          <Image
            src="/images/portfolio/o-mnie.webp"
            fill
            alt=""
            className="object-contain mask-b-from-50% mask-b-to-85%"
          />
        </div>
        <div>
          <h2 className="m-0 text-[clamp(2.25rem,4.4vw,4rem)] leading-[1.06] font-[650] tracking-[-0.05em] text-portfolio-text text-balance">
            {t('title')}
          </h2>
          {paragraphs.map((paragraph) => (
            <p
              className="mt-6 max-w-[66ch] text-[1.02rem] text-portfolio-muted"
              key={paragraph}
            >
              {paragraph}
            </p>
          ))}
          <ArrowLink
            className="mt-8"
            direction="external"
            href="https://www.linkedin.com/in/sebastiansiejek/"
            target="_blank"
            rel="noreferrer"
          >
            {t('linkedin')}
          </ArrowLink>
        </div>
      </SiteContainer>
    </section>
  )
}

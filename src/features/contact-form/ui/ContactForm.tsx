'use client'

import { FormEvent } from 'react'
import { useTranslations } from 'next-intl'
import { siteConfig } from 'shared/config/site'
import { ActionButton } from 'shared/ui/portfolio-button'

export function ContactForm() {
  const t = useTranslations('Site.contact')

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const name = String(form.get('name') || '')
    const email = String(form.get('email') || '')
    const message = String(form.get('message') || '')
    const subject = t('subject', { name })
    const body = `${message}\n\n${t('replyEmail')}: ${email}`

    window.location.href = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <label
          className="text-[0.86rem] font-bold text-portfolio-text"
          htmlFor="contact-name"
        >
          {t('name')}
        </label>
        <input
          className="min-h-[50px] w-full rounded-lg border border-portfolio-field-border bg-portfolio-bg px-[0.9rem] font-[inherit] text-portfolio-text transition-colors duration-[180ms] placeholder:text-portfolio-placeholder focus:border-portfolio-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-accent focus-visible:ring-offset-2 focus-visible:ring-offset-portfolio-bg"
          id="contact-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder={t('namePlaceholder')}
          required
        />
      </div>
      <div className="grid gap-2">
        <label
          className="text-[0.86rem] font-bold text-portfolio-text"
          htmlFor="contact-email"
        >
          {t('email')}
        </label>
        <input
          className="min-h-[50px] w-full rounded-lg border border-portfolio-field-border bg-portfolio-bg px-[0.9rem] font-[inherit] text-portfolio-text transition-colors duration-[180ms] placeholder:text-portfolio-placeholder focus:border-portfolio-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-accent focus-visible:ring-offset-2 focus-visible:ring-offset-portfolio-bg"
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder={t('emailPlaceholder')}
          required
        />
      </div>
      <div className="grid gap-2">
        <label
          className="text-[0.86rem] font-bold text-portfolio-text"
          htmlFor="contact-message"
        >
          {t('message')}
        </label>
        <textarea
          className="min-h-[150px] w-full resize-y rounded-lg border border-portfolio-field-border bg-portfolio-bg px-[0.9rem] py-3 font-[inherit] text-portfolio-text transition-colors duration-[180ms] placeholder:text-portfolio-placeholder focus:border-portfolio-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-accent focus-visible:ring-offset-2 focus-visible:ring-offset-portfolio-bg"
          id="contact-message"
          name="message"
          rows={6}
          placeholder={t('messagePlaceholder')}
          required
        />
      </div>
      <ActionButton className="justify-self-start max-md:w-full" type="submit">
        {t('submit')}
      </ActionButton>
      <p className="m-0 max-w-[62ch] text-[0.8rem] text-portfolio-muted">
        {t('helper')}{' '}
        <a
          className="text-portfolio-text"
          href={`mailto:${siteConfig.contactEmail}`}
        >
          {siteConfig.contactEmail}
        </a>
      </p>
    </form>
  )
}

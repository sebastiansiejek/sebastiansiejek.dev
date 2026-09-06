'use client'

import { FormEvent } from 'react'
import { useTranslations } from 'next-intl'
import { siteConfig } from 'shared/config/site'
import { ActionButton } from 'shared/ui/action'
import { TextareaField, TextField } from 'shared/ui/form-field'
import { TextLink } from 'shared/ui/text-link'

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

    globalThis.location.href = `mailto:${siteConfig.contactEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
  }

  return (
    <form className="grid gap-5" onSubmit={handleSubmit}>
      <TextField
        label={t('name')}
        name="name"
        type="text"
        autoComplete="name"
        placeholder={t('namePlaceholder')}
        required
      />
      <TextField
        label={t('email')}
        name="email"
        type="email"
        autoComplete="email"
        placeholder={t('emailPlaceholder')}
        required
      />
      <TextareaField
        label={t('message')}
        name="message"
        rows={6}
        placeholder={t('messagePlaceholder')}
        required
      />
      <ActionButton className="justify-self-start max-md:w-full" type="submit">
        {t('submit')}
      </ActionButton>
      <p className="m-0 max-w-prose text-xs text-muted">
        {t('helper')}{' '}
        <TextLink
          className="text-foreground"
          href={`mailto:${siteConfig.contactEmail}`}
        >
          {siteConfig.contactEmail}
        </TextLink>
      </p>
    </form>
  )
}

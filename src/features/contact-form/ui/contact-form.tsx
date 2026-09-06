'use client'

import { FormEvent } from 'react'
import { useTranslations } from 'next-intl'
import { siteConfig } from 'shared/config/site'
import { Button } from 'shared/ui/button'
import { Field, FieldGroup, FieldLabel } from 'shared/ui/field'
import { Input } from 'shared/ui/input'
import { Textarea } from 'shared/ui/textarea'
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
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <FieldGroup>
        <Field>
          <FieldLabel htmlFor="contact-name">{t('name')}</FieldLabel>
          <Input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder={t('namePlaceholder')}
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="contact-email">{t('email')}</FieldLabel>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={t('emailPlaceholder')}
            required
          />
        </Field>
        <Field>
          <FieldLabel htmlFor="contact-message">{t('message')}</FieldLabel>
          <Textarea
            id="contact-message"
            name="message"
            rows={6}
            placeholder={t('messagePlaceholder')}
            required
          />
        </Field>
      </FieldGroup>
      <Button className="self-start max-md:w-full" size="lg" type="submit">
        {t('submit')}
      </Button>
      <p className="m-0 max-w-prose text-xs text-muted-foreground">
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

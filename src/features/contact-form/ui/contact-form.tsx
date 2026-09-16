'use client'

import { FormEvent, useCallback, useEffect, useRef, useState } from 'react'
import { CheckCircle2Icon, TriangleAlertIcon } from 'lucide-react'
import { useTranslations } from 'next-intl'
import {
  contactFormLimits,
  type ContactField,
  type ContactFieldError,
  type ContactFieldErrors,
  type ContactFields,
  validateContactFields,
} from '../model/contact-form'
import { Turnstile } from './turnstile'
import { siteConfig } from 'shared/config/site'
import { getPathname } from 'shared/i18n/navigation'
import { Alert, AlertDescription, AlertTitle } from 'shared/ui/alert'
import { Button } from 'shared/ui/button'
import { Field, FieldError, FieldGroup, FieldLabel } from 'shared/ui/field'
import { Input } from 'shared/ui/input'
import { Spinner } from 'shared/ui/spinner'
import { Textarea } from 'shared/ui/textarea'
import { TextLink } from 'shared/ui/text-link'

type ContactFormProperties = {
  locale: 'pl' | 'en'
  turnstileSiteKey?: string
}

type SubmissionStatus = 'idle' | 'pending' | 'success' | 'error'
type PendingSubmission = ContactFields & { company: string }

function createRequestId() {
  return globalThis.crypto.randomUUID()
}

export function ContactForm({
  locale,
  turnstileSiteKey,
}: ContactFormProperties) {
  const t = useTranslations('Site.contact')
  const formReference = useRef<HTMLFormElement>(null)
  const startedAtReference = useRef(0)
  const requestIdReference = useRef<string | undefined>(undefined)
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({})
  const [executeSignal, setExecuteSignal] = useState(0)
  const [pendingSubmission, setPendingSubmission] = useState<
    PendingSubmission | undefined
  >()
  const [resetSignal, setResetSignal] = useState(0)
  const [status, setStatus] = useState<SubmissionStatus>('idle')
  const [turnstileToken, setTurnstileToken] = useState<string | undefined>()
  const [verificationError, setVerificationError] = useState(
    !turnstileSiteKey,
  )

  const privacyPath = getPathname({ locale, href: '/privacy' })

  useEffect(() => {
    startedAtReference.current = Date.now()
  }, [])

  const translateFieldError = (
    field: ContactField,
    error: ContactFieldError,
  ) => {
    if (error === 'required') return t('validation.required')
    if (field === 'email' && error === 'invalid')
      return t('validation.emailInvalid')
    if (field === 'name' && error === 'tooShort')
      return t('validation.nameTooShort', { min: contactFormLimits.name.min })
    if (field === 'name' && error === 'tooLong')
      return t('validation.nameTooLong', { max: contactFormLimits.name.max })
    if (field === 'email' && error === 'tooLong')
      return t('validation.emailTooLong', { max: contactFormLimits.email.max })
    if (field === 'message' && error === 'tooShort')
      return t('validation.messageTooShort', {
        min: contactFormLimits.message.min,
      })

    return t('validation.messageTooLong', {
      max: contactFormLimits.message.max,
    })
  }

  const resetTurnstile = useCallback(() => {
    setTurnstileToken(undefined)
    setResetSignal((value) => value + 1)
  }, [])

  const handleVerificationError = useCallback(() => {
    setPendingSubmission(undefined)
    setVerificationError(true)
    setTurnstileToken(undefined)
    setStatus('error')
  }, [])

  const handleVerify = useCallback((token: string) => {
    setVerificationError(false)
    setTurnstileToken(token)
  }, [])

  const handleInput = () => {
    if (status === 'error' && !verificationError) setStatus('idle')
    if (Object.keys(fieldErrors).length > 0) setFieldErrors({})
    requestIdReference.current = undefined
  }

  useEffect(() => {
    if (!pendingSubmission || !turnstileToken) return

    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10_000)

    const send = async () => {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            ...pendingSubmission,
            locale,
            requestId: requestIdReference.current,
            startedAt: startedAtReference.current,
            turnstileToken,
          }),
          signal: controller.signal,
        })

        if (!response.ok) {
          const result = (await response.json().catch(() => ({}))) as {
            error?: string
            fieldErrors?: ContactFieldErrors
          }

          if (result.fieldErrors) setFieldErrors(result.fieldErrors)
          if (result.error === 'verification-failed') setVerificationError(true)
          setPendingSubmission(undefined)
          setStatus('error')
          resetTurnstile()
          return
        }

        formReference.current?.reset()
        requestIdReference.current = undefined
        startedAtReference.current = Date.now()
        setPendingSubmission(undefined)
        setStatus('success')
      } catch {
        setPendingSubmission(undefined)
        setStatus('error')
        resetTurnstile()
      } finally {
        clearTimeout(timeout)
      }
    }

    void send()

    return () => {
      clearTimeout(timeout)
      controller.abort()
    }
  }, [locale, pendingSubmission, resetTurnstile, turnstileToken])

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const form = new FormData(event.currentTarget)
    const fields = {
      name: String(form.get('name') || ''),
      email: String(form.get('email') || ''),
      message: String(form.get('message') || ''),
    }
    const validation = validateContactFields(fields)

    if (!validation.success) {
      setFieldErrors(validation.errors)
      return
    }

    if (!turnstileSiteKey) {
      setVerificationError(true)
      setStatus('error')
      return
    }

    requestIdReference.current ??= createRequestId()
    setFieldErrors({})
    setVerificationError(false)
    setPendingSubmission({
      ...validation.data,
      company: String(form.get('company') || ''),
    })
    setStatus('pending')
    setExecuteSignal((value) => value + 1)
  }

  const handleSendAnother = () => {
    setStatus('idle')
    setFieldErrors({})
    setPendingSubmission(undefined)
    requestIdReference.current = undefined
    startedAtReference.current = Date.now()
    resetTurnstile()
  }

  if (status === 'success') {
    return (
      <div className="flex max-w-prose flex-col items-start gap-4" role="status">
        <Alert>
          <CheckCircle2Icon />
          <AlertTitle>{t('success.title')}</AlertTitle>
          <AlertDescription>{t('success.description')}</AlertDescription>
        </Alert>
        <Button variant="outline" onClick={handleSendAnother}>
          {t('success.another')}
        </Button>
      </div>
    )
  }

  return (
    <form
      ref={formReference}
      className="flex flex-col gap-5"
      noValidate
      onInput={handleInput}
      onSubmit={handleSubmit}
    >
      <FieldGroup>
        <Field data-invalid={Boolean(fieldErrors.name)}>
          <FieldLabel htmlFor="contact-name">{t('name')}</FieldLabel>
          <Input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder={t('namePlaceholder')}
            minLength={contactFormLimits.name.min}
            maxLength={contactFormLimits.name.max}
            aria-invalid={Boolean(fieldErrors.name)}
            aria-describedby={fieldErrors.name ? 'contact-name-error' : undefined}
            disabled={status === 'pending'}
            required
          />
          {fieldErrors.name && (
            <FieldError id="contact-name-error">
              {translateFieldError('name', fieldErrors.name)}
            </FieldError>
          )}
        </Field>
        <Field data-invalid={Boolean(fieldErrors.email)}>
          <FieldLabel htmlFor="contact-email">{t('email')}</FieldLabel>
          <Input
            id="contact-email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder={t('emailPlaceholder')}
            maxLength={contactFormLimits.email.max}
            aria-invalid={Boolean(fieldErrors.email)}
            aria-describedby={
              fieldErrors.email ? 'contact-email-error' : undefined
            }
            disabled={status === 'pending'}
            required
          />
          {fieldErrors.email && (
            <FieldError id="contact-email-error">
              {translateFieldError('email', fieldErrors.email)}
            </FieldError>
          )}
        </Field>
        <Field data-invalid={Boolean(fieldErrors.message)}>
          <FieldLabel htmlFor="contact-message">{t('message')}</FieldLabel>
          <Textarea
            id="contact-message"
            name="message"
            rows={6}
            placeholder={t('messagePlaceholder')}
            minLength={contactFormLimits.message.min}
            maxLength={contactFormLimits.message.max}
            aria-invalid={Boolean(fieldErrors.message)}
            aria-describedby={
              fieldErrors.message ? 'contact-message-error' : undefined
            }
            disabled={status === 'pending'}
            required
          />
          {fieldErrors.message && (
            <FieldError id="contact-message-error">
              {translateFieldError('message', fieldErrors.message)}
            </FieldError>
          )}
        </Field>
        <Field
          className="absolute -left-[10000px] top-auto size-px overflow-hidden"
          aria-hidden="true"
        >
          <FieldLabel htmlFor="contact-company">Company</FieldLabel>
          <Input
            id="contact-company"
            name="company"
            type="text"
            autoComplete="off"
            tabIndex={-1}
          />
        </Field>
      </FieldGroup>

      {turnstileSiteKey && (
        <Turnstile
          locale={locale}
          siteKey={turnstileSiteKey}
          executeSignal={executeSignal}
          resetSignal={resetSignal}
          onError={handleVerificationError}
          onVerify={handleVerify}
        />
      )}

      {status === 'error' && (
        <Alert variant="destructive">
          <TriangleAlertIcon />
          <AlertTitle>{t('error.title')}</AlertTitle>
          <AlertDescription>
            {verificationError
              ? t('error.verification')
              : t('error.description')}{' '}
            <TextLink href={`mailto:${siteConfig.contactEmail}`}>
              {siteConfig.contactEmail}
            </TextLink>
          </AlertDescription>
        </Alert>
      )}

      <Button
        className="self-start max-md:w-full"
        size="lg"
        type="submit"
        aria-label={status === 'pending' ? t('sending') : undefined}
        disabled={status === 'pending'}
      >
        {status === 'pending' && <Spinner data-icon="inline-start" />}
        {status === 'pending' ? t('sending') : t('submit')}
      </Button>
      <p className="m-0 max-w-prose text-xs text-muted-foreground">
        {t('helper')}{' '}
        <TextLink className="text-foreground" href={privacyPath}>
          {t('privacy')}
        </TextLink>{' '}
        {t('direct')}{' '}
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

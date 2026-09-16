export const contactFormLimits = {
  name: { min: 2, max: 100 },
  email: { max: 254 },
  message: { min: 20, max: 5000 },
  turnstileToken: { max: 2048 },
} as const

export const minimumSubmissionDurationMs = 1000

export type ContactLocale = 'pl' | 'en'
export type ContactField = 'name' | 'email' | 'message'
export type ContactFieldError =
  | 'required'
  | 'tooShort'
  | 'tooLong'
  | 'invalid'

export type ContactFieldErrors = Partial<
  Record<ContactField, ContactFieldError>
>

export type ContactFields = {
  name: string
  email: string
  message: string
}

export type ContactSubmission = ContactFields & {
  locale: ContactLocale
  company: string
  requestId: string
  startedAt: number
  turnstileToken: string
}

type ContactFieldsResult =
  | { success: true; data: ContactFields }
  | { success: false; errors: ContactFieldErrors }

export type ContactSubmissionResult =
  | { success: true; data: ContactSubmission }
  | { success: false; bot: true }
  | {
      success: false
      bot: false
      fieldErrors?: ContactFieldErrors
      reason: 'invalid-fields' | 'invalid-request'
    }

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/u
const requestIdPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/iu

function getString(value: unknown) {
  return typeof value === 'string' ? value.trim() : ''
}

export function validateContactFields(value: unknown): ContactFieldsResult {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return {
      success: false,
      errors: { name: 'required', email: 'required', message: 'required' },
    }
  }

  const input = value as Record<string, unknown>
  const name = getString(input.name).replaceAll(/\s+/gu, ' ')
  const email = getString(input.email)
  const message = getString(input.message)
  const errors: ContactFieldErrors = {}

  if (!name) errors.name = 'required'
  else if (name.length < contactFormLimits.name.min) errors.name = 'tooShort'
  else if (name.length > contactFormLimits.name.max) errors.name = 'tooLong'

  if (!email) errors.email = 'required'
  else if (email.length > contactFormLimits.email.max) errors.email = 'tooLong'
  else if (!emailPattern.test(email)) errors.email = 'invalid'

  if (!message) errors.message = 'required'
  else if (message.length < contactFormLimits.message.min)
    errors.message = 'tooShort'
  else if (message.length > contactFormLimits.message.max)
    errors.message = 'tooLong'

  return Object.keys(errors).length > 0
    ? { success: false, errors }
    : { success: true, data: { name, email, message } }
}

export function validateContactSubmission(
  value: unknown,
  now = Date.now(),
): ContactSubmissionResult {
  if (!value || typeof value !== 'object' || Array.isArray(value)) {
    return { success: false, bot: false, reason: 'invalid-request' }
  }

  const input = value as Record<string, unknown>

  if (getString(input.company)) {
    return { success: false, bot: true }
  }

  const fields = validateContactFields(input)

  if (!fields.success) {
    return {
      success: false,
      bot: false,
      reason: 'invalid-fields',
      fieldErrors: fields.errors,
    }
  }

  const locale = input.locale
  const requestId = getString(input.requestId)
  const startedAt = input.startedAt
  const turnstileToken = getString(input.turnstileToken)

  if (
    (locale !== 'pl' && locale !== 'en') ||
    !requestIdPattern.test(requestId) ||
    typeof startedAt !== 'number' ||
    !Number.isFinite(startedAt) ||
    startedAt > now ||
    !turnstileToken ||
    turnstileToken.length > contactFormLimits.turnstileToken.max
  ) {
    return { success: false, bot: false, reason: 'invalid-request' }
  }

  if (now - startedAt < minimumSubmissionDurationMs) {
    return { success: false, bot: true }
  }

  return {
    success: true,
    data: {
      ...fields.data,
      locale,
      company: '',
      requestId,
      startedAt,
      turnstileToken,
    },
  }
}

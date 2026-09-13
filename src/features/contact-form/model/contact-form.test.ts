import {
  contactFormLimits,
  minimumSubmissionDurationMs,
  validateContactFields,
  validateContactSubmission,
} from './contact-form'

const validSubmission = {
  name: 'Anna Kowalska',
  email: 'anna@example.com',
  message: 'Chciałabym porozmawiać o nowej aplikacji dla firmy.',
  locale: 'pl',
  company: '',
  requestId: 'cabf7b91-5a38-4d8f-9f5d-bb54dde4bf44',
  startedAt: 1000,
  turnstileToken: 'verified-token',
}

describe('contact form validation', () => {
  it('normalizes valid contact fields', () => {
    expect(
      validateContactFields({
        ...validSubmission,
        name: '  Anna   Kowalska  ',
        email: '  anna@example.com ',
        message: `  ${validSubmission.message}  `,
      }),
    ).toEqual({
      success: true,
      data: {
        name: 'Anna Kowalska',
        email: 'anna@example.com',
        message: validSubmission.message,
      },
    })
  })

  it('returns field-specific errors for invalid values', () => {
    expect(
      validateContactFields({ name: 'A', email: 'wrong', message: 'Too short' }),
    ).toEqual({
      success: false,
      errors: {
        name: 'tooShort',
        email: 'invalid',
        message: 'tooShort',
      },
    })
  })

  it('rejects values longer than the agreed limits', () => {
    const result = validateContactFields({
      name: 'A'.repeat(contactFormLimits.name.max + 1),
      email: `${'a'.repeat(contactFormLimits.email.max)}@example.com`,
      message: 'A'.repeat(contactFormLimits.message.max + 1),
    })

    expect(result).toEqual({
      success: false,
      errors: {
        name: 'tooLong',
        email: 'tooLong',
        message: 'tooLong',
      },
    })
  })

  it('accepts a complete server submission', () => {
    expect(validateContactSubmission(validSubmission, 10_000)).toEqual({
      success: true,
      data: validSubmission,
    })
  })

  it('silently identifies a filled honeypot or implausibly fast submission', () => {
    expect(
      validateContactSubmission({ ...validSubmission, company: 'Spam Ltd.' }, 10_000),
    ).toEqual({ success: false, bot: true })

    expect(
      validateContactSubmission(
        { ...validSubmission, startedAt: 10_000 },
        10_000 + minimumSubmissionDurationMs - 1,
      ),
    ).toEqual({ success: false, bot: true })
  })

  it('rejects invalid server-only fields', () => {
    expect(
      validateContactSubmission({ ...validSubmission, locale: 'de' }, 10_000),
    ).toEqual({
      success: false,
      bot: false,
      reason: 'invalid-request',
    })
  })
})

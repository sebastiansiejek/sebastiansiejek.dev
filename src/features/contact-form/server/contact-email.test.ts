import type { CreateEmailResponse } from 'resend'
import { siteConfig } from 'shared/config/site'
import type { ContactSubmission } from '../model/contact-form'
import {
  createContactEmail,
  sendContactEmail,
  type ContactEmailSender,
} from './contact-email'

/* eslint-disable unicorn/no-null -- Resend models successful responses with explicit null values. */

const submission: ContactSubmission = {
  name: '<Anna & Jan>',
  email: 'team@example.com',
  message: 'Potrzebujemy aplikacji.\nTermin: listopad.',
  locale: 'pl',
  company: '',
  requestId: 'cabf7b91-5a38-4d8f-9f5d-bb54dde4bf44',
  startedAt: 1000,
  turnstileToken: 'verified-token',
}

describe('contact email', () => {
  it('maps a submission to a safe Resend message', () => {
    const email = createContactEmail(submission)

    expect(email).toMatchObject({
      from: 'Portfolio <contact@sebastiansiejek.dev>',
      to: siteConfig.contactEmail,
      replyTo: 'team@example.com',
      subject: '[sebastiansiejek.dev] Nowe zgłoszenie od <Anna & Jan>',
    })
    expect(email.html).toContain('&lt;Anna &amp; Jan&gt;')
    expect(email.html).not.toContain('<Anna & Jan>')
    expect(email.text).toContain('Termin: listopad.')
  })

  it('uses a stable Resend idempotency key', async () => {
    const send = jest.fn<
      Promise<CreateEmailResponse>,
      Parameters<ContactEmailSender['send']>
    >()
    send.mockResolvedValue({
      data: { id: 'email-id' },
      error: null,
      headers: null,
    })

    await sendContactEmail('test-key', submission, { send })

    expect(send).toHaveBeenCalledWith(createContactEmail(submission), {
      idempotencyKey: `contact/${submission.requestId}`,
    })
  })
})

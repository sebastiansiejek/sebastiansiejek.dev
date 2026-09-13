import type {
  CreateEmailOptions,
  CreateEmailRequestOptions,
  CreateEmailResponse,
} from 'resend'
import { Resend } from 'resend'
import { siteConfig } from 'shared/config/site'
import type { ContactSubmission } from '../model/contact-form'

type ContactEmailData = Pick<
  ContactSubmission,
  'name' | 'email' | 'message' | 'locale'
>

export type ContactEmailSender = {
  send: (
    payload: CreateEmailOptions,
    options?: CreateEmailRequestOptions,
  ) => Promise<CreateEmailResponse>
}

function escapeHtml(value: string) {
  return value.replaceAll(/[&<>'"]/gu, (character) => {
    const entities: Record<string, string> = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;',
    }

    return entities[character]
  })
}

export function createContactEmail({
  name,
  email,
  message,
  locale,
}: ContactEmailData): CreateEmailOptions {
  const labels =
    locale === 'pl'
      ? { name: 'Imię', email: 'Kontakt zwrotny', message: 'Wiadomość' }
      : { name: 'Name', email: 'Reply email', message: 'Message' }
  const subject =
    locale === 'pl'
      ? `[sebastiansiejek.dev] Nowe zgłoszenie od ${name}`
      : `[sebastiansiejek.dev] New enquiry from ${name}`

  return {
    from: 'Portfolio <contact@sebastiansiejek.dev>',
    to: siteConfig.contactEmail,
    replyTo: email,
    subject,
    text: `${labels.name}: ${name}\n${labels.email}: ${email}\n\n${labels.message}:\n${message}`,
    html: `<p><strong>${labels.name}:</strong> ${escapeHtml(name)}</p><p><strong>${labels.email}:</strong> ${escapeHtml(email)}</p><p><strong>${labels.message}:</strong></p><p>${escapeHtml(message).replaceAll('\n', '<br>')}</p>`,
  }
}

export async function sendContactEmail(
  apiKey: string,
  submission: ContactSubmission,
  sender: ContactEmailSender = new Resend(apiKey).emails,
) {
  return sender.send(createContactEmail(submission), {
    idempotencyKey: `contact/${submission.requestId}`,
  })
}

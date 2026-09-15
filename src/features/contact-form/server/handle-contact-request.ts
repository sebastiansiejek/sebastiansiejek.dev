import * as Sentry from '@sentry/nextjs'
import { sendContactEmail } from './contact-email'
import { verifyTurnstile } from './turnstile'
import { validateContactSubmission } from '../model/contact-form'

const maximumRequestBodyLength = 12_000
const emailTimeoutMs = 8000

function getExpectedHostname(request: Request) {
  const forwardedHost = request.headers.get('x-forwarded-host')
  const host = forwardedHost?.split(',', 1)[0]?.trim() ?? request.headers.get('host')
  return host?.split(':', 1)[0]
}

function hasSameOrigin(request: Request) {
  const origin = request.headers.get('origin')
  const host = request.headers.get('x-forwarded-host') ?? request.headers.get('host')

  if (!origin || !host) return false

  try {
    return new URL(origin).host === host.split(',', 1)[0]?.trim()
  } catch {
    return false
  }
}

function getRemoteIp(request: Request) {
  return request.headers.get('x-forwarded-for')?.split(',', 1)[0]?.trim()
}

function reportError(code: string, requestId?: string, detail?: string) {
  Sentry.captureMessage('Contact form request failed', {
    level: 'error',
    tags: {
      contact_error_code: code,
      ...(detail ? { contact_error_detail: detail } : {}),
    },
    contexts: requestId ? { contact: { requestId } } : undefined,
  })
}

async function withTimeout<T>(promise: Promise<T>, timeoutMs: number) {
  let timeout: ReturnType<typeof setTimeout> | undefined

  try {
    return await Promise.race([
      promise,
      new Promise<never>((_, reject) => {
        timeout = setTimeout(() => reject(new Error('timeout')), timeoutMs)
      }),
    ])
  } finally {
    if (timeout) clearTimeout(timeout)
  }
}

export async function handleContactRequest(request: Request) {
  if (!hasSameOrigin(request)) {
    return Response.json({ error: 'forbidden' }, { status: 403 })
  }

  if (!request.headers.get('content-type')?.includes('application/json')) {
    return Response.json({ error: 'unsupported-media-type' }, { status: 415 })
  }

  const rawBody = await request.text()

  if (rawBody.length > maximumRequestBodyLength) {
    return Response.json({ error: 'payload-too-large' }, { status: 413 })
  }

  let input: unknown

  try {
    input = JSON.parse(rawBody)
  } catch {
    return Response.json({ error: 'invalid-request' }, { status: 400 })
  }

  const submission = validateContactSubmission(input)

  if (!submission.success) {
    if (submission.bot) {
      return Response.json({ accepted: true }, { status: 202 })
    }

    return Response.json(
      {
        error: submission.reason,
        ...(submission.fieldErrors
          ? { fieldErrors: submission.fieldErrors }
          : {}),
      },
      { status: 400 },
    )
  }

  const apiKey = process.env.RESEND_API_KEY
  const turnstileSecretKey = process.env.TURNSTILE_SECRET_KEY
  const expectedHostname = getExpectedHostname(request)

  if (!apiKey || !turnstileSecretKey || !expectedHostname) {
    reportError('missing-configuration', submission.data.requestId)
    return Response.json({ error: 'unavailable' }, { status: 503 })
  }

  let verified = false

  try {
    verified = await verifyTurnstile({
      expectedHostname,
      remoteIp: getRemoteIp(request),
      requestId: submission.data.requestId,
      secretKey: turnstileSecretKey,
      token: submission.data.turnstileToken,
    })
  } catch {
    reportError('turnstile-unavailable', submission.data.requestId)
    return Response.json({ error: 'unavailable' }, { status: 503 })
  }

  if (!verified) {
    return Response.json({ error: 'verification-failed' }, { status: 400 })
  }

  try {
    const result = await withTimeout(
      sendContactEmail(apiKey, submission.data),
      emailTimeoutMs,
    )

    if (result.error || !result.data?.id) {
      reportError(
        'resend-rejected',
        submission.data.requestId,
        result.error?.name,
      )
      return Response.json({ error: 'unavailable' }, { status: 503 })
    }

    return Response.json({ accepted: true })
  } catch (error) {
    reportError(
      error instanceof Error && error.message === 'timeout'
        ? 'resend-timeout'
        : 'resend-unavailable',
      submission.data.requestId,
    )
    return Response.json({ error: 'unavailable' }, { status: 503 })
  }
}

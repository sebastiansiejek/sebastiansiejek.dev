type TurnstileResponse = {
  success?: boolean
  action?: string
  hostname?: string
}

type VerifyTurnstileProperties = {
  expectedHostname: string
  remoteIp?: string
  requestId: string
  secretKey: string
  token: string
}

export async function verifyTurnstile({
  expectedHostname,
  remoteIp,
  requestId,
  secretKey,
  token,
}: VerifyTurnstileProperties) {
  const body = new URLSearchParams({
    secret: secretKey,
    response: token,
    idempotency_key: requestId,
  })

  if (remoteIp) body.set('remoteip', remoteIp)

  const response = await fetch(
    'https://challenges.cloudflare.com/turnstile/v0/siteverify',
    {
      method: 'POST',
      body,
      signal: AbortSignal.timeout(4000),
      cache: 'no-store',
    },
  )

  if (!response.ok) return false

  const result = (await response.json()) as TurnstileResponse

  return (
    result.success === true &&
    result.action === 'contact' &&
    result.hostname === expectedHostname
  )
}

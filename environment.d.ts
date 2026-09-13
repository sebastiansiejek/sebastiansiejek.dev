declare namespace NodeJS {
  interface ProcessEnv {
    SITE_URL: string
    NEXT_PUBLIC_SENTRY_DNS: string
    RESEND_API_KEY: string
    TURNSTILE_SITE_KEY: string
    TURNSTILE_SECRET_KEY: string
  }
}

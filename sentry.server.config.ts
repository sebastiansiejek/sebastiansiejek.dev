// This file configures the initialization of Sentry on the server.
// The config you add here will be used whenever the server handles a request.
// https://docs.sentry.io/platforms/javascript/guides/nextjs/

import * as Sentry from '@sentry/nextjs'
import { stripRequestBody } from './src/shared/lib/telemetry'

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DNS,
  integrations: [
    Sentry.httpIntegration({
      disableIncomingRequestSpans: true,
      maxIncomingRequestBodySize: 'none',
    }),
    Sentry.requestDataIntegration({ include: { data: false } }),
  ],
  beforeSend: stripRequestBody,
  beforeSendTransaction: stripRequestBody,

  // Define how likely traces are sampled. Adjust this value in production, or use tracesSampler for greater control.
  tracesSampleRate: 1,

  environment: process.env.NODE_ENV,

  // Setting this option to true will print useful information to the console while you're setting up Sentry.
  debug: process.env.NODE_ENV === 'development',
})

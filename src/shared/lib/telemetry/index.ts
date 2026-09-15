import type { Event } from '@sentry/nextjs'

export function stripRequestBody<T extends Event>(event: T): T {
  if (event.request) delete event.request.data

  return event
}

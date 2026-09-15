import { stripRequestBody } from './index'

describe('server telemetry privacy', () => {
  it('removes form contents while preserving diagnostic codes and request IDs', () => {
    const event = stripRequestBody({
      message: 'Contact form request failed',
      request: {
        url: 'https://example.com/api/contact',
        method: 'POST',
        data: {
          name: 'Private Visitor',
          email: 'private@example.com',
          message: 'Confidential enquiry content',
        },
      },
      tags: { contact_error_code: 'resend-rejected' },
      contexts: { contact: { requestId: 'diagnostic-request-id' } },
    })

    expect(JSON.stringify(event)).not.toMatch(
      /Private Visitor|private@example.com|Confidential enquiry content/,
    )
    expect(event.tags).toEqual({ contact_error_code: 'resend-rejected' })
    expect(event.contexts).toEqual({
      contact: { requestId: 'diagnostic-request-id' },
    })
    expect(event.request).toEqual({
      url: 'https://example.com/api/contact',
      method: 'POST',
    })
  })

  it('keeps events without an HTTP request intact', () => {
    const event = { message: 'Background task failed' }

    expect(stripRequestBody(event)).toEqual(event)
  })
})

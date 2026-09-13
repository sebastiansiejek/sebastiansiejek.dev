import { handleContactRequest } from 'features/contact-form/index.server'

export const runtime = 'nodejs'

export async function POST(request: Request) {
  return handleContactRequest(request)
}

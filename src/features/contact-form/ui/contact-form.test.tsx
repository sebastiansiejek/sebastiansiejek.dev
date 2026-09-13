import { act, fireEvent, render, screen, waitFor } from '@testing-library/react'
import { NextIntlClientProvider } from 'next-intl'
import { ContactForm } from './contact-form'

jest.mock('next-intl', () => ({
  NextIntlClientProvider: ({ children }: { children: React.ReactNode }) =>
    children,
  useTranslations: () => (key: string, values?: Record<string, number>) => {
    let message: unknown = mockMessages.Site.contact

    for (const part of key.split('.')) {
      if (!message || typeof message !== 'object') return key
      message = (message as Record<string, unknown>)[part]
    }

    if (typeof message !== 'string') return key
    let translatedMessage = message

    for (const [name, value] of Object.entries(values ?? {})) {
      translatedMessage = translatedMessage.replace(`{${name}}`, String(value))
    }

    return translatedMessage
  },
}))

jest.mock('./turnstile', () => ({
  Turnstile: ({ onVerify }: { onVerify: (token: string) => void }) => (
    <button type="button" onClick={() => onVerify('turnstile-token')}>
      Complete verification
    </button>
  ),
}))

const mockMessages = {
  Site: {
    contact: {
      name: 'Imię',
      email: 'E-mail zwrotny',
      message: 'Wiadomość',
      namePlaceholder: 'Imię',
      emailPlaceholder: 'email@example.com',
      messagePlaceholder: 'Wiadomość',
      submit: 'Wyślij wiadomość',
      sending: 'Wysyłanie…',
      helper: 'Wysyłając wiadomość, akceptujesz sposób przetwarzania danych.',
      privacy: 'Polityka prywatności.',
      direct: 'Możesz też napisać bezpośrednio:',
      success: {
        title: 'Dziękuję, wiadomość została przyjęta.',
        description: 'Odpowiem tak szybko, jak to możliwe.',
        another: 'Wyślij kolejną wiadomość',
      },
      error: {
        title: 'Nie udało się wysłać wiadomości.',
        description: 'Spróbuj ponownie lub napisz bezpośrednio:',
        verification: 'Nie udało się potwierdzić, że jesteś człowiekiem.',
      },
      validation: {
        required: 'To pole jest wymagane.',
        emailInvalid: 'Podaj poprawny adres e-mail.',
        nameTooShort: 'Imię musi mieć co najmniej {min} znaki.',
        nameTooLong: 'Imię może mieć maksymalnie {max} znaków.',
        emailTooLong: 'E-mail może mieć maksymalnie {max} znaki.',
        messageTooShort: 'Wiadomość musi mieć co najmniej {min} znaków.',
        messageTooLong: 'Wiadomość może mieć maksymalnie {max} znaków.',
      },
    },
  },
}

function renderForm() {
  return render(
    <NextIntlClientProvider locale="pl" messages={mockMessages}>
      <ContactForm locale="pl" turnstileSiteKey="site-key" />
    </NextIntlClientProvider>,
  )
}

function fillForm() {
  fireEvent.change(screen.getByLabelText('Imię'), {
    target: { value: 'Anna Kowalska' },
  })
  fireEvent.change(screen.getByLabelText('E-mail zwrotny'), {
    target: { value: 'anna@example.com' },
  })
  fireEvent.change(screen.getByLabelText('Wiadomość'), {
    target: { value: 'Chciałabym porozmawiać o nowej aplikacji.' },
  })
}

describe('ContactForm', () => {
  beforeEach(() => {
    Object.assign(globalThis, { fetch: jest.fn() })
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  it('shows pending and success states after the server accepts the message', async () => {
    let resolveRequest: ((response: Response) => void) | undefined
    const request = new Promise<Response>((resolve) => {
      resolveRequest = resolve
    })
    jest.mocked(globalThis.fetch).mockReturnValue(request)

    renderForm()
    fillForm()
    fireEvent.submit(
      screen.getByRole('button', { name: 'Wyślij wiadomość' }).closest('form')!,
    )

    expect(screen.getByRole('button', { name: 'Wysyłanie…' })).toBeDisabled()
    expect(globalThis.fetch).not.toHaveBeenCalled()

    fireEvent.click(screen.getByRole('button', { name: 'Complete verification' }))

    await act(async () => {
      resolveRequest?.({ ok: true } as Response)
      await request
    })

    expect(
      await screen.findByText('Dziękuję, wiadomość została przyjęta.'),
    ).toBeInTheDocument()
  })

  it('keeps the entered data when the server returns an error', async () => {
    jest.mocked(globalThis.fetch).mockResolvedValue({
      ok: false,
      json: async () => ({ error: 'unavailable' }),
    } as Response)

    renderForm()
    fillForm()
    fireEvent.submit(
      screen.getByRole('button', { name: 'Wyślij wiadomość' }).closest('form')!,
    )
    fireEvent.click(screen.getByRole('button', { name: 'Complete verification' }))

    expect(
      await screen.findByText('Nie udało się wysłać wiadomości.'),
    ).toBeInTheDocument()
    expect(screen.getByLabelText('Wiadomość')).toHaveValue(
      'Chciałabym porozmawiać o nowej aplikacji.',
    )
  })

  it('renders localized validation errors before calling the server', async () => {
    const fetch = jest.mocked(globalThis.fetch)

    renderForm()
    fireEvent.submit(
      screen.getByRole('button', { name: 'Wyślij wiadomość' }).closest('form')!,
    )

    await waitFor(() => {
      expect(screen.getAllByText('To pole jest wymagane.')).toHaveLength(3)
    })
    expect(fetch).not.toHaveBeenCalled()
  })
})

import { fireEvent, render, screen } from '@testing-library/react'
import { useTheme } from 'next-themes'
import {
  DesktopThemeSwitcher,
  MobileThemeSwitcher,
  type ThemeSwitcherLabels,
} from './theme-switcher'

jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}))

const labels: ThemeSwitcherLabels = {
  label: 'Motyw',
  system: 'Systemowy',
  light: 'Jasny',
  dark: 'Ciemny',
}

const setTheme = jest.fn()

describe('theme switcher', () => {
  beforeEach(() => {
    jest.mocked(useTheme).mockReturnValue({
      setTheme,
      theme: 'system',
      themes: ['light', 'dark'],
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('uses the selected preference in the desktop trigger label', () => {
    render(<DesktopThemeSwitcher labels={labels} />)

    expect(
      screen.getByRole('button', { name: 'Motyw: Systemowy' }),
    ).toBeInTheDocument()
  })

  it('changes the preference from the desktop menu', async () => {
    render(<DesktopThemeSwitcher labels={labels} />)

    const trigger = screen.getByRole('button', { name: 'Motyw: Systemowy' })

    fireEvent.click(trigger)
    fireEvent.click(await screen.findByRole('menuitemradio', { name: 'Jasny' }))

    expect(setTheme).toHaveBeenCalledWith('light')
    expect(trigger).toHaveAttribute('aria-expanded', 'false')
  })

  it('changes the preference from the mobile toggle group', () => {
    render(<MobileThemeSwitcher labels={labels} />)

    fireEvent.click(screen.getByRole('button', { name: 'Ciemny' }))

    expect(setTheme).toHaveBeenCalledWith('dark')
  })
})

import { render, screen } from '@testing-library/react'
import Link from 'next/link'
import { brandMark } from 'shared/config/brand'
import { BrandMark } from './brand-mark'

it('renders the shared silhouette without duplicating the link accessible name', () => {
  const { container } = render(
    <Link href="/pl" aria-label="Sebastian Siejek">
      <BrandMark className="size-7" />
    </Link>,
  )
  const mark = container.querySelector('svg')
  expect(screen.getByRole('link', { name: 'Sebastian Siejek' })).toBeInTheDocument()
  expect(mark).toHaveAttribute('viewBox', brandMark.viewBox)
  expect(mark).toHaveAttribute('aria-hidden', 'true')
  expect(mark).toHaveAttribute('focusable', 'false')
  expect(mark).toHaveAttribute('fill', 'currentColor')
  expect(mark?.querySelector('path')).toHaveAttribute('d', brandMark.path)
})

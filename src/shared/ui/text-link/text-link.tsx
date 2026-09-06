import { AnchorHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import Link from 'next/link'

export const TextLink = (
  properties: AnchorHTMLAttributes<HTMLAnchorElement> &
    Required<Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>>,
) => {
  const { className } = properties

  return (
    <Link
      className={twMerge(
        'text-accent underline transition-colors hover:text-accent-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className,
      )}
      {...properties}
    />
  )
}

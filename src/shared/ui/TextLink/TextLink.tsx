import { AnchorHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'
import Link from 'next/link'

export const TextLink = (
  props: AnchorHTMLAttributes<HTMLAnchorElement> &
    Required<Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>>,
) => {
  const { className } = props

  return (
    <Link
      className={twMerge(
        'text-primary underline hover:text-primary/80 transition',
        className,
      )}
      {...props}
    />
  )
}

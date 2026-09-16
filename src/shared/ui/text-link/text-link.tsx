import { AnchorHTMLAttributes } from 'react'
import Link from 'next/link'
import { cn } from 'shared/lib/utilities'

export const TextLink = (
  properties: AnchorHTMLAttributes<HTMLAnchorElement> &
    Required<Pick<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'>>,
) => {
  const { className } = properties

  return (
    <Link
      className={cn(
        'text-primary underline transition-colors hover:text-primary/80 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
        className,
      )}
      {...properties}
    />
  )
}

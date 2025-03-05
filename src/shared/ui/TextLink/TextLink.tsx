import { AnchorHTMLAttributes } from 'react'
import { twMerge } from 'tailwind-merge'

export const TextLink = (props: AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const { className } = props

  return (
    <a
      className={twMerge(
        'text-primary underline hover:text-primary/80 transition',
        className,
      )}
      {...props}
    />
  )
}

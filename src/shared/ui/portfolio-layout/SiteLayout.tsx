import { ComponentProps } from 'react'
import clsx from 'clsx'

export function SiteShell({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={clsx(
        'min-h-dvh bg-portfolio-bg font-sans text-base leading-[1.65] text-portfolio-text [color-scheme:dark]',
        className,
      )}
      {...props}
    />
  )
}

export function SiteContainer({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div className={clsx('container w-full mx-auto', className)} {...props} />
  )
}

import { ComponentProps } from 'react'
import clsx from 'clsx'

type SiteContainerProperties = ComponentProps<'div'> & {
  size?: 'wide' | 'medium' | 'tight'
}

export function SiteShell({ className, ...properties }: ComponentProps<'div'>) {
  return (
    <div
      className={clsx(
        'flex min-h-dvh flex-col bg-background font-sans text-base leading-relaxed text-foreground',
        className,
      )}
      {...properties}
    />
  )
}

export function SiteContainer({
  className,
  size = 'wide',
  ...properties
}: SiteContainerProperties) {
  return (
    <div
      className={clsx(
        'mx-auto w-full px-5 max-md:px-4',
        {
          'max-w-7xl': size === 'wide',
          'max-w-6xl': size === 'medium',
          'max-w-3xl': size === 'tight',
        },
        className,
      )}
      {...properties}
    />
  )
}

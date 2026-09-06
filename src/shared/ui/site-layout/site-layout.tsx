import { ComponentProps } from 'react'
import { cn } from 'shared/lib/utilities'

type SiteContainerProperties = ComponentProps<'div'> & {
  size?: 'wide' | 'medium' | 'tight'
}

export function SiteShell({ className, ...properties }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
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
      className={cn(
        'mx-auto w-full max-md:px-4',
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

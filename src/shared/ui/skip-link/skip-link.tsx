import { ComponentProps } from 'react'
import clsx from 'clsx'

export function SkipLink({ className, ...properties }: ComponentProps<'a'>) {
  return (
    <a
      className={clsx(
        'fixed top-3 left-3 z-50 -translate-y-20 rounded-lg bg-accent px-4 py-3 text-sm font-bold text-accent-foreground focus:translate-y-0',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className,
      )}
      {...properties}
    />
  )
}

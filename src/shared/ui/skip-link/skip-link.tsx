import { ComponentProps } from 'react'
import { cn } from 'shared/lib/utilities'

export function SkipLink({ className, ...properties }: ComponentProps<'a'>) {
  return (
    <a
      className={cn(
        'fixed top-3 left-3 z-50 -translate-y-20 rounded-lg bg-primary px-4 py-3 text-sm font-bold text-primary-foreground focus:translate-y-0',
        'focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50',
        className,
      )}
      {...properties}
    />
  )
}

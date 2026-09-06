import {
  ComponentPropsWithoutRef,
  ElementType,
  ReactElement,
} from 'react'
import clsx from 'clsx'

type MediaFrameProperties<Element extends ElementType> = {
  as?: Element
  interactive?: boolean
  tone?: 'surface' | 'accent'
} & Omit<ComponentPropsWithoutRef<Element>, 'as'>

export function MediaFrame<Element extends ElementType = 'div'>({
  as,
  className,
  interactive = false,
  tone = 'surface',
  ...properties
}: MediaFrameProperties<Element>): ReactElement {
  const Component = as ?? 'div'

  return (
    <Component
      className={clsx(
        'relative overflow-hidden rounded-xl after:pointer-events-none after:absolute after:inset-0 after:ring-1 after:ring-inset after:ring-foreground/10',
        tone === 'surface' && 'bg-surface',
        tone === 'accent' && 'accent-stripe text-accent',
        interactive &&
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
        className,
      )}
      {...properties}
    />
  )
}

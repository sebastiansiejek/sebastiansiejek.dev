import {
  ComponentProps,
  ComponentPropsWithoutRef,
  createElement,
  ElementType,
  ReactElement,
} from 'react'
import Link from 'next/link'
import clsx from 'clsx'

type ActionVariant = 'primary' | 'secondary'

type ActionRootProperties<Element extends ElementType> = {
  as: Element
  variant: ActionVariant
} & Omit<ComponentPropsWithoutRef<Element>, 'as'>

function ActionRoot<Element extends ElementType>({
  as: Component,
  className,
  variant,
  ...properties
}: ActionRootProperties<Element>): ReactElement {
  return createElement(Component, {
    ...properties,
    className: clsx(
      'group inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg border px-5 py-3 text-center text-sm leading-tight font-bold no-underline transition-colors duration-200 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background',
      variant === 'primary' &&
        'border-accent bg-accent text-accent-foreground hover:border-accent-hover hover:bg-accent-hover',
      variant === 'secondary' &&
        'border-border bg-transparent text-foreground hover:border-accent hover:bg-accent-muted',
      className,
    ),
  })
}

type ActionButtonProperties = ComponentProps<'button'> & {
  variant?: ActionVariant
}

export function ActionButton({
  className,
  variant = 'primary',
  ...properties
}: ActionButtonProperties) {
  return (
    <ActionRoot
      as="button"
      className={className}
      variant={variant}
      {...properties}
    />
  )
}

type ActionLinkProperties = Omit<ComponentProps<typeof Link>, 'as'> & {
  variant?: ActionVariant
}

export function ActionLink({
  className,
  variant = 'primary',
  ...properties
}: ActionLinkProperties) {
  return (
    <ActionRoot
      as={Link}
      className={className}
      variant={variant}
      {...properties}
    />
  )
}

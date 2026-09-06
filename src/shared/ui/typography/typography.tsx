import { ComponentProps } from 'react'
import clsx from 'clsx'

export function SectionTitle({
  className,
  ...properties
}: ComponentProps<'h2'>) {
  return (
    <h2
      className={clsx(
        'm-0 text-4xl leading-none font-semibold tracking-tighter text-foreground text-balance md:text-5xl lg:text-6xl',
        className,
      )}
      {...properties}
    />
  )
}

export function SubsectionTitle({
  className,
  ...properties
}: ComponentProps<'h2'>) {
  return (
    <h2
      className={clsx(
        'm-0 text-3xl font-semibold tracking-tighter text-foreground md:text-4xl',
        className,
      )}
      {...properties}
    />
  )
}

export function CardTitle({
  className,
  ...properties
}: ComponentProps<'h3'>) {
  return (
    <h3
      className={clsx(
        'm-0 text-2xl font-semibold tracking-tight text-foreground md:text-3xl',
        className,
      )}
      {...properties}
    />
  )
}

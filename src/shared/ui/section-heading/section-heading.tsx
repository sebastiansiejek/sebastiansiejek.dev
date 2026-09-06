import { ReactNode } from 'react'
import clsx from 'clsx'
import { SectionTitle } from 'shared/ui/typography'

type SectionLabelProperties = {
  children: ReactNode
  className?: string
}

export function SectionLabel({ children, className }: SectionLabelProperties) {
  return (
    <p
      className={clsx(
        'mb-5 font-mono text-xs font-medium uppercase tracking-widest text-accent',
        className,
      )}
    >
      {children}
    </p>
  )
}

type SectionHeadingProperties = {
  title: ReactNode
  intro?: ReactNode
  eyebrow?: ReactNode
  className?: string
}

export function SectionHeading({
  title,
  intro,
  eyebrow,
  className,
}: SectionHeadingProperties) {
  return (
    <div
      className={clsx(
        'mb-10 max-w-3xl md:mb-16 lg:mb-20',
        className,
      )}
    >
      {eyebrow ? <SectionLabel>{eyebrow}</SectionLabel> : undefined}
      <SectionTitle>{title}</SectionTitle>
      {intro ? (
        <p className="mt-5 max-w-prose text-lg text-muted">{intro}</p>
      ) : undefined}
    </div>
  )
}

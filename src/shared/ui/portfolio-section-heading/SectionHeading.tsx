import { ReactNode } from 'react'
import clsx from 'clsx'

type SectionLabelProps = {
  children: ReactNode
  className?: string
}

export function SectionLabel({ children, className }: SectionLabelProps) {
  return (
    <p
      className={clsx(
        'mb-5 font-mono text-xs font-medium uppercase tracking-[0.14em] text-portfolio-accent',
        className,
      )}
    >
      {children}
    </p>
  )
}

type SectionHeadingProps = {
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
}: SectionHeadingProps) {
  return (
    <div
      className={clsx(
        'mb-[clamp(2.5rem,6vw,5rem)] max-w-[760px] max-md:mb-10',
        className,
      )}
    >
      {eyebrow ? <SectionLabel>{eyebrow}</SectionLabel> : null}
      <h2 className="m-0 text-[clamp(2.25rem,4.4vw,4rem)] leading-[1.06] font-[650] tracking-[-0.05em] text-portfolio-text text-balance">
        {title}
      </h2>
      {intro ? (
        <p className="mt-5 max-w-[64ch] text-[1.06rem] text-portfolio-muted">
          {intro}
        </p>
      ) : null}
    </div>
  )
}

import { ComponentProps } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

type ActionVariant = 'primary' | 'secondary'

const variants: Record<ActionVariant, string> = {
  primary:
    'bg-portfolio-accent text-portfolio-accent-contrast hover:bg-portfolio-accent-hover',
  secondary:
    'border-portfolio-line bg-transparent text-portfolio-text border border-solid hover:border-portfolio-accent hover:bg-portfolio-accent-dark',
}

const buttonClassName =
  'group inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg border px-[1.1rem] py-3 text-center text-[0.9rem] leading-[1.2] font-[750] no-underline transition-[background-color,border-color] duration-[180ms] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-accent focus-visible:ring-offset-2 focus-visible:ring-offset-portfolio-bg'

type ActionButtonProps = ComponentProps<'button'> & {
  variant?: ActionVariant
}

export function ActionButton({
  className,
  variant = 'primary',
  ...props
}: ActionButtonProps) {
  return (
    <button
      className={clsx(buttonClassName, variants[variant], className)}
      {...props}
    />
  )
}

type ActionLinkProps = ComponentProps<typeof Link> & {
  variant?: ActionVariant
}

export function ActionLink({
  className,
  variant = 'primary',
  ...props
}: ActionLinkProps) {
  return (
    <Link
      className={clsx(buttonClassName, variants[variant], className)}
      {...props}
    />
  )
}

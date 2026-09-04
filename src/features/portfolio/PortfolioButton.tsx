import { ComponentProps } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

type PortfolioButtonVariant = 'primary' | 'secondary'

const variants: Record<PortfolioButtonVariant, string> = {
  primary: 'bg-portfolio-accent text-[#101713] hover:bg-[#90e4c7]',
  secondary:
    'border-portfolio-line bg-transparent text-portfolio-text hover:border-portfolio-accent hover:bg-portfolio-accent-dark',
}

const buttonClassName =
  'inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 whitespace-nowrap rounded-lg border border-transparent px-[1.1rem] py-3 text-center text-[0.9rem] leading-[1.2] font-[750] no-underline transition-[transform,background-color,border-color] duration-[180ms] hover:-translate-y-0.5 active:translate-y-px focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-accent focus-visible:ring-offset-2 focus-visible:ring-offset-portfolio-bg'

type PortfolioButtonProps = ComponentProps<'button'> & {
  variant?: PortfolioButtonVariant
}

export function PortfolioButton({
  className,
  variant = 'primary',
  ...props
}: PortfolioButtonProps) {
  return (
    <button
      className={clsx(buttonClassName, variants[variant], className)}
      {...props}
    />
  )
}

type PortfolioButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: PortfolioButtonVariant
}

export function PortfolioButtonLink({
  className,
  variant = 'primary',
  ...props
}: PortfolioButtonLinkProps) {
  return (
    <Link
      className={clsx(buttonClassName, variants[variant], className)}
      {...props}
    />
  )
}

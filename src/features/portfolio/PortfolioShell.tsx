import { ComponentProps } from 'react'
import clsx from 'clsx'

export function PortfolioShell({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={clsx(
        'portfolio min-h-dvh bg-portfolio-bg font-sans text-base leading-[1.65] text-portfolio-text [color-scheme:dark]',
        className,
      )}
      {...props}
    />
  )
}

export function PortfolioContainer({
  className,
  ...props
}: ComponentProps<'div'>) {
  return (
    <div
      className={clsx(
        'mx-auto w-full max-w-[1280px] px-5 max-md:px-4',
        className,
      )}
      {...props}
    />
  )
}

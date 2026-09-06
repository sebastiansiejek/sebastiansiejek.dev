import { ComponentProps } from 'react'
import clsx from 'clsx'

type SiteContainerProps = ComponentProps<'div'> & {
  size?: 'wide' | 'medium' | 'tight'
}

export function SiteShell({ className, ...props }: ComponentProps<'div'>) {
  return (
    <div
      className={clsx(
        'min-h-dvh bg-portfolio-bg font-sans text-base leading-[1.65] text-portfolio-text [color-scheme:dark]',
        className,
      )}
      {...props}
    />
  )
}

export function SiteContainer({
  className,
  size = 'wide',
  ...props
}: SiteContainerProps) {
  return (
    <div
      className={clsx(
        'mx-auto w-full px-5 max-md:px-4',
        {
          'max-w-[1280px]': size === 'wide',
          'max-w-[1168px]': size === 'medium',
          'max-w-(--breakpoint-md)': size === 'tight',
        },
        className,
      )}
      {...props}
    />
  )
}

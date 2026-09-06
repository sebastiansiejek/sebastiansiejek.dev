import { ComponentProps, ReactNode } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

type ArrowLinkProps = Omit<ComponentProps<typeof Link>, 'children'> & {
  children: ReactNode
  direction?: 'right' | 'external'
}

export function ArrowLink({
  children,
  className,
  direction = 'right',
  ...props
}: ArrowLinkProps) {
  return (
    <Link
      className={clsx(
        'group mt-4 inline-flex items-center gap-2 font-bold text-portfolio-text underline decoration-portfolio-accent decoration-1 underline-offset-[0.35rem] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-portfolio-accent focus-visible:ring-offset-2 focus-visible:ring-offset-portfolio-bg',
        className,
      )}
      {...props}
    >
      {children}
      <span
        className="text-portfolio-accent transition-transform group-hover:translate-x-[0.2rem]"
        aria-hidden="true"
      >
        {direction === 'external' ? '↗' : '→'}
      </span>
    </Link>
  )
}

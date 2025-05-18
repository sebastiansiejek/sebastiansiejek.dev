import React, { FC, HTMLAttributes } from 'react'
import { cn } from '@/shared/lib/utils'

const H1: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
  ...properties
}) => {
  return (
    <h1
      className={cn(
        'scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl',
        className,
      )}
      {...properties}
    >
      {children}
    </h1>
  )
}

const H2: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
  ...properties
}) => {
  return (
    <h2
      className={cn(
        'scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0',
        className,
      )}
      {...properties}
    >
      {children}
    </h2>
  )
}

const H3: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
  ...properties
}) => {
  return (
    <h3
      className={cn(
        'scroll-m-20 text-2xl font-semibold tracking-tight',
        className,
      )}
      {...properties}
    >
      {children}
    </h3>
  )
}

const H4: FC<HTMLAttributes<HTMLHeadingElement>> = ({
  className,
  children,
  ...properties
}) => {
  return (
    <h4
      className={cn(
        'scroll-m-20 text-xl font-semibold tracking-tight',
        className,
      )}
      {...properties}
    >
      {children}
    </h4>
  )
}

const P: FC<HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  children,
  ...properties
}) => {
  return (
    <p
      className={cn('leading-7 [&:not(:first-child)]:mt-6', className)}
      {...properties}
    >
      {children}
    </p>
  )
}

const Blockquote: FC<HTMLAttributes<HTMLQuoteElement>> = ({
  className,
  children,
  ...properties
}) => {
  return (
    <blockquote
      className={cn('mt-6 border-l-2 pl-6 italic', className)}
      {...properties}
    >
      {children}
    </blockquote>
  )
}

const InlineCode: FC<HTMLAttributes<HTMLElement>> = ({
  className,
  children,
  ...properties
}) => {
  return (
    <code
      className={cn(
        'relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold',
        className,
      )}
      {...properties}
    >
      {children}
    </code>
  )
}

const Lead: FC<HTMLAttributes<HTMLParagraphElement>> = ({
  className,
  children,
  ...properties
}) => {
  return (
    <p
      className={cn('text-xl text-muted-foreground', className)}
      {...properties}
    >
      {children}
    </p>
  )
}

const Large: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...properties
}) => {
  return (
    <div className={cn('text-lg font-semibold', className)} {...properties}>
      {children}
    </div>
  )
}

const Muted: FC<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...properties
}) => {
  return (
    <p
      className={cn('text-sm text-muted-foreground', className)}
      {...properties}
    >
      {children}.
    </p>
  )
}

export { Blockquote, H1, H2, H3, H4, InlineCode, Large, Lead, Muted, P }

import { ComponentProps } from 'react'
import Link from 'next/link'
import { ArrowRightIcon, ArrowUpRightIcon } from 'lucide-react'
import { buttonVariants } from 'shared/ui/button'
import { cn } from 'shared/lib/utilities'

type ArrowLinkProperties = ComponentProps<typeof Link> & {
  direction?: 'right' | 'external'
  variant?: 'default' | 'outline'
}

export function ArrowLink({
  children,
  className,
  direction = 'right',
  variant = 'outline',
  ...properties
}: ArrowLinkProperties) {
  const Icon = direction === 'external' ? ArrowUpRightIcon : ArrowRightIcon

  return (
    <Link
      className={cn(buttonVariants({ size: 'lg', variant }), className)}
      {...properties}
    >
      {children}
      <Icon aria-hidden="true" data-icon="inline-end" />
    </Link>
  )
}

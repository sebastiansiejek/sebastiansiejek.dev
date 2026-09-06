import { ComponentProps } from 'react'
import { RiArrowRightUpLongLine, RiArrowRightLongLine } from 'react-icons/ri'
import { ActionLink } from 'shared/ui/portfolio-button'

type ArrowLinkProps = ComponentProps<typeof ActionLink> & {
  direction?: 'right' | 'external'
}

export function ArrowLink({
  children,
  direction = 'right',
  ...props
}: ArrowLinkProps) {
  return (
    <ActionLink variant={'secondary'} {...props}>
      {children}
      <span
        className="transition-transform group-hover:translate-x-[0.2rem]"
        aria-hidden="true"
      >
        {direction === 'external' ? (
          <RiArrowRightUpLongLine />
        ) : (
          <RiArrowRightLongLine />
        )}
      </span>
    </ActionLink>
  )
}

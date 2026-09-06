import { ComponentProps } from 'react'
import { RiArrowRightUpLongLine, RiArrowRightLongLine } from 'react-icons/ri'
import { ActionLink } from 'shared/ui/action'

type ArrowLinkProperties = ComponentProps<typeof ActionLink> & {
  direction?: 'right' | 'external'
}

export function ArrowLink({
  children,
  direction = 'right',
  ...properties
}: ArrowLinkProperties) {
  return (
    <ActionLink variant="secondary" {...properties}>
      {children}
      <span
        className="transition-transform group-hover:translate-x-1"
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

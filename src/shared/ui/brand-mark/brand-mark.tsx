import type { ComponentProps } from 'react'
import { brandMark } from 'shared/config/brand'

export function BrandMark(properties: ComponentProps<'svg'>) {
  return (
    <svg
      viewBox={brandMark.viewBox}
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...properties}
    >
      <path d={brandMark.path} />
    </svg>
  )
}

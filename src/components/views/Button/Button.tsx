import { ReactNode } from 'react'
import ButtonOutline from './ButtonOutline'

export interface IButton {
  title: ReactNode
  isActive?: boolean
  variant?: 'outline'
  isFullWidth?: boolean
}

const Button = ({
  title,
  isActive,
  variant = 'outline',
  isFullWidth = false,
}: IButton) => {
  if (variant === 'outline')
    return (
      <ButtonOutline
        title={title}
        isActive={isActive}
        isFullWidth={isFullWidth}
      />
    )

  return null
}

export default Button

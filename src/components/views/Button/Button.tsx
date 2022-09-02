import { ReactNode } from 'react'
import ButtonOutline from './ButtonOutline'

export interface IButton {
  title: ReactNode
  isActive?: boolean
  variant?: 'outline'
}

const Button = ({ title, isActive, variant = 'outline' }: IButton) => {
  if (variant === 'outline')
    return <ButtonOutline title={title} isActive={isActive} />

  return null
}

export default Button

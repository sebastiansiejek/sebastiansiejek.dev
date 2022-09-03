import { ButtonHTMLAttributes } from 'react'
import ButtonOutline from './ButtonOutline'

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
  variant?: 'outline'
  isFullWidth?: boolean
}

const Button = ({ variant, ...props }: IButton) => {
  if (variant === 'outline') return <ButtonOutline {...props} />

  return null
}

export default Button

import { ButtonHTMLAttributes } from 'react'
import ButtonOutline from 'shared/ui/Button/ButtonOutline/ButtonOutline'
import ButtonLink from 'shared/ui/Button/ButtonLink/ButtonLink'

export interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  isActive?: boolean
  variant?: 'outline' | 'link'
  isFullWidth?: boolean
  isLoading?: boolean
}

const Button = ({ variant, ...props }: IButton) => {
  if (variant === 'outline') return <ButtonOutline {...props} />
  if (variant === 'link') return <ButtonLink {...props} />

  return null
}

export default Button

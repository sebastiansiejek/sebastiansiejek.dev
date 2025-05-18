import { IButton } from '../Button'

interface IButtonLink extends Omit<IButton, 'variant'> {}

const ButtonLink = ({ children, title }: IButtonLink) => {
  return (
    <button className={'transition-colors cursor-pointer'}>
      {children || title}
    </button>
  )
}

export default ButtonLink

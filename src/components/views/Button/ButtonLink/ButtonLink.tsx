import { IButton } from '../Button'

interface IButtonLink extends Omit<IButton, 'variant'> {}

const ButtonLink = ({ children, title }: IButtonLink) => {
  return (
    <button className={'transition-colors hover:text-n-0'}>
      {children || title}
    </button>
  )
}

export default ButtonLink

import { IButton } from '../Button'

type IButtonLink = Omit<IButton, 'variant'>

const ButtonLink = ({ children, title }: IButtonLink) => {
  return (
    <button className={'transition-colors hover:text-n-0 cursor-pointer'}>
      {children || title}
    </button>
  )
}

export default ButtonLink

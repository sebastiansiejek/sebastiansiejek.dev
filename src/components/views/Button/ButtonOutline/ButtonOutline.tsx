import clsx from 'clsx'
import { IButton } from '../Button'

interface IButtonOutline extends Omit<IButton, 'variant'> {}

const ButtonOutline = ({ title, isActive, isFullWidth }: IButtonOutline) => {
  return (
    <button
      className={clsx(
        'transition-colors cursor-pointer relative border-2 group px-4 py-2 overflow-hidden hover:border-n-0',
        {
          'border-n-0': isActive,
          'w-full': isFullWidth,
        },
      )}
    >
      <div
        className={
          'text-center transition-all relative z-10 group-hover:opacity-0 group-hover:-translate-y-full'
        }
      >
        {title}
      </div>
      <div
        className={
          'text-center transition-transform z-10 absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 w-full h-full flex items-center justify-center group-hover:-translate-y-1/2'
        }
      >
        {title}
      </div>
    </button>
  )
}

export default ButtonOutline

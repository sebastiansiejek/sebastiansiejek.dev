import clsx from 'clsx'
import { IButton } from '../Button'
import { ClipLoader } from 'react-spinners'

interface IButtonOutline extends Omit<IButton, 'variant'> {}

const ButtonOutline = ({
  isActive,
  isFullWidth,
  title,
  children,
  isLoading,
  ...props
}: IButtonOutline) => {
  return (
    <button
      className={clsx(
        'transition-colors flex justify-center items-center cursor-pointer relative border-2 group px-4 py-2 overflow-hidden',
        {
          'border-n-0': isActive,
          'w-full': isFullWidth,
          'pointer-events-none': isLoading,
        },
      )}
      {...props}
    >
      <div
        className={
          'text-center transition-all relative z-10 group-hover:opacity-0 group-hover:-translate-y-full'
        }
      >
        {children || title}
      </div>
      <div
        className={
          'text-center transition-transform z-10 absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2 w-full h-full flex items-center justify-center group-hover:-translate-y-1/2'
        }
      >
        {children || title}
      </div>
      {isLoading && (
        <ClipLoader color={'#3ceab8'} className={'ml-4'} size={24} />
      )}
    </button>
  )
}

export default ButtonOutline

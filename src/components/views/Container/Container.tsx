import { FC, ReactNode } from 'react'
import clsx from 'clsx'

const Container: FC<{
  children: ReactNode
  className?: string
  size?: 'tight' | 'medium'
}> = ({ children, className, size = 'medium' }) => {
  return (
    <div
      className={clsx('mx-auto px-8 xl:px-0 w-full', {
        [className || '']: className,
        'max-w-[1168px]': size === 'medium',
        'max-w-screen-md': size === 'tight',
      })}
    >
      {children}
    </div>
  )
}

export default Container

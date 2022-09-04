import { FC, ReactNode } from 'react'
import clsx from 'clsx'

const Container: FC<{
  children: ReactNode
  className?: string
}> = ({ children, className }) => {
  return (
    <div
      className={clsx('max-w-[1168px] mx-auto px-8 xl:px-0 w-full', {
        [className || '']: className,
      })}
    >
      {children}
    </div>
  )
}

export default Container

import { FC, ReactNode } from 'react'

const Container: FC<{
  children: ReactNode
}> = ({ children }) => {
  return (
    <div className={'max-w-screen-xl mx-auto px-8 xl:px-0'}>{children}</div>
  )
}

export default Container

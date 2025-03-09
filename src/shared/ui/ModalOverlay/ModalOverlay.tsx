import clsx from 'clsx'

interface IOverlay {
  isOpen?: boolean
  toggle?: () => void
}

const ModalOverlay = ({ toggle, isOpen }: IOverlay) => {
  return (
    <div
      className={clsx(
        'transition-all fixed h-full w-full bg-n/50 left-0 top-0 cursor-pointer',
        {
          'opacity-100 visible': isOpen,
          'opacity-0 invisible': !isOpen,
        },
      )}
      onClick={() => {
        if (toggle) {
          toggle()
        }
      }}
    />
  )
}

export default ModalOverlay

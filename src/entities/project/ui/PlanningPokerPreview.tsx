import { PropsWithChildren } from 'react'

function PlanningPokerPreview({ children }: PropsWithChildren) {
  return (
    <span className="flex w-20 justify-center rounded border border-current p-6 text-[clamp(1.3rem,4vw,3rem)]">
      {children}
    </span>
  )
}

export { PlanningPokerPreview }

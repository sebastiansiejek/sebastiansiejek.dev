import { PropsWithChildren } from 'react'

function PlanningPokerCard({ children }: PropsWithChildren) {
  return (
    <span className="text-[clamp(1.3rem,4vw,3rem)] border rounded p-6 w-20 flex justify-center">
      {children}
    </span>
  )
}

export { PlanningPokerCard }

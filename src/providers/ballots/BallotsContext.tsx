import { createContext } from 'react'

import { BetsType, BetType, WishesType } from './types'

export interface BallotsContextType {
  vote: (categoryId: string, bets: BetType, wishes: WishesType) => void
  bets: BetsType
  wishes: WishesType
  points: number
}

const BallotsContext = createContext<BallotsContextType | null>(null)
BallotsContext.displayName = 'BallotsContext'

export default BallotsContext

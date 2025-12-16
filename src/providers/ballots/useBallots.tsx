import { useContext } from 'react'

import BallotsContext, { type BallotsContextType } from './BallotsContext'

const useBallots = (): BallotsContextType => {
  const useBallotsContext = useContext(BallotsContext)

  if (useBallotsContext === null) {
    throw new Error('useBallots has to be used within <BallotsContext.Provider>')
  }
  return useBallotsContext
}

export default useBallots

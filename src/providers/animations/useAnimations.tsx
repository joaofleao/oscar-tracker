import { useContext } from 'react'

import AnimationsContext from './context'
import { type AnimationsContextType } from './types'

const useAnimations = (): AnimationsContextType => {
  const useAnimationsContext = useContext(AnimationsContext)

  if (useAnimationsContext === null) {
    throw new Error('useAnimations has to be used within <AnimationsContext.Provider>')
  }
  return useAnimationsContext
}

export default useAnimations

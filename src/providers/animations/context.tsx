import { createContext } from 'react'

import type { AnimationsContextType } from './types'

const AnimationsContext = createContext<AnimationsContextType | null>(null)
AnimationsContext.displayName = 'AnimationsContext'
export default AnimationsContext

import { createContext } from 'react'

import type { EditionContextType } from './types'

const EditionContext = createContext<EditionContextType | null>(null)
EditionContext.displayName = 'EditionContext'
export default EditionContext

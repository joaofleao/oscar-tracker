import { createContext } from 'react'

import type { StringsContextType } from './types'

const StringsContext = createContext<StringsContextType | null>(null)
StringsContext.displayName = 'StringsContext'
export default StringsContext

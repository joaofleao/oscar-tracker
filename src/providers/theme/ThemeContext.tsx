import { createContext } from 'react'

import type { ModeType, ThemeType } from '@types'

export interface ThemeContextType extends ThemeType {
  mode: ModeType
  setMode: (mode: ModeType) => void
}

const ThemeContext = createContext<ThemeContextType | null>(null)
ThemeContext.displayName = 'ThemeContext'

export default ThemeContext

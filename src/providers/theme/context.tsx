import { createContext } from 'react'

import type { ThemeType } from './types'

const ThemeContext = createContext<ThemeType | null>(null)
ThemeContext.displayName = 'ThemeContext'

export default ThemeContext

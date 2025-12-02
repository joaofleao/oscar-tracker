import { useContext } from 'react'

import ThemeContext from './context'
import { type ThemeType } from './types'

const useTheme = (): ThemeType => {
  const useThemeContext = useContext(ThemeContext)

  if (useThemeContext === null) {
    throw new Error('useTheme has to be used within <ThemeContext.Provider>')
  }
  return useThemeContext
}

export default useTheme

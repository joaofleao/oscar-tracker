import { useContext } from 'react'

import ThemeContext, { type ThemeContextType } from './ThemeContext'

const useTheme = (): ThemeContextType => {
  const useThemeContext = useContext(ThemeContext)

  if (useThemeContext === null) {
    throw new Error('useTheme has to be used within <ThemeContext.Provider>')
  }
  return useThemeContext
}

export default useTheme

import React from 'react'

import ThemeContext from './context'
import { fonts } from './fonts'
import { layer } from './layer'
import { primitives } from './primitives'
import { semantics } from './semantics'
import type { ThemeType } from './types'

const ThemeProvider = ({ children }: { children?: React.ReactNode }): React.ReactElement => {
  const theme: ThemeType = {
    semantics,
    primitives,
    fonts,
    layer,
  }

  const value = {
    ...theme,
  } satisfies ThemeType

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export default ThemeProvider

import { createContext } from 'react'

import type { SettingsContextType } from './types'

const SettingsContext = createContext<SettingsContextType | null>(null)
SettingsContext.displayName = 'SettingsContext'
export default SettingsContext

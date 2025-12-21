import React from 'react'
import * as SecureStore from 'expo-secure-store'

import SettingsContext from './context'
import { type SettingsContextType } from './types'

const SettingsProvider = ({ children }: { children?: React.ReactNode }): React.ReactElement => {
  const [spoilers, setSpoilersValue] = React.useState<SettingsContextType['spoilers']>({
    hideCast: false,
    hidePlot: false,
    hidePoster: false,
    hideRate: false,
  })

  const loadSpoilers = async (): Promise<void> => {
    const hideCast = await SecureStore.getItem('spoilerhideCast')
    const hidePlot = await SecureStore.getItem('spoilerhidePlot')
    const hidePoster = await SecureStore.getItem('spoilerhidePoster')
    const hideRate = await SecureStore.getItem('spoilerhideRate')

    setSpoilersValue({
      hideCast: hideCast === 'true',
      hidePlot: hidePlot === 'true',
      hidePoster: hidePoster === 'true',
      hideRate: hideRate === 'true',
    })
  }

  React.useEffect(() => {
    loadSpoilers()
  }, [])

  const setSpoilers: SettingsContextType['setSpoilers'] = (name, value): void => {
    setSpoilersValue((prev) => ({
      ...prev,
      [name]: value,
    }))

    SecureStore.setItem(`spoiler${name}`, value.toString())
  }

  return (
    <SettingsContext.Provider
      value={{
        spoilers,
        setSpoilers,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export default SettingsProvider

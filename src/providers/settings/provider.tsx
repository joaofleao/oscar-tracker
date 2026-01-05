import React, { useEffect, useMemo } from 'react'
import { useMutation, useQuery } from 'convex/react'
import { api } from 'convex_api'
import * as SecureStore from 'expo-secure-store'
import { useTranslation } from 'react-i18next'

import SettingsContext from './context'
import { type SettingsContextType } from './types'

const SettingsProvider = ({ children }: { children?: React.ReactNode }): React.ReactElement => {
  const { i18n } = useTranslation()
  const [currentEdition, setCurrentEditionState] = React.useState<SettingsContextType['currentEdition']>(undefined)
  const [hideCast, sethideCast] = React.useState(false)
  const [hidePlot, sethidePlot] = React.useState(false)
  const [hidePoster, sethidePoster] = React.useState(false)
  const [hideRate, sethideRate] = React.useState(false)

  const [language, setLanguageState] = React.useState<string>('pt_BR')

  const queryEditions = useQuery(api.oscars.getOscarEditions)
  const editions = useMemo(() => queryEditions || [], [queryEditions])

  const currentUser = useQuery(api.user.getCurrentUser)
  const updateUser = useMutation(api.user.updateUser)

  const hydrateSettings = React.useCallback(
    async (user: typeof currentUser): Promise<void> => {
      const spoilerKeys = ['hideCast', 'hidePlot', 'hidePoster', 'hideRate'] as const

      const apiSpoilers = {
        hideCast: user?.hideCast ?? false,
        hidePlot: user?.hidePlot ?? false,
        hidePoster: user?.hidePoster ?? false,
        hideRate: user?.hideRate ?? false,
      }

      const secureStoreSpoilers: SettingsContextType['spoilers'] = {
        hideCast: apiSpoilers.hideCast,
        hidePlot: apiSpoilers.hidePlot,
        hidePoster: apiSpoilers.hidePoster,
        hideRate: apiSpoilers.hideRate,
      }

      if (!user) {
        for (const key of spoilerKeys) {
          const storedValue = await SecureStore.getItemAsync(key)
          if (storedValue !== null) {
            secureStoreSpoilers[key] = storedValue === 'true'
          }
        }
      }

      sethideCast(secureStoreSpoilers.hideCast)
      sethidePlot(secureStoreSpoilers.hidePlot)
      sethidePoster(secureStoreSpoilers.hidePoster)
      sethideRate(secureStoreSpoilers.hideRate)

      for (const key of spoilerKeys) {
        SecureStore.setItemAsync(key, secureStoreSpoilers[key].toString())
      }

      // Hydrate language from all sources
      const apiLanguage = user?.language
      let finalLanguage = apiLanguage || 'pt_BR'

      if (!apiLanguage) {
        const storedLanguage = await SecureStore.getItemAsync('language')
        if (storedLanguage) {
          finalLanguage = storedLanguage
        }
      }

      setLanguageState(finalLanguage)
      SecureStore.setItemAsync('language', finalLanguage)
      if (finalLanguage !== i18n.language) {
        i18n.changeLanguage(finalLanguage)
      }
    },
    [i18n],
  )

  const setCurrentEdition = (editionId: SettingsContextType['currentEdition']): void => {
    if (!editionId) return

    SecureStore.setItemAsync('currentEdition', editionId)
    setCurrentEditionState(editionId)
  }

  useEffect(() => {
    void hydrateSettings(currentUser)
  }, [currentUser, hydrateSettings])

  useEffect(() => {
    const hydrateEdition = async (): Promise<void> => {
      const storedEdition = await SecureStore.getItemAsync('currentEdition')
      if (storedEdition) {
        setCurrentEditionState(storedEdition as SettingsContextType['currentEdition'])
      } else if (editions.length > 0) {
        setCurrentEditionState(editions.find((el) => el.complete)?._id ?? editions[0]._id)
        SecureStore.setItemAsync('currentEdition', editions[0]._id)
      }
    }
    void hydrateEdition()
  }, [editions])

  const setSpoilers: SettingsContextType['setSpoilers'] = (name, value): void => {
    switch (name) {
      case 'hideCast':
        sethideCast(value)
        break
      case 'hidePlot':
        sethidePlot(value)
        break
      case 'hidePoster':
        sethidePoster(value)
        break
      case 'hideRate':
        sethideRate(value)
        break
    }

    SecureStore.setItemAsync(name, value.toString())
    updateUser({ [name]: value })
  }

  const setLanguage = (newLanguage: string): void => {
    setLanguageState(newLanguage)
    i18n.changeLanguage(newLanguage)
    SecureStore.setItemAsync('language', newLanguage)
    updateUser({ language: newLanguage })
  }

  return (
    <SettingsContext.Provider
      value={{
        spoilers: {
          hideCast,
          hidePlot,
          hidePoster,
          hideRate,
        },
        setSpoilers,
        editions,
        currentEdition,
        setCurrentEdition,
        language,
        setLanguage,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export default SettingsProvider

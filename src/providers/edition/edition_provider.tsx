import React, { useEffect, useMemo } from 'react'
import { useQuery } from 'convex/react'
import { api } from 'convex_api'
import { getItemAsync, setItemAsync } from 'expo-secure-store'

import EditionContext, { type EditionContextType } from './edition_context'

const EditionProvider = ({ children }: { children?: React.ReactNode }): React.ReactElement => {
  const queryEditions = useQuery(api.oscars.getOscarEditions)

  const editions = useMemo(() => queryEditions || [], [queryEditions])

  const [currentEdition, setCurrentEditionState] = React.useState<EditionContextType['currentEdition']>(undefined)

  const setCurrentEdition = (editionId: EditionContextType['currentEdition']): void => {
    if (!editionId) return
    setItemAsync('currentEdition', editionId)
    setCurrentEditionState(editionId)
  }

  useEffect(() => {
    const hydrateEdition = async (): Promise<void> => {
      const storedEdition = await getItemAsync('currentEdition')
      if (storedEdition) {
        setCurrentEditionState(storedEdition as EditionContextType['currentEdition'])
        setItemAsync('currentEdition', storedEdition)
      } else setCurrentEditionState(editions[0]?._id)
    }
    void hydrateEdition()
  }, [])

  const value: EditionContextType = {
    editions,
    currentEdition,
    setCurrentEdition,
  }

  return <EditionContext.Provider value={value}>{children}</EditionContext.Provider>
}

export default EditionProvider

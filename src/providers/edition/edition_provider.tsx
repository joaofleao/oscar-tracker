import React, { useEffect, useMemo } from 'react'
import { useQuery } from 'convex/react'
import { api } from 'convex_api'
import { getItemAsync, setItemAsync } from 'expo-secure-store'

import EditionContext, { type EditionContextType } from './edition_context'

const EditionProvider = ({ children }: { children?: React.ReactNode }): React.ReactElement => {
  const queryEditions = useQuery(api.oscars.getOscarEditions)

  const editions = useMemo(() => queryEditions || [], [queryEditions])

  const [currentEdition, setCurrentEdition] = React.useState<EditionContextType['currentEdition']>(undefined)

  useEffect(() => {
    if (editions.length === 0) return
    setCurrentEdition(editions[0]._id)
  }, [editions])

  useEffect(() => {
    const hydrateEdition = async (): Promise<void> => {
      const storedEdition = await getItemAsync('currentEdition')
      if (storedEdition) {
        setCurrentEdition(storedEdition as EditionContextType['currentEdition'])
      }
    }
    void hydrateEdition()
  }, [])

  useEffect(() => {
    if (!currentEdition) return
    setItemAsync('currentEdition', currentEdition)
  }, [currentEdition])

  const value: EditionContextType = {
    editions,
    currentEdition,
    setCurrentEdition,
  }

  return <EditionContext.Provider value={value}>{children}</EditionContext.Provider>
}

export default EditionProvider

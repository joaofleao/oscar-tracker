import React, { useEffect } from 'react'
import { useMMKVObject } from 'react-native-mmkv'
import { useConvex, useQuery } from 'convex/react'
import { api, PublicApiType } from 'convex_api'
import { useTranslation } from 'react-i18next'

import SettingsContext from './context'
import { type EditionContextType } from './types'
import print from '@utils/print'

const EditionProvider = ({ children }: { children?: React.ReactNode }): React.ReactElement => {
  const convex = useConvex()
  const { i18n } = useTranslation()

  const [allEditions, setAllEditions] = useMMKVObject<EditionContextType['editions']>('editions.all')
  const [edition, setEdition] = useMMKVObject<EditionContextType['edition']>('editions.current')
  const [editionsMap, setEditionsMap] = useMMKVObject<Record<string, { nominations: PublicApiType['oscar']['getNominations']['_returnType']; movies: PublicApiType['oscar']['getMovies']['_returnType'] }>>('editions.map')

  const [friendWatches, setFriendWatches] = useMMKVObject<typeof api.oscar.getFriendsWatches._returnType>('editions.all')

  const nominations = editionsMap?.[edition?.number ?? -1]?.nominations ?? []
  const movies = editionsMap?.[edition?.number ?? -1]?.movies ?? []
  const userWatches = useQuery(api.oscar.getUserWatches, { movies: movies.map((movie) => movie._id) }) ?? []

  const refreshEditionData: EditionContextType['refreshEditionData'] = async () => {
    print('Edition Data', 'Server Fetched', 'yellow')
    const fetchedMovies = await convex.query(api.oscar.getMovies, { editionId: edition?._id, language: i18n.language })
    const fetchedNominations = await convex.query(api.oscar.getNominations, { editionId: edition?._id, language: i18n.language })

    const newMap = {
      ...(editionsMap ?? {}),
      [edition?.number ?? '']: { movies: fetchedMovies, nominations: fetchedNominations },
    }
    setEditionsMap(newMap)
  }
  const refreshFriendsWatches: EditionContextType['refreshEditionData'] = async () => {
    print('Friend Watches', 'Server Fetched', 'yellow')

    const friendWatches = (await convex.query(api.oscar.getFriendsWatches, { movies: movies.map((movie) => movie._id) })) || []
    setFriendWatches(friendWatches)
  }

  useEffect(() => {
    const fetchEditionData = async (): Promise<void> => {
      if (editionsMap?.[edition?.number ?? ''] === undefined) await refreshEditionData()
      else print('Edition Data', 'Local Fetched', 'green')
    }
    const fetchFriendsWatches = async (): Promise<void> => {
      if (friendWatches === undefined) await refreshFriendsWatches()
      else print('Friend Watches', 'Local Fetched', 'green')
    }

    void fetchFriendsWatches()
    void fetchEditionData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edition])

  const selectEdition: EditionContextType['selectEdition'] = async (editionId) => {
    print('Current Edition', 'Server Fetched', 'yellow')
    const fetched = await convex.query(api.oscar.getEdition, { _id: editionId })
    setEdition(fetched)
  }

  useEffect(() => {
    const fetchAllEditions = async (): Promise<void> => {
      if (allEditions === undefined) {
        print('All Editions', 'Server Fetched', 'yellow')
        const fetched = await convex.query(api.oscar.getAllEditions, { public: true })
        setAllEditions(fetched)
      } else print('All Editions', 'Local Fetched', 'green')
    }

    const fetchCurrentEdition = async (): Promise<void> => {
      if (edition === undefined) selectEdition(undefined)
      else print('Current Edition', 'Local Fetched', 'green')
    }

    if (editionsMap === undefined) setEditionsMap({})

    void fetchAllEditions()
    void fetchCurrentEdition()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const moviesWithWatches = movies.map((movie) => ({
    ...movie,
    watched: userWatches.some((watch) => watch === movie._id),
    friends_who_watched: (friendWatches ?? []).find((watch) => watch.movieId === movie._id)?.friends_who_watched || [],
  }))

  const nominationsWithWatches = nominations.map((nomination) => ({
    ...nomination,
    nominations: nomination.nominations.map((nominatedMovie) => ({
      ...nominatedMovie,
      watched: userWatches.some((watch) => watch === nominatedMovie.movieId),
    })),
  }))

  return (
    <SettingsContext.Provider
      value={{
        refreshEditionData,
        refreshFriendsWatches,
        editions: allEditions ?? [],
        edition,
        selectEdition,
        nominations: nominationsWithWatches,
        movies: moviesWithWatches,
        userWatches: userWatches,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export default EditionProvider

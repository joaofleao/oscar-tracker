import React, { useEffect } from 'react'
import { useMMKVObject, useMMKVString } from 'react-native-mmkv'
import { useConvex, useQuery } from 'convex/react'
import { api, PublicApiType } from 'convex_api'
import { useTranslation } from 'react-i18next'

import SettingsContext from './context'
import { type EditionContextType } from './types'
import { isMoreThanOneDayOld } from '@utils/functions'
import print from '@utils/print'

const EditionProvider = ({ children }: { children?: React.ReactNode }): React.ReactElement => {
  const convex = useConvex()
  const { i18n } = useTranslation()

  const [allEditions, setAllEditions] = useMMKVObject<EditionContextType['editions']>('editions.all')
  const [edition, setEdition] = useMMKVObject<EditionContextType['edition']>('editions.current')
  const [country, setCountry] = useMMKVString('user.country')

  const [editionsMap, setEditionsMap] = useMMKVObject<Record<string, { nominations: PublicApiType['oscar']['getNominations']['_returnType']; movies: PublicApiType['oscar']['getMovies']['_returnType'] }>>('editions.map')
  const [friendsWatches, setFriendsWatches] = useMMKVObject<typeof api.oscar.getFriendsWatches._returnType>('user.friends_watches')
  const [moviesProviders, setMoviesProviders] = useMMKVObject<typeof api.providers.getProviders._returnType>('user.movies_providers')
  const [lastUpdatedDay, setLastUpdatedDay] = useMMKVString('lastUpdated')

  const [hiddenCategories, setHiddenCategories] = useMMKVObject<string[]>('categories.hidden')
  const [orderedCategories, setOrderedCategories] = useMMKVObject<string[]>('categories.ordered')
  const [providersFilter, setProvidersFilter] = useMMKVObject<number[]>('movies.providers')
  const [friendFilter, setFriendFilter] = useMMKVObject<string[]>('movies.friends')
  const [statusFilter, setStatusFilter] = useMMKVString('movies.status')

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

    const friendsWatches = (await convex.query(api.oscar.getFriendsWatches, { movies: movies.map((movie) => movie._id) })) || []
    setFriendsWatches(friendsWatches)
  }

  const refreshMoviesProviders: EditionContextType['refreshMoviesProviders'] = async () => {
    print('Movies Providers', 'Server Fetched', 'yellow')
    const moviesProviders = (await convex.action(api.providers.getProviders, { movies: movies.map((movie) => movie.tmdbId), country: country ?? 'BR' })) || []
    setMoviesProviders(moviesProviders)
  }

  useEffect(() => {
    const fetchEditionData = async (): Promise<void> => {
      if (editionsMap?.[edition?.number ?? ''] === undefined) await refreshEditionData()
      else print('Edition Data', 'Local Fetched', 'green')
    }

    const fetchMoviesProviders = async (): Promise<void> => {
      if (moviesProviders === undefined) await refreshMoviesProviders()
      else print('Movies Providers', 'Local Fetched', 'green')
    }
    const fetchFriendsWatches = async (): Promise<void> => {
      if (friendsWatches === undefined) await refreshFriendsWatches()
      else print('Friend Watches', 'Local Fetched', 'green')
    }

    void fetchMoviesProviders()
    void fetchFriendsWatches()
    void fetchEditionData()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edition])

  useEffect(() => {
    const toDayString = (date: Date): string => date.toISOString().split('T')[0]

    const refreshIfStale = async (): Promise<void> => {
      if (!isMoreThanOneDayOld(lastUpdatedDay)) return

      await refreshMoviesProviders()
      await refreshFriendsWatches()
      setLastUpdatedDay(toDayString(new Date()))
    }

    void refreshIfStale()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  const enrichedMovies = movies.map((movie) => ({
    ...movie,
    watched: userWatches.some((watch) => watch === movie._id),
    friends_who_watched: (friendsWatches ?? []).find((watch) => watch.movieId === movie._id)?.friends_who_watched || [],
    providers: moviesProviders?.find((mp) => mp.movieId === movie.tmdbId)?.providers || [],
  }))

  const enrichedNominations = nominations.map((nomination) => ({
    ...nomination,
    category: { ...nomination.category, hide: (hiddenCategories ?? []).includes(nomination.category._id) },
    nominations: nomination.nominations.map((nominatedMovie) => ({
      ...nominatedMovie,
      watched: userWatches.some((watch) => watch === nominatedMovie.movieId),
    })),
  }))

  return (
    <SettingsContext.Provider
      value={{
        refreshEditionData,
        refreshMoviesProviders,
        refreshFriendsWatches,
        editions: allEditions ?? [],
        edition,
        selectEdition,

        country: country ?? 'BR',
        setCountry,

        nominations: enrichedNominations,
        movies: enrichedMovies,
        userWatches: userWatches,
        friendsWatches: friendsWatches ?? [],

        orderedCategories: orderedCategories ?? [],
        setOrderedCategories,

        hiddenCategories: hiddenCategories ?? [],
        setHiddenCategories,

        friendFilter: friendFilter ?? [],
        setFriendFilter,

        providersFilter: providersFilter ?? [],
        setProvidersFilter,

        statusFilter: (statusFilter as 'all' | 'watched' | 'unwatched') ?? 'all',
        setStatusFilter,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export default EditionProvider

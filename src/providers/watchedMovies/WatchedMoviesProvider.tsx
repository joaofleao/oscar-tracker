import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'

import WatchedMoviesContext, { type WatchedMoviesContextType } from './WatchedMoviesContext'
import { useEdition } from '@providers/edition'
import { useUser } from '@providers/user'
import { WatchedMovieType } from '@types'
import { print } from '@utils/functions'

const WatchedMoviesProvider = ({ children }: { children?: React.ReactNode }): JSX.Element => {
  const { user, isLogged } = useUser()
  const edition = useEdition()

  const [watchedMovies, setWatchedMovies] = useState<WatchedMoviesContextType['watchedMovies']>({})

  const editionWatchedMovies = Object.entries(watchedMovies)
    .filter(([_, watchedMovie]) => {
      return Object.keys(edition.movies).includes(watchedMovie.movie)
    })
    .reduce(
      (acc, [key, watchedMovie]) => {
        acc[key] = watchedMovie
        return acc
      },
      {} as Record<string, WatchedMovieType>,
    )

  useEffect(() => {
    if (!isLogged) return

    const subscriber = firestore()
      .collection('users')
      .doc(user.uid)
      .collection('watchedMovies')
      .orderBy('date', 'desc')
      .onSnapshot((documentSnapshot) => {
        print('Firebase', 'Watched movies updated', 'green')
        const map: Record<string, WatchedMovieType> = {}
        documentSnapshot.forEach((doc) => {
          map[doc.id] = doc.data() as WatchedMovieType
        })
        setWatchedMovies(map)
      })

    return subscriber
  }, [isLogged, user])

  const setMovieUnwatched: WatchedMoviesContextType['setMovieUnwatched'] = async (movie) => {
    if (!isLogged) return

    try {
      const movieInstance = await firestore()
        .collection('users')
        .doc(user.uid)
        .collection('watchedMovies')
        .where('movie', '==', movie)
        .orderBy('date', 'desc')
        .limit(1)
        .get()

      if (!movieInstance.empty) {
        const docToDelete = movieInstance.docs[0]
        await firestore()
          .collection('users')
          .doc(user.uid)
          .collection('watchedMovies')
          .doc(docToDelete.id)
          .delete()
      }
    } catch (error) {
      print('Error removing watched movie: ', error, 'red')
    }
  }

  const setMovieWatched: WatchedMoviesContextType['setMovieWatched'] = (movie, date) => {
    if (!isLogged) return

    try {
      const object = {
        movie,
        date,
      }
      firestore().collection('users').doc(user.uid).collection('watchedMovies').add(object)
    } catch (error) {
      print('Error removing watched movie: ', error, 'red')
    }
  }

  const isMovieWatched: WatchedMoviesContextType['isMovieWatched'] = (movie) => {
    return Object.values(watchedMovies).some((record) => {
      return record.movie === movie
    })
  }

  const value: WatchedMoviesContextType = {
    watchedMovies,
    editionWatchedMovies,
    setMovieUnwatched,
    setMovieWatched,
    isMovieWatched,
  }

  return <WatchedMoviesContext.Provider value={value}>{children}</WatchedMoviesContext.Provider>
}

export default WatchedMoviesProvider

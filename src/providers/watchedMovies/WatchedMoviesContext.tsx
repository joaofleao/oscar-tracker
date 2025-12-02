import { createContext } from 'react'

import { WatchedMovieType } from '@types'

export interface WatchedMoviesContextType {
  watchedMovies: Record<string, WatchedMovieType>
  editionWatchedMovies: Record<string, WatchedMovieType>
  setMovieUnwatched: (movie: string) => void
  setMovieWatched: (movie: string, date: Date) => void

  isMovieWatched: (movie: string) => boolean
}

const WatchedMoviesContext = createContext<WatchedMoviesContextType | null>(null)
WatchedMoviesContext.displayName = 'WatchedMoviesContext'

export default WatchedMoviesContext

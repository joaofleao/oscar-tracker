import { useContext } from 'react'

import WatchedMoviesContext, { type WatchedMoviesContextType } from './WatchedMoviesContext'

const useWatchedMovies = (): WatchedMoviesContextType => {
  const useWatchedMoviesContext = useContext(WatchedMoviesContext)

  if (useWatchedMoviesContext === null) {
    throw new Error('useWatchedMovies has to be used within <WatchedMoviesContext.Provider>')
  }
  return useWatchedMoviesContext
}

export default useWatchedMovies

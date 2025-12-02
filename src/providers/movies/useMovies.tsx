import { useContext } from 'react'

import MoviesContext, { type MoviesContextType } from './MoviesContext'

const useMovies = (): MoviesContextType => {
  const useMoviesContext = useContext(MoviesContext)

  if (useMoviesContext === null) {
    throw new Error('useMovies has to be used within <MoviesContext.Provider>')
  }
  return useMoviesContext
}

export default useMovies

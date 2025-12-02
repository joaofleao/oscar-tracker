import { createContext } from 'react'

import type { CastType, MovieType, ProvidersType } from '@types'

export interface MoviesContextType {
  // TMDB related functions
  getMovie: (id: string) => Promise<MovieType>
  getCast: (id: string) => Promise<CastType>
  getProviders: (id: string) => Promise<ProvidersType>
  getTrailer: (id: string) => Promise<string>
  // Firebase related functions
}

const MoviesContext = createContext<MoviesContextType | null>(null)
MoviesContext.displayName = 'MoviesContext'

export default MoviesContext

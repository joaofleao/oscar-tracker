import React from 'react'

import MoviesContext, { type MoviesContextType } from './MoviesContext'
import { useUser } from '@providers/user'
import * as tmdb from '@services/tmdb/api'
import type { CastType, MovieType, ProvidersType } from '@types'
import { print } from '@utils/functions'

const MoviesProvider = ({ children }: { children?: React.ReactNode }): JSX.Element => {
  const { language } = useUser()
  const getMovie = async (id: string): Promise<MovieType> => {
    print('TMDB', 'Movie fetched', 'yellow')
    const response = await tmdb.getMovie(id, language)
    return response.data
  }
  const getCast = async (id: string): Promise<CastType> => {
    print('TMDB', 'Cast fetched', 'yellow')
    const response = await tmdb.getCast(id, language)
    return response.data
  }
  const getTrailer = async (id: string): Promise<string> => {
    print('TMDB', 'Trailer fetched', 'yellow')
    const response = await tmdb.getVideos(id, language)
    return response.data
  }
  const getProviders = async (id: string): Promise<ProvidersType> => {
    print('TMDB', 'Providers fetched', 'yellow')
    const response = await tmdb.getProviders(id, language)
    return response.data
  }

  const value = { getMovie, getCast, getTrailer, getProviders } satisfies MoviesContextType

  return <MoviesContext.Provider value={value}>{children}</MoviesContext.Provider>
}

export default MoviesProvider

import { type FunctionReference, anyApi } from 'convex/server'
import { type GenericId as Id } from 'convex/values'

export const api: PublicApiType = anyApi as unknown as PublicApiType
export const internal: InternalApiType = anyApi as unknown as InternalApiType

export type PublicApiType = {
  user: {
    generateUploadUrl: FunctionReference<'mutation', 'public', Record<string, never>, any>
    getLatestVersion: FunctionReference<
      'query',
      'public',
      {
        app: 'absolute-cinema' | 'oscar-tracker'
        language?: 'en_US' | 'pt_BR'
      },
      {
        _creationTime: number
        _id: Id<'versions'>
        app?: 'absolute-cinema' | 'oscar-tracker'
        changelog: string
        url: string
        version: string
      }
    >
    updateUser: FunctionReference<
      'mutation',
      'public',
      {
        hideCast?: boolean
        hidePlot?: boolean
        hidePoster?: boolean
        hideRate?: boolean
        image?: Id<'_storage'> | null
        language?: 'pt_BR' | 'en_US'
        name?: string
        username?: string
      },
      null
    >
    getCurrentUser: FunctionReference<
      'query',
      'public',
      Record<string, never>,
      {
        _creationTime: number
        _id: Id<'users'>
        email?: string
        emailVerificationTime?: number
        hideCast?: boolean
        hidePlot?: boolean
        hidePoster?: boolean
        hideRate?: boolean
        image?: Id<'_storage'>
        imageURL?: string
        isAnonymous?: boolean
        language?: 'pt_BR' | 'en_US'
        name?: string
        phone?: string
        phoneVerificationTime?: number
        username?: string
      } | null
    >
    deleteAccount: FunctionReference<'action', 'public', Record<string, never>, null>
    reportError: FunctionReference<'action', 'public', { message: string }, null>
    searchByName: FunctionReference<
      'query',
      'public',
      { name: string },
      Array<{
        _id: Id<'users'>
        following: boolean
        follows: boolean
        imageURL?: string
        name?: string
        username?: string
      }>
    >
    startFollowing: FunctionReference<'mutation', 'public', { friendId: Id<'users'> }, null>
    stopFollowing: FunctionReference<'mutation', 'public', { friendId: Id<'users'> }, null>
    getFollowing: FunctionReference<
      'query',
      'public',
      Record<string, never>,
      Array<{
        _id: Id<'users'>
        followsYou: boolean
        imageURL?: string
        name?: string
        username?: string
      }>
    >
    getFollowers: FunctionReference<
      'query',
      'public',
      Record<string, never>,
      Array<{
        _id: Id<'users'>
        following: boolean
        imageURL?: string
        name?: string
        username?: string
      }>
    >
  }
  actors: {
    searchActors: FunctionReference<
      'action',
      'public',
      { page?: number; query: string },
      Array<{
        id: number
        known_for: string
        name: string
        profile_path?: string
      }>
    >
    getOrCreateActor: FunctionReference<'mutation', 'public', { name: string; picture_path?: string; tmdbId: number }, Id<'actors'>>
    getActor: FunctionReference<
      'mutation',
      'public',
      { tmdbId: number },
      {
        _creationTime: number
        _id: Id<'actors'>
        name: string
        picture_path?: string
        tmdbId: number
      }
    >
  }
  auth: {
    isAuthenticated: FunctionReference<'query', 'public', Record<string, never>, any>
    signIn: FunctionReference<
      'action',
      'public',
      {
        calledBy?: string
        params?: any
        provider?: string
        refreshToken?: string
        verifier?: string
      },
      any
    >
    signOut: FunctionReference<'action', 'public', Record<string, never>, any>
  }
  movies: {
    searchMovies: FunctionReference<
      'action',
      'public',
      { language?: 'en_US' | 'pt_BR'; page?: number; query: string },
      Array<{
        id: number
        original_language?: string
        poster_path?: string
        release_date?: string
        title: string
        vote_average?: number
      }>
    >
    getMovie: FunctionReference<
      'query',
      'public',
      { language?: 'en_US' | 'pt_BR'; tmdbId: number },
      {
        _creationTime: number
        _id: Id<'movies'>
        backdropPath?: string
        imdbId?: string
        originCountry?: Array<{ code: string; name: string; url: string }>
        originalLanguage?: string
        plot?: string
        posterPath?: string
        releaseDate?: string
        runtime?: number
        status?: string
        tagline?: string
        title: { en_US: string; original: string; pt_BR: string }
        tmdbId: number
        voteAverage?: number
      } | null
    >
    getOrCreateMovie: FunctionReference<'action', 'public', { tmdbId: number }, Id<'movies'>>
    addToWatchlist: FunctionReference<'mutation', 'public', { movieId: Id<'movies'> }, Id<'watchlist'>>
    removeFromWatchlist: FunctionReference<'mutation', 'public', { movieId: Id<'movies'> }, null>
    removeFromWatchedMovies: FunctionReference<'mutation', 'public', { watchId: Id<'watchedMovies'> }, null>
    markAsWatched: FunctionReference<'mutation', 'public', { movieId: Id<'movies'>; watchedAt: number }, null>
    getUserWatchlist: FunctionReference<
      'query',
      'public',
      { language?: 'en_US' | 'pt_BR' },
      Array<{
        _creationTime: number
        _id: Id<'movies'>
        addedAt: number
        backdropPath?: string
        imdbId?: string
        originCountry?: Array<string>
        originalLanguage?: string
        plot?: string
        posterPath?: string
        releaseDate?: string
        runtime?: number
        status?: string
        tagline?: string
        title: string
        tmdbId: number
        voteAverage?: number
      }>
    >
    getUserWatchedMovies: FunctionReference<
      'query',
      'public',
      { language?: 'en_US' | 'pt_BR' },
      Array<{
        _creationTime: number
        _id: Id<'movies'>
        backdropPath?: string
        imdbId?: string
        originCountry?: Array<string>
        originalLanguage?: string
        plot?: string
        posterPath?: string
        releaseDate?: string
        runtime?: number
        status?: string
        tagline?: string
        title: string
        tmdbId: number
        voteAverage?: number
        watchId: Id<'watchedMovies'>
        watchedAt: number
      }>
    >
    isInWatchlist: FunctionReference<'query', 'public', { movieId: Id<'movies'> }, boolean>
    hasWatchedMovie: FunctionReference<'query', 'public', { movieId: Id<'movies'> }, boolean>
  }
  oscars: {
    getOscarEditions: FunctionReference<
      'query',
      'public',
      { public?: boolean },
      Array<{
        _creationTime: number
        _id: Id<'oscarEditions'>
        allowVoting: boolean
        announcement?: number
        complete: boolean
        date: number
        finished: boolean
        hasVoted: boolean
        moviesNominated: number
        moviesWatched: number
        number: number
        public: boolean
        year: number
      }>
    >
    createOscarEdition: FunctionReference<
      'mutation',
      'public',
      {
        announcement?: number
        complete: boolean
        date: number
        finished: boolean
        number: number
        public: boolean
        year: number
      },
      Id<'oscarEditions'>
    >
    updateOscarEdition: FunctionReference<
      'mutation',
      'public',
      {
        _id: Id<'oscarEditions'>
        announcement?: number
        complete: boolean
        date: number
        finished: boolean
        number: number
        public: boolean
        year: number
      },
      null
    >
    deleteOscarEdition: FunctionReference<'mutation', 'public', { _id: Id<'oscarEditions'> }, null>
    getOscarCategories: FunctionReference<
      'query',
      'public',
      Record<string, never>,
      Array<{
        _creationTime: number
        _id: Id<'oscarCategories'>
        group: string
        name: { en_US: string; pt_BR: string }
        order: number
      }>
    >
    getOscarGroups: FunctionReference<
      'query',
      'public',
      Record<string, never>,
      Array<{
        _creationTime: number
        _id: Id<'oscarGroups'>
        name: { en_US: string; pt_BR: string }
        order: number
        tagline: { en_US: string; pt_BR: string }
      }>
    >
    createOscarGroup: FunctionReference<
      'mutation',
      'public',
      {
        name: { en_US: string; pt_BR: string }
        order: number
        tagline: { en_US: string; pt_BR: string }
      },
      Id<'oscarGroups'>
    >
    createOscarCategory: FunctionReference<
      'mutation',
      'public',
      {
        groupId: Id<'oscarGroups'>
        name: { en_US: string; pt_BR: string }
        order: number
      },
      Id<'oscarCategories'>
    >
    updateOscarCategory: FunctionReference<
      'mutation',
      'public',
      {
        _id: Id<'oscarCategories'>
        groupId: Id<'oscarGroups'>
        name: { en_US: string; pt_BR: string }
        order: number
      },
      null
    >
    updateOscarGroup: FunctionReference<
      'mutation',
      'public',
      {
        _id: Id<'oscarGroups'>
        name: { en_US: string; pt_BR: string }
        order: number
        tagline: { en_US: string; pt_BR: string }
      },
      null
    >
    deleteOscarCategory: FunctionReference<'mutation', 'public', { _id: Id<'oscarCategories'> }, null>
    deleteOscarGroup: FunctionReference<'mutation', 'public', { _id: Id<'oscarGroups'> }, null>
    createOscarNomination: FunctionReference<
      'mutation',
      'public',
      {
        actorId?: Id<'actors'>
        categoryId: Id<'oscarCategories'>
        character?: { en_US: string; pt_BR: string }
        country?: string
        editionId: Id<'oscarEditions'>
        movieId: Id<'movies'>
        nominee?: { en_US: string; pt_BR: string }
        song?: string
        url?: string
        winner?: boolean
      },
      Id<'oscarNomination'>
    >
    getNominationsByEdition: FunctionReference<
      'query',
      'public',
      { editionId?: Id<'oscarEditions'> },
      Array<{
        _id: Id<'oscarNomination'>
        actor?: { _id: Id<'actors'>; name: string }
        category: {
          _id: Id<'oscarCategories'>
          name: { en_US: string; pt_BR: string }
        }
        character?: { en_US: string; pt_BR: string }
        country?: string
        movie: { _id: Id<'movies'>; title: { en_US: string; pt_BR: string } }
        nominee?: { en_US: string; pt_BR: string }
        song?: string
        url?: string
        watched?: boolean
        winner?: boolean
      }>
    >
    updateOscarNomination: FunctionReference<
      'mutation',
      'public',
      {
        actorId?: Id<'actors'>
        categoryId: Id<'oscarCategories'>
        character?: { en_US?: string; pt_BR?: string }
        country?: string
        editionId: Id<'oscarEditions'>
        movieId: Id<'movies'>
        nominationId: Id<'oscarNomination'>
        nominee?: { en_US?: string; pt_BR?: string }
        song?: string
        url?: string
        winner?: boolean
      },
      null
    >
    deleteOscarNomination: FunctionReference<'mutation', 'public', { nominationId: Id<'oscarNomination'> }, null>
    getWatchedMoviesFromEdition: FunctionReference<
      'query',
      'public',
      { editionId?: Id<'oscarEditions'>; language?: 'pt_BR' | 'en_US' },
      Array<{
        _id: Id<'watchedMovies'>
        movieId: Id<'movies'>
        posterPath?: string
        title: string
        tmdbId: number
        watchedAt: number
      }>
    >
    getMovies: FunctionReference<
      'query',
      'public',
      { editionId?: Id<'oscarEditions'>; language?: 'pt_BR' | 'en_US' },
      Array<{
        _id: Id<'movies'>
        friends_who_watched: Array<{
          _id: Id<'users'>
          imageURL?: string
          name?: string
        }>
        nominationCount: number
        posterPath?: string
        title: string
        tmdbId: number
        watched?: boolean
      }>
    >
    getNominations: FunctionReference<
      'query',
      'public',
      {
        categoryId?: Id<'oscarCategories'>
        editionId?: Id<'oscarEditions'>
        language?: 'pt_BR' | 'en_US'
      },
      Array<{
        category: { _id: Id<'oscarCategories'>; name: string; order: number }
        nominations: Array<{
          description?: string
          movieId: Id<'movies'>
          nominationId: Id<'oscarNomination'>
          posterPath?: string
          title: string
          tmdbId: number
          watched?: boolean
          winner?: boolean
        }>
        type: 'person' | 'song' | 'movie' | 'picture'
      }>
    >
    wishOscarNomination: FunctionReference<'mutation', 'public', { nominationId: Id<'oscarNomination'> }, null>
    unwishOscarNomination: FunctionReference<'mutation', 'public', { nominationId: Id<'oscarNomination'> }, null>
    rankNomination: FunctionReference<'mutation', 'public', { votes: Array<{ nominationId: Id<'oscarNomination'>; rank?: number }> }, null>
    getNominationsByCategory: FunctionReference<
      'query',
      'public',
      {
        categoryId?: Id<'oscarCategories'>
        editionId?: Id<'oscarEditions'>
        language?: 'pt_BR' | 'en_US'
      },
      {
        category: { categoryId: Id<'oscarCategories'>; name: string }
        nominations: Array<{
          description?: string
          extra?: string
          image?: string
          nominationId: Id<'oscarNomination'>
          rank?: number
          title: string
          tmdbId: number
          watched: boolean
          winner: boolean
          wish: boolean
        }>
      }
    >
    getMovieDetail: FunctionReference<
      'query',
      'public',
      { language?: 'pt_BR' | 'en_US'; tmdbId: number },
      {
        _creationTime: number
        _id: Id<'movies'>
        backdropPath?: string
        friends: Array<{
          _id: Id<'users'>
          imageURL?: string
          name?: string
          username?: string
        }>
        imdbId?: string
        latestWatch?: Id<'watchedMovies'>
        nominations: Array<{
          actorId?: Id<'actors'>
          categoryId: Id<'oscarCategories'>
          categoryName: string
          nominationId: Id<'oscarNomination'>
          winner?: boolean
        }>
        originCountry?: Array<{ code: string; name: string; url: string }>
        originalLanguage?: string
        plot?: string
        posterPath?: string
        releaseDate?: string
        runtime?: number
        status?: string
        tagline?: string
        title: { en_US: string; original: string; pt_BR: string }
        tmdbId: number
        voteAverage?: number
      }
    >
    getBallotResults: FunctionReference<
      'query',
      'public',
      { editionId?: Id<'oscarEditions'>; language?: 'pt_BR' | 'en_US' },
      Array<{
        categories: Array<{
          bonus: number
          categoryId: Id<'oscarCategories'>
          name: string
          nominations: Array<{
            movieId: Id<'movies'>
            nominationId: Id<'oscarNomination'>
            posterPath?: string
            title: string
            tmdbId: number
            watched: boolean
            winner: boolean
          }>
          penalty: number
          points: number
        }>
        group: { groupId: Id<'oscarGroups'>; name: string; tagline: string }
      }>
    >
    search: FunctionReference<
      'query',
      'public',
      {
        editionId?: Id<'oscarEditions'>
        language?: 'pt_BR' | 'en_US'
        name?: string
      },
      {
        categories: Array<{
          _id: Id<'oscarCategories'>
          groupName: string
          name: string
          order: number
        }>
        movies: Array<{
          _id: Id<'movies'>
          nominationCount: number
          posterPath?: string
          title: string
          tmdbId: number
          watched: boolean
        }>
        users: Array<{
          _id: Id<'users'>
          following: boolean
          follows: boolean
          imageURL?: string
          name?: string
          username?: string
        }>
      }
    >
  }
}
export type InternalApiType = {}

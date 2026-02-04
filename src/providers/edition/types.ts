import { PublicApiType } from 'convex_api'

type moviesWithWatches = PublicApiType['oscar']['getMovies']['_returnType'][0] & {
  watched: boolean
  friends_who_watched: any[]
}

type nominationWithWatches = PublicApiType['oscar']['getNominations']['_returnType'][0]['nominations'][0] & {
  watched: boolean
}

type nominationsWithWatches = Omit<PublicApiType['oscar']['getNominations']['_returnType'][0], 'nominations'> & {
  nominations: nominationWithWatches[]
}

export interface EditionContextType {
  nominations: nominationsWithWatches[]
  movies: moviesWithWatches[]
  editions: PublicApiType['oscar']['getAllEditions']['_returnType']
  edition?: PublicApiType['oscar']['getEdition']['_returnType']
  userWatches: PublicApiType['oscar']['getUserWatches']['_returnType']
  friendsWatches: PublicApiType['oscar']['getFriendsWatches']['_returnType']

  refreshEditionData: () => Promise<void>
  refreshFriendsWatches: () => Promise<void>
  selectEdition: (editionId?: PublicApiType['oscar']['getEdition']['_returnType']['_id']) => Promise<void>
}

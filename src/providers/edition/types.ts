import { PublicApiType } from 'convex_api'

type Movies = PublicApiType['oscar']['getMovies']['_returnType'][0] & {
  watched: boolean
  friends_who_watched: any[]
}

type Nomination = PublicApiType['oscar']['getNominations']['_returnType'][0]['nominations'][0] & {
  watched: boolean
}
type Category = PublicApiType['oscar']['getNominations']['_returnType'][0]['category'] & {
  hide?: boolean
}

type Nominations = Omit<PublicApiType['oscar']['getNominations']['_returnType'][0], 'nominations'> & {
  nominations: Nomination[]
  category: Category
}

export interface EditionContextType {
  nominations: Nominations[]
  movies: Movies[]
  editions: PublicApiType['oscar']['getAllEditions']['_returnType']
  edition?: PublicApiType['oscar']['getEdition']['_returnType']
  userWatches: PublicApiType['oscar']['getUserWatches']['_returnType']
  friendsWatches: PublicApiType['oscar']['getFriendsWatches']['_returnType']

  hiddenCategories: string[]
  orderedCategories: string[]

  refreshEditionData: () => Promise<void>
  refreshFriendsWatches: () => Promise<void>
  selectEdition: (editionId?: PublicApiType['oscar']['getEdition']['_returnType']['_id']) => Promise<void>

  setOrderedCategories: (categoryIds: string[]) => void
  setHiddenCategories: (categoryIds: string[]) => void

  clearCategoriesSettings: () => void
}

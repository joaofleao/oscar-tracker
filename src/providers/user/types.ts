import { PublicApiType } from 'convex_api'

type FollowingWithWatched = PublicApiType['user']['getFollowing']['_returnType'][0] & {
  watched: number
}

export interface UserContextType {
  user?: PublicApiType['user']['getCurrentUser']['_returnType']
  refreshUser: () => void
  spoilers: {
    hidePoster: boolean
    hideCast: boolean
    hideRate: boolean
    hidePlot: boolean
  }
  setSpoilers: (name: keyof UserContextType['spoilers'], value: boolean) => void

  setLanguage: (language: 'pt_BR' | 'en_US') => void

  following: FollowingWithWatched[]
  refreshFollowing: () => void
  followers: PublicApiType['user']['getFollowers']['_returnType']
  refreshFollowers: () => void
}

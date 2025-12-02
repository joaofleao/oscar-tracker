export type BetType = {
  first: string
  second: string
}

export type BetsType = {
  picture: BetType
  cinematography: BetType
  director: BetType
  sound: BetType
  'adapted-screenplay': BetType
  'animated-film': BetType
  'animated-short': BetType
  'costume-design': BetType
  'documentary-feature': BetType
  'documentary-short': BetType
  'film-editing': BetType
  'international-film': BetType
  'leading-actor': BetType
  'leading-actress': BetType
  'live-action-short': BetType
  'makeup-hairstyling': BetType
  'original-score': BetType
  'original-screenplay': BetType
  'original-song': BetType
  'production-design': BetType
  'sound-editing': BetType
  'sound-mixing': BetType
  'supporting-actor': BetType
  'supporting-actress': BetType
  'visual-effects': BetType
}

export type WishesType = {
  picture: string[]
  cinematography: string[]
  director: string[]
  sound: string[]
  'adapted-screenplay': string[]
  'animated-film': string[]
  'animated-short': string[]
  'costume-design': string[]
  'documentary-feature': string[]
  'documentary-short': string[]
  'film-editing': string[]
  'international-film': string[]
  'leading-actor': string[]
  'leading-actress': string[]
  'live-action-short': string[]
  'makeup-hairstyling': string[]
  'original-score': string[]
  'original-screenplay': string[]
  'original-song': string[]
  'production-design': string[]
  'sound-editing': string[]
  'sound-mixing': string[]
  'supporting-actor': string[]
  'supporting-actress': string[]
  'visual-effects': string[]
}

export type BallotType = {
  bets: BetsType
  wishes: WishesType
}

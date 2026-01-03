import { PublicApiType } from 'convex_api'

type EditionType = PublicApiType['oscars']['getOscarEditions']['_returnType']

export interface SettingsContextType {
  spoilers: {
    hidePoster: boolean
    hideCast: boolean
    hideRate: boolean
    hidePlot: boolean
  }
  setSpoilers: (name: keyof SettingsContextType['spoilers'], value: boolean) => void
  editions: EditionType
  currentEdition: string | undefined
  setCurrentEdition: (editionId: SettingsContextType['currentEdition']) => void
  language: string
  setLanguage: (language: string) => void
}

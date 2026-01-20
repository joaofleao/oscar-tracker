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
  edition?: EditionType[number]
  setEdition: (edition: string) => void
  language: 'pt_BR' | 'en_US'
  setLanguage: (language: SettingsContextType['language']) => void
}

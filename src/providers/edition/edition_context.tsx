import { createContext } from 'react'
import { PublicApiType } from 'convex_api'

type EditionType = PublicApiType['oscars']['getOscarEditions']['_returnType']

export interface EditionContextType {
  editions: EditionType
  currentEdition: EditionType[0]['_id']
  setCurrentEdition: React.Dispatch<React.SetStateAction<EditionType[0]['_id']>>
}

const EditionContext = createContext<EditionContextType | null>(null)
EditionContext.displayName = 'EditionContext'

export default EditionContext

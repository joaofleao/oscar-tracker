import { useContext } from 'react'

import EditionContext from './context'
import { type EditionContextType } from './types'

const useEdition = (): EditionContextType => {
  const useEditionContext = useContext(EditionContext)

  if (useEditionContext === null) {
    throw new Error('useEdition has to be used within <EditionContext.Provider>')
  }
  return useEditionContext
}

export default useEdition

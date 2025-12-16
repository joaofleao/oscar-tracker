import { useContext } from 'react'

import EditionContext, { type EditionContextType } from './EditionContext'

const useEditions = (): EditionContextType => {
  const useEditionsContext = useContext(EditionContext)

  if (useEditionsContext === null) {
    throw new Error('useEditions has to be used within <EditionsContext.Provider>')
  }
  return useEditionsContext
}

export default useEditions

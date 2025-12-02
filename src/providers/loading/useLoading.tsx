import { useContext } from 'react'

import LoadingContext, { type LoadingContextType } from './LoadingContext'

const useLoading = (): LoadingContextType => {
  const useLoadingContext = useContext(LoadingContext)

  if (useLoadingContext === null) {
    throw new Error('useLoading has to be used within <LoadingContext.Provider>')
  }
  return useLoadingContext
}

export default useLoading

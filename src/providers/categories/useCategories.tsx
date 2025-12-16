import { useContext } from 'react'

import CategoriesContext, { type CategoriesContextType } from './CategoriesContext'

const useCategories = (): CategoriesContextType => {
  const useCategoriesContext = useContext(CategoriesContext)

  if (useCategoriesContext === null) {
    throw new Error('useCategories has to be used within <CategoriesContext.Provider>')
  }
  return useCategoriesContext
}

export default useCategories

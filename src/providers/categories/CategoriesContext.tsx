import { createContext } from 'react'

import type { CategoryType } from '@types'

export interface CategoriesContextType {
  categories_map: Record<string, CategoryType>
  categories_list: Array<string>
  getCategories: () => Promise<void>
  fetchCategories: () => Promise<void>
}

const CategoriesContext = createContext<CategoriesContextType | null>(null)
CategoriesContext.displayName = 'CategoriesContext'

export default CategoriesContext

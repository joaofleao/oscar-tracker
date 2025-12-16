import React from 'react'

// import firestore from '@react-native-firebase/firestore'
import CategoriesContext, { type CategoriesContextType } from './CategoriesContext'
import useAsyncStorage from '@hooks/useAsyncStorage'
import { useEdition } from '@providers/edition'
import { db } from '@services/firebase'
import { CategoryType } from '@types'
import { print } from '@utils/functions'

const CategoriesProvider = ({ children }: { children?: React.ReactNode }): JSX.Element => {
  const { editionId } = useEdition()

  const async = useAsyncStorage()

  const [categories_map, setCategoriesMap] = React.useState<
    CategoriesContextType['categories_map']
  >({})

  const categories_list = Object.keys(categories_map)

  React.useEffect(() => {
    getCategories()
  }, [editionId])

  const fetchCategories: CategoriesContextType['fetchCategories'] = async () => {
    print('Firebase', 'Categories fetched', 'yellow')
    const categoriesCollection = []
    // await firestore().collection('categories').get()

    const map: CategoriesContextType['categories_map'] = {}

    categoriesCollection.forEach((item) => {
      map[item.id] = item.data() as CategoryType
    })

    const ordered = Object.entries(map)
      .sort((a, b) => {
        const order = a[1].order - b[1].order
        return order
      })
      .reduce((accumulator: CategoriesContextType['categories_map'], current) => {
        accumulator[current[0]] = current[1]
        return accumulator
      }, {})

    setCategoriesMap(ordered)
    await async.storeObject('categories', ordered)
  }

  const getCategories: CategoriesContextType['getCategories'] = async () => {
    const storedCategories = await async.readObject('categories')

    if (storedCategories) {
      print('Async-Storage', 'Categories fetched', 'blue')
      setCategoriesMap(storedCategories as CategoriesContextType['categories_map'])
    } else {
      fetchCategories()
    }
  }

  const value: CategoriesContextType = {
    categories_map,
    categories_list,
    getCategories,
    fetchCategories,
  }

  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}

export default CategoriesProvider

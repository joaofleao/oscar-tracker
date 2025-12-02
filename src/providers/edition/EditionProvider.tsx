import React, { useEffect } from 'react'
import firestore, { Timestamp } from '@react-native-firebase/firestore'

import EditionContext, { type EditionContextType } from './EditionContext'
import { useUser } from '@providers/user'
import useAsyncStorage from '@hooks/useAsyncStorage'
import type { BasicMovieType, EditionType, Nomination, PersonType } from '@types'
import { print } from '@utils/functions'

const EditionProvider = ({ children }: { children?: React.ReactNode }): JSX.Element => {
  const { language } = useUser()
  const [movies, setMovies] = React.useState<EditionContextType['movies']>({})

  const [people, setPeople] = React.useState<EditionContextType['people']>({})
  const [nominations, setNominations] = React.useState<EditionContextType['nominations']>({})

  const [categories, setCategories] = React.useState<EditionType['categories']>([])
  const [winners, setWinners] = React.useState<EditionType['winners']>({})

  const [editionId, setEditionId] = React.useState<string>('97')
  const [year, setYear] = React.useState<number>(0)

  const [date, setDate] = React.useState<Timestamp>(Timestamp.now())

  const async = useAsyncStorage()

  useEffect(() => {
    const subscriber = firestore()
      .collection('editions')
      .doc(editionId)
      .onSnapshot((documentSnapshot) => {
        print('Firebase', 'Edition updated', 'green')

        const data = documentSnapshot.data() as EditionType

        setDate(data.date)
        setYear(data.year)
        setWinners(data.winners)
        setCategories(data.categories)
      })

    return subscriber
  }, [])

  React.useEffect(() => {
    getPeople()
    getMovies()
    getNominations()

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchMovies = async (): Promise<void> => {
    print('Firebase', 'Movies fetched', 'yellow')

    const moviesCollection = await firestore()
      .collection('editions')
      .doc(editionId)
      .collection('movies')
      .orderBy(`name.${language}`)
      .get()

    const map: typeof movies = {}

    moviesCollection.forEach((item) => {
      map[item.id] = item.data() as BasicMovieType
    })

    setMovies(map)
    await async.storeObject('movies', map)
  }

  const getMovies = async (): Promise<void> => {
    const storedMovies = await async.readObject('movies')
    if (storedMovies) {
      print('Async-Storage', 'Movies fetched', 'blue')
      setMovies(storedMovies as EditionContextType['movies'])
    } else fetchMovies()
  }

  const fetchPeople = async (): Promise<void> => {
    print('Firebase', 'People fetched', 'yellow')

    const peopleCollection = await firestore()
      .collection('editions')
      .doc(editionId)
      .collection('people')
      .orderBy('name')
      .get()

    const map: typeof people = {}

    peopleCollection.forEach((item) => {
      map[item.id] = item.data() as PersonType
    })

    setPeople(map)
    await async.storeObject('people', map)
  }

  const getPeople = async (): Promise<void> => {
    const storedPeople = await async.readObject('people')

    if (storedPeople) {
      print('Async-Storage', 'People fetched', 'blue')
      setPeople(storedPeople as EditionContextType['people'])
    } else fetchPeople()
  }

  const fetchNominations = async (): Promise<void> => {
    print('Firebase', 'Nominations fetched', 'yellow')

    const nominationsCollection = await firestore()
      .collection('editions')
      .doc(editionId)
      .collection('nominations')
      .get()

    const map: typeof nominations = {}

    nominationsCollection.forEach((item) => {
      const data = { ...item.data(), id: item.id } as Nomination
      const oldValues = map[data.category] ?? []
      map[data.category] = [...oldValues, data]
    })

    setNominations(map)
    await async.storeObject('nominations', map)
  }

  const getNominations = async (): Promise<void> => {
    const storedNominations = await async.readObject('nominations')

    if (storedNominations) {
      print('Async-Storage', 'Nominations fetched', 'blue')

      setNominations(storedNominations as EditionContextType['nominations'])
    } else fetchNominations()
  }

  const markCategoryWinner = async (nominationId: string, categoryId: string): Promise<void> => {
    const currentWinners = winners ?? {}
    currentWinners[categoryId] = nominationId
    await firestore().collection('editions').doc(editionId).update({ winners: currentWinners })
    print('Firebase', 'Winner Marked', 'yellow')
  }

  const getMovieNominations = async (movie: string): Promise<Nomination[]> => {
    print('Firebase', 'Movie Nominations fetched', 'yellow')

    const nominationsCollection = await firestore()
      .collection('editions')
      .doc(editionId)
      .collection('nominations')
      .where('movie', '==', movie)
      .get()

    const array: Nomination[] = []

    nominationsCollection.forEach((item) => {
      const nomination = { ...item.data(), id: item.id } as Nomination
      array.push(nomination)
    })

    return array
  }

  const changeEdition: EditionContextType['setEditionId'] = async (id) => {
    setEditionId(id)
    await async.storeString('editionId', id)
  }

  const refreshEdition: EditionContextType['refreshEdition'] = async () => {
    fetchMovies()
    fetchPeople()
    fetchNominations()
  }
  const value: EditionContextType = {
    //edition data
    winners,
    categories,
    year,
    date,

    editionId,
    setEditionId: changeEdition,

    //edition collections
    movies,
    people,
    nominations,

    refreshEdition,

    getMovieNominations,

    markCategoryWinner,
  }

  return <EditionContext.Provider value={value}>{children}</EditionContext.Provider>
}

export default EditionProvider

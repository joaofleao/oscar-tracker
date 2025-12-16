import React, { useEffect } from 'react'
import firestore from '@react-native-firebase/firestore'

import BallotsContext, { type BallotsContextType } from './BallotsContext'
import { BallotType, BetsType, WishesType } from './types'
import { useEdition } from '@providers/edition'
import { useUser } from '@providers/user'
import { print } from '@utils/functions'

const BallotsProvider = ({ children }: { children?: React.ReactNode }): JSX.Element => {
  const { user, isLogged } = useUser()
  const edition = useEdition()

  const [bets, setBets] = React.useState<BetsType>()
  const [wishes, setWishes] = React.useState<WishesType>()

  const allPoints = React.useMemo(() => {
    const _points: { [key: string]: number } = {}

    Object.entries(edition.winners || []).forEach((winner) => {
      if (bets?.[winner[0]]?.first === winner[1]) {
        _points[winner[0]] = 100
      }
      if (bets?.[winner[0]]?.second === winner[1]) {
        _points[winner[0]] = 50
      }
    })
    return _points
  }, [bets, edition.winners])

  const points = Object.values(allPoints).reduce((acc, cur) => {
    return acc + cur
  }, 0)

  useEffect(() => {
    if (!isLogged) return

    const setDefault = (): void => {
      firestore()
        .collection('users')
        .doc(user.uid)
        .collection('ballots')
        .doc(edition.editionId)
        .set({
          bets: {},
          wishes: {},
        })
    }

    const subscriber = firestore()
      .collection('users')
      .doc(user.uid)
      .collection('ballots')
      .doc(edition.editionId)
      .onSnapshot((documentSnapshot) => {
        print('Firebase', 'Ballots updated', 'green')
        const data = documentSnapshot.data() as BallotType
        if (data) {
          setBets(data.bets)
          setWishes(data.wishes)
        } else setDefault()
      })

    return subscriber
  }, [isLogged, user, edition.editionId])

  const vote: BallotsContextType['vote'] = (_category, _bets, _wishes) => {
    if (!isLogged) return

    const finalBets = {
      first: _bets.first ?? '',
      second: _bets.second ?? '',
    }
    const finalWishes = _wishes ?? []
    const object = {
      ['bets.' + _category]: finalBets,
      ['wishes.' + _category]: finalWishes,
    }

    firestore()
      .collection('users')
      .doc(user.uid)
      .collection('ballots')
      .doc(edition.editionId)
      .update(object)
  }

  const value: BallotsContextType = {
    vote,
    bets,
    wishes,
    points,
  }

  return <BallotsContext.Provider value={value}>{children}</BallotsContext.Provider>
}

export default BallotsProvider

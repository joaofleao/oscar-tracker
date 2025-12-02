import React from 'react'
import firestore from '@react-native-firebase/firestore'

import AnnouncementsContext, { type AnnouncementsContextType } from './AnnouncementsContext'
import type { AnnouncementType } from '@types'
import { print } from '@utils/functions'

const AnnouncementProvider = ({ children }: { children?: React.ReactNode }): JSX.Element => {
  const announcementsCollection = firestore().collection('announcements')

  const [announcements, setAnnouncements] = React.useState<AnnouncementType[]>([])

  const getAnnouncements = async (): Promise<void> => {
    const response = await announcementsCollection.orderBy('date').get()

    print('Firebase', 'Announcements fetched', 'yellow')
    const array = []
    response.forEach((item) => {
      return array.push(item.data())
    })
    setAnnouncements(array)
  }

  const value: AnnouncementsContextType = {
    announcements,
    getAnnouncements,
  }

  return <AnnouncementsContext.Provider value={value}>{children}</AnnouncementsContext.Provider>
}

export default AnnouncementProvider

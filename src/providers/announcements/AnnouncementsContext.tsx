import { createContext } from 'react'

import type { AnnouncementType } from '@types'

export interface AnnouncementsContextType {
  announcements: AnnouncementType[]
  getAnnouncements: () => Promise<void>
}

const AnnouncementsContext = createContext<AnnouncementsContextType | null>(null)
AnnouncementsContext.displayName = 'AnnouncementsContext'

export default AnnouncementsContext

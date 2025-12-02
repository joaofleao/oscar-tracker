import { useContext } from 'react'

import AnnouncementsContext, { type AnnouncementsContextType } from './AnnouncementsContext'

const useAnnouncements = (): AnnouncementsContextType => {
  const useAnnouncementsContext = useContext(AnnouncementsContext)

  if (useAnnouncementsContext === null) {
    throw new Error('useAnnouncements has to be used within <AnnouncementsContext.Provider>')
  }
  return useAnnouncementsContext
}

export default useAnnouncements

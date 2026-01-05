import React from 'react'

import { event } from '.'
import EventContext from './context'

const EventProvider = ({ children }: { children?: React.ReactNode }): React.ReactElement => {
  return <EventContext.Provider value={event}>{children}</EventContext.Provider>
}

export default EventProvider

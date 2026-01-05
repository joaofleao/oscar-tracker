import React from 'react'
import EventEmitter from 'eventemitter3'

import EventContext from './context'

export const useEvent = (): EventEmitter => {
  return React.useContext(EventContext)
}

export default useEvent

import React from 'react'
import EventEmitter from 'eventemitter3'

import { event } from '.'

const EventContext = React.createContext<EventEmitter>(event)

export default EventContext

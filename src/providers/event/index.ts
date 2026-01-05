import { EventEmitter } from 'eventemitter3'

export { default as SettingsContext } from './context'
export { default as SettingsProvider } from './provider'
export { default as useEvent } from './useEvent'

export const event = new EventEmitter()

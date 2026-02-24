import { Buffer } from 'buffer'
import { registerRootComponent } from 'expo'

import App from './App'
global.Buffer = Buffer

registerRootComponent(App)

import React from 'react'
import { View } from 'react-native'
import { AnimatedProps } from 'react-native-reanimated'

export interface SectionProps {
  children: React.ReactNode
  title: string
  entering?: AnimatedProps<View>['entering']
  layout?: AnimatedProps<View>['layout']
  exiting?: AnimatedProps<View>['exiting']

  legend?: boolean
  button?: {
    title: string
    action: () => void
  }
}

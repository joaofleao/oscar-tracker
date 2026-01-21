import React from 'react'
import { View } from 'react-native'
import { AnimatedProps } from 'react-native-reanimated'

export interface SectionProps {
  children: React.ReactNode
  title: string
  entering?: AnimatedProps<View>['entering']
  exiting?: AnimatedProps<View>['exiting']

  button?: {
    title: string
    action: () => void
  }
}

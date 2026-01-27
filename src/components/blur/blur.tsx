import React from 'react'
import { Platform, View } from 'react-native'
import { BlurView } from 'expo-blur'

import useStyles from './styles'
import { BlurProps } from './types'

const Blur = ({ style, ...props }: BlurProps): React.ReactElement => {
  const styles = useStyles()

  if (Platform.OS === 'ios')
    return (
      <BlurView
        intensity={20}
        style={[styles.root, style]}
        {...props}
      />
    )

  return (
    <View
      style={[styles.root, style]}
      {...props}
    />
  )
}

export default Blur

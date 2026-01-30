import React from 'react'
import { Platform, View } from 'react-native'
import { BlurView } from 'expo-blur'

import useStyles from './styles'
import { BlurProps } from './types'

const Blur = ({ style, children, variant = 'container', ...props }: BlurProps): React.ReactElement => {
  const styles = useStyles({ variant })

  return (
    <View
      {...props}
      style={[styles.root, style]}
    >
      {Platform.OS === 'ios' ? (
        <BlurView
          intensity={10}
          style={styles.blur}
        />
      ) : (
        <View style={styles.background} />
      )}
      {children}
    </View>
  )
}

export default Blur

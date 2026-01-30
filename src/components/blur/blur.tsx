import React from 'react'
import { Platform } from 'react-native'
import Animated from 'react-native-reanimated'
import { BlurView } from 'expo-blur'

import useStyles from './styles'
import { BlurProps } from './types'

const Blur = ({ animation, style, children, variant = 'container', ...props }: BlurProps): React.ReactElement => {
  const styles = useStyles({ variant })

  return (
    <Animated.View
      {...props}
      style={[styles.root, style]}
    >
      {Platform.OS === 'ios' ? (
        <Animated.View style={[styles.background, styles.apple, animation]}>
          <BlurView
            intensity={10}
            style={styles.blur}
          />
        </Animated.View>
      ) : (
        <Animated.View
          {...props}
          style={[styles.background, styles.android, animation, style]}
        />
      )}
      {children}
    </Animated.View>
  )
}

export default Blur

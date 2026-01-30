import React from 'react'
import { View } from 'react-native'
import Animated from 'react-native-reanimated'
import { BlurView } from 'expo-blur'

import useStyles from './styles'
import { BlurProps } from './types'

const Blur = ({ style, children, animation, variant = 'container', ...props }: BlurProps): React.ReactElement => {
  const styles = useStyles({ variant })

  const [headerHeight, setHeaderHeight] = React.useState<number>(0)

  return (
    <>
      <View style={{ height: headerHeight }} />
      <Animated.View
        onLayout={(e) => {
          const { height } = e.nativeEvent.layout
          setHeaderHeight(height)
        }}
        style={[styles.floating, style]}
        {...props}
      >
        <Animated.View style={[styles.root, animation]}>
          <BlurView
            intensity={10}
            style={styles.blur}
          />
        </Animated.View>
        {children}
      </Animated.View>
    </>
  )
}

export default Blur

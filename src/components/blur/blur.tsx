import React from 'react'
import { Platform, View } from 'react-native'
import Animated from 'react-native-reanimated'
import { BlurView } from 'expo-blur'

import useStyles from './styles'
import { BlurProps } from './types'

const Blur = ({ style, children, animatedStyle, ...props }: BlurProps): React.ReactElement => {
  const styles = useStyles()

  const [headerHeight, setHeaderHeight] = React.useState<number>(0)

  if (Platform.OS === 'android')
    return (
      <Animated.View
        style={style}
        {...props}
      >
        <Animated.View style={[styles.root, styles.android, animatedStyle]}></Animated.View>
        {children}
      </Animated.View>
    )

  return (
    <>
      <View style={{ height: 60, backgroundColor: 'red' }} />
      <Animated.View
        onLayout={(e) => {
          const { height } = e.nativeEvent.layout
          setHeaderHeight(height)
        }}
        style={[style, { position: 'absolute', top: 0, left: 0, right: 0, zIndex: 10 }]}
        {...props}
      >
        <Animated.View style={[styles.root, animatedStyle]}>
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

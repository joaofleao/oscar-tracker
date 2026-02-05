import React from 'react'
import { View } from 'react-native'
import Animated, { LinearTransition } from 'react-native-reanimated'

import useStyles from './styles'
import { ProgressBarProps } from './types'
import Typography from '@components/typography'

const ProgressBar = ({ value: valueProp, maxValue, style }: ProgressBarProps): React.ReactElement => {
  const value = Math.min(valueProp, maxValue)
  const percentage = maxValue === 0 ? 0 : (value / maxValue) * 100
  const styles = useStyles({ percentage })

  return (
    <View style={[styles.root, style]}>
      <Typography legend>{String(value).padStart(2, '0')}</Typography>
      <View style={styles.placeholder}>
        <Animated.View
          layout={LinearTransition.springify()}
          style={styles.progress}
        />
      </View>
      <Typography legend>{String(maxValue).padStart(2, '0')}</Typography>
    </View>
  )
}

export default ProgressBar

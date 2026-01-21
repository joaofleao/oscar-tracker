import React from 'react'
import { View } from 'react-native'

import useStyles from './styles'
import { ProgressBarProps } from './types'
import Typography from '@components/typography'

const ProgressBar = ({ value, maxValue, style }: ProgressBarProps): React.ReactElement => {
  const percentage = maxValue === 0 ? 0 : (value / maxValue) * 100
  const styles = useStyles({ percentage })

  return (
    <View style={[styles.root, style]}>
      <Typography legend>{String(value).padStart(2, '0')}</Typography>
      <View style={styles.placeholder}>
        <View style={styles.progress} />
      </View>
      <Typography legend>{String(maxValue).padStart(2, '0')}</Typography>
    </View>
  )
}

export default ProgressBar

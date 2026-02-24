import React from 'react'
import { ViewStyle } from 'react-native'
import Animated from 'react-native-reanimated'

import useStyles from './styles'
import { ColumnProps } from './types'

const Column = ({ wrap = false, style, center, start, end, between, around, evenly, middle, leading, trailing, stretch, baseline, ...props }: ColumnProps): React.ReactElement => {
  const getJustifyContent = (): ViewStyle['justifyContent'] => {
    if (center) return 'center'
    if (start) return 'flex-start'
    if (end) return 'flex-end'
    if (between) return 'space-between'
    if (around) return 'space-around'
    if (evenly) return 'space-evenly'
  }

  const getAlign = (): ViewStyle['alignItems'] => {
    if (middle) return 'center'
    if (trailing) return 'flex-end'
    if (stretch) return 'stretch'
    if (baseline) return 'baseline'
    return 'flex-start'
  }

  const styles = useStyles({
    justify: getJustifyContent(),
    align: getAlign(),
  })

  return (
    <Animated.View
      style={[styles.column, wrap && styles.wrap, style]}
      {...props}
    />
  )
}

export default Column

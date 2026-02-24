import React from 'react'
import { ViewStyle } from 'react-native'
import Animated from 'react-native-reanimated'

import useStyles from './styles'
import { RowProps } from './types'

const Row = ({ wrap = false, style, center, start, end, between, around, evenly, middle, ...props }: RowProps): React.ReactElement => {
  const getJustifyContent = (): ViewStyle['justifyContent'] => {
    if (center) return 'center'
    if (start) return 'flex-start'
    if (end) return 'flex-end'
    if (between) return 'space-between'
    if (around) return 'space-around'
    if (evenly) return 'space-evenly'
  }

  const styles = useStyles({
    justify: getJustifyContent(),
    align: middle ? 'middle' : undefined,
  })

  return (
    <Animated.View
      style={[styles.row, wrap && styles.wrap, style]}
      {...props}
    />
  )
}

export default Row

import React from 'react'
import { View, ViewStyle } from 'react-native'

import useStyles from './styles'
import { RowProps } from './types'

const Row = ({
  wrap = false,
  style,
  center,
  start,
  end,
  between,
  around,
  evenly,
  ...props
}: RowProps): React.ReactElement => {
  const styles = useStyles()

  const getJustifyContent = (): ViewStyle['justifyContent'] => {
    if (center) return 'center'
    if (start) return 'flex-start'
    if (end) return 'flex-end'
    if (between) return 'space-between'
    if (around) return 'space-around'
    if (evenly) return 'space-evenly'
  }

  return (
    <View
      style={[styles.row, wrap && styles.wrap, { justifyContent: getJustifyContent() }, style]}
      {...props}
    />
  )
}

export default Row

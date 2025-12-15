import React from 'react'
import { View } from 'react-native'

import SegmentedControlItem from './segmented_control_item'
import useStyles from './styles'
import { SegmentedControlProps } from './types'

const SegmentedControl = ({ selected, onChange, options }: SegmentedControlProps): React.ReactElement => {
  const style = useStyles()
  const selectedIndex = Object.keys(options).findIndex((key) => key === selected)

  return (
    <View style={style.root}>
      {Object.entries(options).map(([key, value], index) => (
        <React.Fragment key={index}>
          {index !== 0 && <View style={style.divider} />}
          <SegmentedControlItem
            selected={index === selectedIndex}
            onPress={() => onChange(key)}
          >
            {value}
          </SegmentedControlItem>
        </React.Fragment>
      ))}
    </View>
  )
}

export default SegmentedControl

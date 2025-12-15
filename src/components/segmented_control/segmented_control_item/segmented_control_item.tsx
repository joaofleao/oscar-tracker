import React from 'react'
import { TouchableOpacity } from 'react-native'

import useStyles from './styles'
import { SegmentedControlItemProps } from './types'
import Typography from '@components/typography'
import { useTheme } from '@providers/theme'

const SegmentedControlItem = ({ selected, children, ...props }: SegmentedControlItemProps): React.ReactElement => {
  const style = useStyles()
  const theme = useTheme()

  return (
    <TouchableOpacity
      style={[style.root, selected && style.selected]}
      {...props}
    >
      <Typography color={selected ? theme.semantics.accent.foreground.default : undefined}>{children}</Typography>
    </TouchableOpacity>
  )
}

export default SegmentedControlItem

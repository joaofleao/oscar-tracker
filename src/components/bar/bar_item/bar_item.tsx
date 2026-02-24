import React from 'react'
import { TouchableOpacity, View } from 'react-native'

import useStyles from './styles'
import { BarItemProps } from './types'
import Typography from '@components/typography'

const Bar = ({ children, icon, ...props }: BarItemProps): React.ReactElement => {
  const style = useStyles()

  return (
    <TouchableOpacity
      style={style.root}
      {...props}
    >
      <Typography title>{children}</Typography>
      {icon && <View style={style.icon}>{icon}</View>}
    </TouchableOpacity>
  )
}

export default Bar

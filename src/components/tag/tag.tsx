import React from 'react'
import { TouchableOpacity } from 'react-native'

import useStyles from './styles'
import { TagProps } from './types'
import { IconProps } from '@components/icon/types'
import Typography from '@components/typography'
import { useTheme } from '@providers/theme'

const Tag = ({ title, icon, onPress, ...props }: TagProps): React.ReactElement => {
  const styles = useStyles()
  const theme = useTheme()

  return (
    <TouchableOpacity
      style={styles.root}
      onPress={onPress}
      {...props}
    >
      {icon &&
        React.cloneElement<IconProps>(icon, {
          color: theme.semantics.container.foreground.light,
          size: 12,
          ...icon.props,
        })}

      {title && <Typography legend>{title}</Typography>}
    </TouchableOpacity>
  )
}

export default Tag

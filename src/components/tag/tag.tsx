import React from 'react'
import { TouchableOpacity } from 'react-native'

import useStyles from './styles'
import { TagProps } from './types'
import { IconProps } from '@components/icon/types'
import Typography from '@components/typography'
import { useTheme } from '@providers/theme'

const Tag = ({ title, icon, onPress, variant = 'container', style, ...props }: TagProps): React.ReactElement => {
  const theme = useTheme()
  const styles = useStyles({ variant })

  return (
    <TouchableOpacity
      style={[styles.root, style]}
      onPress={onPress}
      {...props}
    >
      {icon &&
        React.cloneElement<IconProps>(icon, {
          color: theme.semantics[variant].foreground.default,
          size: 12,
          ...icon.props,
        })}

      {title && (
        <Typography
          color={theme.semantics[variant].foreground.light}
          legend
          style={styles.title}
        >
          {title}
        </Typography>
      )}
    </TouchableOpacity>
  )
}

export default Tag

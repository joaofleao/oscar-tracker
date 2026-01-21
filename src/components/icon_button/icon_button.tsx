import React from 'react'
import { TouchableOpacity } from 'react-native'

import useStyles from './styles'
import { IconButtonProps } from './types'
import { IconProps } from '@components/icon/types'
import Typography from '@components/typography'
import { useTheme } from '@providers/theme'

const IconButton = ({ title, icon, placeholder = false, style, variant = 'container', ...props }: IconButtonProps): React.ReactElement => {
  const styles = useStyles({ variant })
  const theme = useTheme()

  return (
    <TouchableOpacity
      style={[styles.root, placeholder && styles.placeholder, style]}
      {...props}
    >
      {icon &&
        React.cloneElement<IconProps>(icon, {
          color: theme.semantics[variant].foreground.default,
          size: 16,
          ...icon.props,
        })}

      {title && (
        <Typography
          color={theme.semantics[variant].foreground.default}
          style={{ lineHeight: 16, letterSpacing: 1 }}
        >
          {title}
        </Typography>
      )}
    </TouchableOpacity>
  )
}

export default IconButton

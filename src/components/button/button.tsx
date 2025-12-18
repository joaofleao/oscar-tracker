import React from 'react'
import { ActivityIndicator, TouchableOpacity, View } from 'react-native'

import useStyles from './styles'
import { ButtonProps } from './types'
import { IconProps } from '@components/icon/types'
import Typography from '@components/typography'
import { useTheme } from '@providers/theme'

const Button = ({ small = false, variant: variantProp = 'container', title, icon, style, loading = false, ...props }: ButtonProps): React.ReactElement => {
  const isGhost = variantProp === 'ghost'
  const variant = isGhost ? 'container' : variantProp
  const styles = useStyles({ variant })
  const theme = useTheme()

  return (
    <TouchableOpacity
      style={[styles.root, isGhost && styles.ghost, small && styles.small, style]}
      {...props}
    >
      <View style={[styles.content, loading && styles.hide, small && styles.smallContent]}>
        {title && (
          <Typography
            legend={small}
            color={theme.semantics[variant].foreground[isGhost ? 'light' : 'default']}
          >
            {title}
          </Typography>
        )}

        {icon &&
          React.cloneElement<IconProps>(icon, {
            color: theme.semantics[variant].foreground.default,
            size: 16,
          })}
      </View>

      <View style={[styles.loading, !loading && styles.hide]}>
        <ActivityIndicator color={theme.semantics[variant].foreground.default} />
      </View>
    </TouchableOpacity>
  )
}

export default Button

import React from 'react'
import { TouchableOpacity } from 'react-native'

import useStyles from './styles'
import { IconButtonProps } from './types'
import { IconProps } from '@components/icon/types'
import { useTheme } from '@providers/theme'

const IconButton = ({ icon, variant = 'container', ...props }: IconButtonProps): React.ReactElement => {
  const styles = useStyles({ variant })
  const theme = useTheme()

  return (
    <TouchableOpacity
      style={styles.root}
      {...props}
    >
      {React.cloneElement<IconProps>(icon, {
        color: theme.semantics[variant].foreground.default,
        size: 16,
        ...icon.props,
      })}
    </TouchableOpacity>
  )
}

export default IconButton

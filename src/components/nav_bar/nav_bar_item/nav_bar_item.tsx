import React from 'react'
import { TouchableOpacity } from 'react-native'

import useStyles from './styles'
import { NavBarItemProps } from './types'
import { IconProps } from '@components/icon'
import Typography from '@components/typography'
import { useTheme } from '@providers/theme'

const NavBarItem = ({ first = false, last = false, icon, label, selected, style, ...rest }: NavBarItemProps): React.ReactElement => {
  const { semantics } = useTheme()
  const styles = useStyles()

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={[styles.root, first && styles.first, last && styles.last, style]}
      {...rest}
    >
      {React.cloneElement<IconProps>(icon, {
        color: selected ? semantics.accent.base.default : semantics.accent.foreground.light,
        size: 20,
        filled: selected ?? false,
      })}
      {selected && label && <Typography color={semantics.accent.base.default}>{label}</Typography>}
    </TouchableOpacity>
  )
}

export default NavBarItem

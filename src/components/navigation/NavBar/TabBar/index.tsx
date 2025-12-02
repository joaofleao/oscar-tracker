import React from 'react'
import { Pressable, PressableProps } from 'react-native'

import useStyles from './styles'
import { useTheme } from '@providers/theme'

export interface Props extends PressableProps {
  icon: JSX.Element
  selected: boolean
}

const Tab = (props: Props): JSX.Element => {
  const { icon, selected, ...rest } = props
  const { colors } = useTheme()
  const styles = useStyles({ selected })
  return (
    <Pressable
      style={styles.root}
      {...rest}
    >
      {React.cloneElement(icon, {
        width: 24,
        height: 24,
        filled: selected,
        color: selected ? colors.primary.default : colors.primary.shades.shade60,
      })}
    </Pressable>
  )
}

Tab.displayName = 'Tab'

export default Tab

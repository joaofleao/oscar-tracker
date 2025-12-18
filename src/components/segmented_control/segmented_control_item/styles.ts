import { StyleSheet, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  selected: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { semantics } = useTheme()
  return StyleSheet.create({
    root: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 4,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    selected: {
      // backgroundColor: semantics.container.foreground.default,
      borderRadius: 8,
    },
  })
}

export default useStyles

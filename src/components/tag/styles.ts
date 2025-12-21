import { StyleSheet, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { semantics } = useTheme()

  return StyleSheet.create({
    root: {
      position: 'relative',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 8,
      borderWidth: 1,
      backgroundColor: semantics.container.base.default,
      borderColor: semantics.container.stroke.default,
      alignItems: 'center',
      flexDirection: 'row',
      gap: 8,
    },
  })
}

export default useStyles

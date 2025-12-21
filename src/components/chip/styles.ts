import { StyleSheet, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  content: ViewStyle
  root: ViewStyle
  spoiler: ViewStyle
  blur: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { semantics } = useTheme()

  return StyleSheet.create({
    root: {
      position: 'relative',
      borderRadius: 20,
      backgroundColor: semantics.container.base.default,
      borderColor: semantics.container.stroke.default,
      borderWidth: 1,
    },
    content: {
      gap: 8,
      alignItems: 'center',
      flexDirection: 'row',
      paddingVertical: 4,
      paddingHorizontal: 8,
    },
    spoiler: {
      alignItems: 'center',
      justifyContent: 'center',
      position: 'absolute',
      width: '100%',
      height: '100%',
      borderRadius: 20,
      overflow: 'hidden',
    },
    blur: {
      position: 'absolute',
      width: '100%',
      height: '100%',
    },
  })
}

export default useStyles

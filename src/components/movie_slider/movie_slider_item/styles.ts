import { ImageStyle, StyleSheet, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  image: ImageStyle
  content: ViewStyle
  spoiler: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { semantics } = useTheme()

  return StyleSheet.create({
    root: {
      flexDirection: 'row',
      gap: 20,
    },
    image: {
      aspectRatio: 2 / 3,
      borderWidth: 1,
      backgroundColor: semantics.container.base.default,
      borderColor: semantics.container.stroke.default,
    },
    content: {
      justifyContent: 'center',
      gap: 4,
    },
    spoiler: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
  })
}

export default useStyles

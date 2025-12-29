import { ImageStyle, StyleSheet, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  squared: ImageStyle
  spoiler: ViewStyle
  header: ViewStyle
  image: ImageStyle
}

const useStyles = (): StylesReturn => {
  const { semantics } = useTheme()

  return StyleSheet.create({
    root: {
      borderRadius: 16,
      flexDirection: 'row',
      gap: 16,
      backgroundColor: semantics.container.base.default,
      padding: 8,
      borderWidth: 1,
      borderColor: semantics.container.stroke.default,
      alignItems: 'center',
    },
    image: {
      width: 40,
      aspectRatio: 2 / 3,
      borderRadius: 8,
    },
    header: {
      flex: 1,
    },
    squared: {
      aspectRatio: 1 / 1,
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

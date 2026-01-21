import { ImageStyle, StyleSheet, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  squared: ImageStyle
  spoiler: ViewStyle
  imageContainer: ViewStyle
  header: ViewStyle
  image: ImageStyle
  winner: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { semantics } = useTheme()

  return StyleSheet.create({
    root: {
      flexDirection: 'row',

      backgroundColor: semantics.container.base.default,
      borderWidth: 1,
      borderColor: semantics.container.stroke.default,
      alignItems: 'center',
    },
    image: {
      width: 44,
      aspectRatio: 2 / 3,
    },
    winner: {
      position: 'absolute',
      top: -16,
      right: -12,
    },
    imageContainer: {
      borderRightWidth: 1,
      borderColor: semantics.container.stroke.default,
    },
    header: {
      flex: 1,
      paddingHorizontal: 16,
      paddingVertical: 8,
    },

    squared: {
      aspectRatio: 1 / 1,
      flex: 1,
    },
    spoiler: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: semantics.background.base.tint,
    },
  })
}

export default useStyles

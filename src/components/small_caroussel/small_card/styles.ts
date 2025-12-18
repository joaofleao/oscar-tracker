import { ImageStyle, StyleSheet, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
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
      aspectRatio: 1 / 1,
      borderRadius: 8,
    },
  })
}

export default useStyles

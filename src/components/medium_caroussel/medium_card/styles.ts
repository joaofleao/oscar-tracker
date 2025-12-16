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
      borderRadius: 4,
      width: 90,
    },
    image: {
      width: 90,
      aspectRatio: 2 / 3,
      borderRadius: 4,
    },
  })
}

export default useStyles

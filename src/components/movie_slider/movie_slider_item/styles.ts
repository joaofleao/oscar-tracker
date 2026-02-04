import { ImageStyle, StyleSheet, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  image: ImageStyle
  content: ViewStyle
  spoiler: ViewStyle
}
type StylesProps = {
  height?: number
}

const useStyles = ({ height }: StylesProps): StylesReturn => {
  const { semantics } = useTheme()

  return StyleSheet.create({
    root: {
      flexDirection: 'row',
      gap: 20,
    },
    image: {
      height: height ?? 112,
      aspectRatio: 2 / 3,
      borderWidth: 1,
      backgroundColor: semantics.container.base.tint,
      borderColor: semantics.container.stroke.default,
    },
    content: {
      justifyContent: 'center',
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

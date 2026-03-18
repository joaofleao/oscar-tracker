import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  gradient: ViewStyle
  container: ViewStyle
  content: ViewStyle
  root: ViewStyle
  highlight: TextStyle
  big: TextStyle
  medium: TextStyle
  description: TextStyle
}

const useStyles = (): StylesReturn => {
  const { semantics, fonts } = useTheme()

  return StyleSheet.create({
    gradient: {
      position: 'absolute',
      width: 400,
      aspectRatio: 1080 / 1920,
    },
    root: {
      opacity: 0,
      position: 'absolute',
      top: -500,
      width: 400,
      aspectRatio: 1080 / 1920,
    },
    container: {
      width: 400,
      aspectRatio: 1080 / 1920,
      paddingHorizontal: 20,
      paddingBottom: 40,
      paddingTop: 80,
      gap: 20,

      backgroundColor: semantics.background.base.default,
      overflow: 'hidden',
    },
    highlight: {
      color: semantics.accent.base.default,
    },
    content: {
      flex: 1,
      gap: 30,
    },

    big: {
      fontSize: 80,
      height: 80,
      color: semantics.container.foreground.default,
      fontFamily: fonts.primary.black,
    },
    medium: {
      fontSize: 40,
      height: 40,
      color: semantics.container.foreground.default,
      fontFamily: fonts.primary.black,
    },
    description: {
      fontSize: 20,
      height: 20,
      color: semantics.background.foreground.light,
      fontFamily: fonts.tertiary.bold,
      textTransform: 'uppercase',
      letterSpacing: 2,
    },
  })
}

export default useStyles

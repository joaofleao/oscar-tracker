import { StyleSheet, TextStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  title: TextStyle
  description: TextStyle
  subtitle: TextStyle
  big: TextStyle
  medium: TextStyle
  small: TextStyle
  extrasmall: TextStyle
}

type StylesProps = {
  color?: string
}

const useStyles = ({ color }: StylesProps): StylesReturn => {
  const { semantics, fonts } = useTheme()

  return StyleSheet.create({
    title: {
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 1,
      textShadowColor: semantics.container.stroke.default,
      textTransform: 'uppercase',
      fontSize: 50,
      color: semantics.container.foreground.default,
      fontFamily: fonts.quaternary.light,
    },
    subtitle: {
      textShadowOffset: { width: 1.5, height: 1.5 },
      textShadowRadius: 1,
      textShadowColor: semantics.container.stroke.default,

      fontSize: 20,
      lineHeight: 32,
      textTransform: 'uppercase',
      color: color ?? semantics.container.foreground.default,
      fontFamily: fonts.tertiary.bold,
    },

    description: {
      textShadowOffset: { width: 0, height: 0 },
      textShadowRadius: 1,
      color: color ?? semantics.background.foreground.light,
      fontFamily: fonts.tertiary.bold,
      fontSize: 14,
      lineHeight: 24,
      letterSpacing: 2,
      textTransform: 'uppercase',
    },

    big: {
      textShadowOffset: { width: 8, height: 8 },
      textShadowRadius: 1,
      textShadowColor: semantics.container.stroke.default,

      fontSize: 200,
      color: semantics.container.foreground.default,
      fontFamily: fonts.primary.black,
    },
    medium: {
      textShadowOffset: { width: 6, height: 6 },
      textShadowRadius: 1,
      textShadowColor: semantics.container.base.default,

      height: 180,
      fontSize: 156,
      color: semantics.container.foreground.default,
      fontFamily: fonts.primary.black,
    },
    small: {
      textShadowOffset: { width: 4, height: 4 },
      textShadowRadius: 1,
      textShadowColor: semantics.container.base.default,

      height: 100,
      fontSize: 80,
      color: semantics.container.foreground.default,
      fontFamily: fonts.primary.black,
    },
    extrasmall: {
      textShadowOffset: { width: 3, height: 3 },
      textShadowRadius: 1,
      textShadowColor: semantics.container.base.default,
      height: 52,
      fontSize: 40,
      color: semantics.container.foreground.default,
      fontFamily: fonts.primary.black,
    },
  })
}

export default useStyles

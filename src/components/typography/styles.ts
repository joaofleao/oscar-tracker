import { StyleSheet, TextStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  display: TextStyle
  onboardingAccent: TextStyle
  onboarding: TextStyle
  header: TextStyle
  title: TextStyle
  body: TextStyle
  description: TextStyle
  legend: TextStyle
}

type StylesProps = {
  color?: string
}

const useStyles = ({ color }: StylesProps): StylesReturn => {
  const { semantics, fonts } = useTheme()

  return StyleSheet.create({
    display: {
      color: color ?? semantics.background.foreground.default,
      fontFamily: fonts.primary.regular,
      fontSize: 64,
      lineHeight: 88,
      letterSpacing: 1,
      textTransform: 'none',
    },

    onboardingAccent: {
      color: color ?? semantics.background.foreground.default,
      fontFamily: fonts.tertiary.bold,
      fontSize: 24,
      lineHeight: 36,
      letterSpacing: 2,
      textTransform: 'uppercase',
    },

    onboarding: {
      color: color ?? semantics.background.foreground.light,
      fontFamily: fonts.tertiary.bold,
      fontSize: 24,
      lineHeight: 36,
      letterSpacing: 2,
      textTransform: 'uppercase',
    },
    header: {
      color: color ?? semantics.background.foreground.default,
      fontFamily: fonts.tertiary.bold,
      fontSize: 14,
      lineHeight: 24,
      letterSpacing: 2,
      textTransform: 'uppercase',
    },
    title: {
      color: color ?? semantics.background.foreground.default,
      fontFamily: fonts.tertiary.bold,
      fontSize: 12,
      lineHeight: 24,
      letterSpacing: 2,
      textTransform: 'uppercase',
    },
    body: {
      color: color ?? semantics.background.foreground.default,
      fontFamily: fonts.secondary.regular,
      fontSize: 12,
      lineHeight: 24,
      letterSpacing: 1,
      textTransform: 'none',
    },
    description: {
      color: color ?? semantics.background.foreground.light,
      fontFamily: fonts.secondary.regular,
      fontSize: 12,
      lineHeight: 24,
      letterSpacing: 1,
      textTransform: 'none',
    },
    legend: {
      color: color ?? semantics.background.foreground.light,
      fontFamily: fonts.secondary.bold,
      fontSize: 10,
      lineHeight: 16,
      letterSpacing: 1,
      textTransform: 'uppercase',
    },
  })
}

export default useStyles

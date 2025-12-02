import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  container: ViewStyle
  toggle: ViewStyle
  indicator: ViewStyle
  label: TextStyle
}

type StylesProps = {
  selected: boolean
  disabled: boolean
}

const useStyles = ({ selected, disabled }: StylesProps): StylesReturn => {
  const { colors, fonts } = useTheme()

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      gap: 24,
      alignItems: 'center',
    },
    toggle: {
      backgroundColor: colors.background.container,
      borderRadius: 24,
      width: 54,
      height: 30,
      flexDirection: 'row',
    },
    indicator: {
      backgroundColor:
        disabled && selected
          ? colors.primary.shades.shade30
          : disabled && !selected
          ? colors.primary.shades.shade10
          : !disabled && selected
          ? colors.primary.default
          : colors.primary.shades.shade30,
      height: 24,
      width: 24,
      margin: 2,
      borderRadius: 24,
      position: 'absolute',
    },
    label: {
      flex: 1,
      color: colors.text.default,
      fontFamily: fonts.secondary.regular,
      fontSize: 16,
    },
  })
}

export default useStyles

import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  container: ViewStyle
  row: ViewStyle

  input: TextStyle
  inputWithIcon: TextStyle
  inputWithButton: TextStyle
  label: TextStyle
  errorText: TextStyle
  helperContainer: ViewStyle
  icon: ViewStyle
  actionButton: ViewStyle
}
type StylesProps = {
  isFocused: boolean
}

const useStyles = ({ isFocused }: StylesProps): StylesReturn => {
  const { fonts, colors } = useTheme()

  return StyleSheet.create({
    container: {
      gap: 4,
      flex: 1,
    },
    row: {
      flexDirection: 'row',
      gap: 8,
    },
    input: {
      backgroundColor: colors.background.default,
      borderColor: colors.background.container,
      borderWidth: 1,
      borderRadius: 14,
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 12,
      gap: 8,
      flex: 1,
      height: 48,
      color: colors.text.default,
      fontFamily: fonts.secondary.bold,
      fontSize: 16,
    },
    inputWithIcon: {
      // paddingHorizontal + iconSize + gap
      paddingRight: 12 + 16 + 8,
    },
    inputWithButton: {
      // paddingHorizontal + iconSize + gap
      paddingRight: 6 + 36 + 8,
    },
    label: {
      color: isFocused ? colors.primary.default : colors.text.light,
      fontFamily: fonts.secondary.bold,
      fontSize: 12,
      lineHeight: 18,
    },
    helperContainer: {
      zIndex: -200,
    },
    errorText: {
      position: 'absolute',
      right: 0,
      color: colors.negative.default,
      fontFamily: fonts.secondary.bold,
      fontSize: 12,
      lineHeight: 18,
    },
    icon: {
      position: 'absolute',
      right: 14,
      alignSelf: 'center',
      pointerEvents: 'none',
    },
    actionButton: {
      position: 'absolute',
      right: 6,
      alignSelf: 'center',
    },
  })
}

export default useStyles

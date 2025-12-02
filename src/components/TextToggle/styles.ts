import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  container: ViewStyle
  label: TextStyle
}

type StylesProps = {
  selected: boolean
}

const useStyles = ({ selected }: StylesProps): StylesReturn => {
  const { fonts, colors } = useTheme()

  return StyleSheet.create({
    container: {
      backgroundColor: selected ? colors.primary.default : 'transparent',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 12,
      flexDirection: 'row',
      gap: 8,
      padding: 8,
      paddingHorizontal: 12,
      border: `1px solid ${colors.primary.default}`,
    },
    label: {
      color: selected ? colors.text.inverse : colors.primary.default,
      fontFamily: fonts.secondary.bold,
      textAlign: 'center',
      flex: 1,
    },
  })
}

export default useStyles

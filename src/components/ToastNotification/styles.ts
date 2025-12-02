import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  container: ViewStyle
  informations: ViewStyle
  title: TextStyle
  description: TextStyle
}

type StylesProps = {
  isSuccess
}

const useStyles = ({ isSuccess }: StylesProps): StylesReturn => {
  const { fonts, colors } = useTheme()

  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      zIndex: 200,
      position: 'absolute',
      marginHorizontal: 20,
      padding: 16,
      borderRadius: 12,
      backgroundColor: isSuccess ? colors.positive.default : colors.negative.default,
    },
    informations: {
      flex: 1,
      marginHorizontal: 16,
    },
    title: {
      color: colors.text.default,
      fontFamily: fonts.secondary.bold,
      fontSize: 16,
      lineHeight: 24,
    },
    description: {
      color: colors.text.default,
      fontFamily: fonts.secondary.medium,
      fontSize: 14,
      lineHeight: 20,
    },
  })
}

export default useStyles

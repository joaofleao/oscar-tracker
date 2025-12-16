import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  container: ViewStyle
  title: TextStyle
}

type StylesProps = {
  large: boolean
}

const useStyles = ({ large }: StylesProps): StylesReturn => {
  const { fonts, semantics } = useTheme()
  return StyleSheet.create({
    container: {
      width: large ? 158 : 106,
      gap: 8,
    },
    title: {
      fontFamily: fonts.secondary.bold,
      color: semantics.background.foreground.default,
      fontSize: 16,
    },
  })
}

export default useStyles

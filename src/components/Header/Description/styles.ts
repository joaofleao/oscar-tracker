import { StyleSheet, TextStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: TextStyle
}

type StylesProps = {
  align?: 'left' | 'center' | 'right'
  bigHeader?: boolean
}

const useStyles = ({ align, bigHeader }: StylesProps): StylesReturn => {
  const { fonts, colors } = useTheme()

  return StyleSheet.create({
    root: {
      color: colors.text.light,
      fontSize: bigHeader ? 18 : 16,
      lineHeight: 24,
      fontFamily: fonts.secondary.medium,
      textAlign: align,
    },
  })
}

export default useStyles

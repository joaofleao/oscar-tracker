import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  container: ViewStyle
  number: TextStyle
  track: ViewStyle
  progress: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { colors } = useTheme()

  return StyleSheet.create({
    container: {
      alignSelf: 'baseline',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      gap: 8,
    },
    number: {
      color: colors.text.light,
    },
    track: {
      backgroundColor: colors.primary.shades.shade5,
      height: 6,
      borderRadius: 6,
      flex: 1,
      overflow: 'hidden',
    },
    progress: {
      backgroundColor: colors.primary.default,
      width: '200%',
      borderRadius: 6,
      height: '100%',
    },
  })
}

export default useStyles

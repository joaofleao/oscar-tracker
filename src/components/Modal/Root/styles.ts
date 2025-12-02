import { StyleSheet, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  container: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { colors } = useTheme()

  return StyleSheet.create({
    root: {
      backgroundColor: 'rgba(0,0,0,.5)',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 1,
    },
    container: {
      maxHeight: '80%',
      borderRadius: 24,
      backgroundColor: colors.background.container,
      padding: 24,
      width: '90%',
      gap: 16,
    },
  })
}

export default useStyles

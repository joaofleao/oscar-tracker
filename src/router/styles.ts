import { StyleSheet, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  container: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { semantics } = useTheme()
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: semantics.background.base.default,
      overflow: 'visible',
    },
  })
}

export default useStyles

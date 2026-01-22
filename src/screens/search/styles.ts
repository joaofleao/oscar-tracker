import { StyleSheet, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  content: ViewStyle
  empty: ViewStyle
  input: ViewStyle
  header: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { semantics } = useTheme()

  return StyleSheet.create({
    root: {
      overflow: 'visible',
      paddingHorizontal: 20,
    },
    content: {
      gap: 12,
    },
    empty: {
      gap: 12,
      justifyContent: 'center',
      paddingVertical: 20,
    },
    input: {
      flex: 1,
    },
    header: {
      padding: 20,
      gap: 20,
      backgroundColor: semantics.container.base.default,
      width: '100%',
      zIndex: 1,
    },
  })
}

export default useStyles

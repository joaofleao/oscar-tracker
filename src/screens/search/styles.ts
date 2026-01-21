import { StyleSheet, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  content: ViewStyle
  noContent: ViewStyle
  noResults: ViewStyle
  input: ViewStyle
  footer: ViewStyle
  header: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { semantics } = useTheme()
  return StyleSheet.create({
    root: {
      paddingHorizontal: 20,
      overflow: 'visible',
    },
    content: {
      gap: 12,
      justifyContent: 'center',
    },
    noResults: {
      gap: 12,
      justifyContent: 'center',
      paddingBottom: 40,
    },
    noContent: {
      justifyContent: 'center',
      paddingVertical: 40,
    },
    input: {
      flex: 1,
    },
    footer: {
      flexDirection: 'row',
      gap: 8,
      backgroundColor: semantics.container.base.default,
    },
    header: {
      padding: 20,
      backgroundColor: semantics.container.base.default,
      width: '100%',
      zIndex: 1,
    },
  })
}

export default useStyles

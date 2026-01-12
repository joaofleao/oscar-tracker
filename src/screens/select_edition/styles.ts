import { StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  list: ViewStyle
  listContainer: ViewStyle
  header: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { semantics } = useTheme()
  const { bottom } = useSafeAreaInsets()
  return StyleSheet.create({
    list: {
      padding: 20,
      flex: 1,
    },
    listContainer: {
      gap: 12,
      marginTop: 56,
      paddingBottom: bottom + 20,
    },
    header: {
      padding: 20,
      position: 'absolute',

      backgroundColor: semantics.container.base.default,
      width: '100%',
      top: 0,
    },
  })
}

export default useStyles

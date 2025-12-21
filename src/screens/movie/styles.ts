import { ImageStyle, StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  header: ViewStyle
  content: ViewStyle

  footer: ViewStyle
  section: ViewStyle
  main: ViewStyle
  datepicker: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { bottom, right, left, top } = useSafeAreaInsets()

  return StyleSheet.create({
    root: {
      paddingBottom: bottom + 20,
      paddingTop: top + 20,
      paddingRight: right + 20,
      paddingLeft: left + 20,
      gap: 16,
    },
    section: {
      gap: 8,
    },

    header: {
      position: 'absolute',
      top: top + 20,
      right: right + 20,
      left: left + 20,

      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',

      gap: 16,
    },
    content: {
      gap: 16,
    },
    main: {
      gap: 24,
      alignItems: 'center',
    },

    footer: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 12,
    },
    datepicker: {
      alignSelf: 'center',
    },
  })
}

export default useStyles

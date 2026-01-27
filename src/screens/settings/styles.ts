import { StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type StylesReturn = {
  root: ViewStyle
  header: ViewStyle

  footer: ViewStyle
  section: ViewStyle
  hide: ViewStyle
  avatarButtons: ViewStyle
  avatarContainer: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { bottom, right, left, top } = useSafeAreaInsets()

  return StyleSheet.create({
    root: {
      paddingBottom: bottom + 20,
      paddingTop: top + 20,
      paddingRight: right + 20,
      paddingLeft: left + 20,
      justifyContent: 'center',
      gap: 32,
    },
    section: {
      gap: 8,
    },
    avatarButtons: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    avatarContainer: {
      alignItems: 'center',
      gap: 16,
      justifyContent: 'space-between',
    },

    header: {
      justifyContent: 'space-between',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 16,
    },

    hide: {
      opacity: 0,
    },

    footer: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 12,
    },
  })
}

export default useStyles

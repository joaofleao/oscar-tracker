import { Platform, StyleSheet, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

type StylesReturn = {
  root: ViewStyle
  content: ViewStyle
  header: ViewStyle

  footer: ViewStyle
  section: ViewStyle

  avatarButtons: ViewStyle
  avatarContainer: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { bottom, right, left, top } = useSafeAreaInsets()

  return StyleSheet.create({
    root: {
      // overflow: 'visible',
      paddingBottom: bottom + 20,
      paddingRight: right + 20,
      paddingLeft: left + 20,
    },
    content: {
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
      marginTop: Platform.OS === 'android' ? 20 + top : 0,
      alignItems: 'center',
      padding: 20,
    },

    footer: {
      justifyContent: 'center',
      alignItems: 'center',
      gap: 12,
    },
  })
}

export default useStyles

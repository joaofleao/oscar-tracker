import { StyleSheet, ViewStyle } from 'react-native'

type StylesReturn = {
  footer: ViewStyle
  section: ViewStyle

  avatarButtons: ViewStyle
  avatarContainer: ViewStyle
}

const useStyles = (): StylesReturn => {
  return StyleSheet.create({
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

    footer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 12,
    },
  })
}

export default useStyles

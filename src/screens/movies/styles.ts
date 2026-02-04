import { StyleSheet, ViewStyle } from 'react-native'

type StylesReturn = {
  bottomArea: ViewStyle
  empty: ViewStyle
  friendsList: ViewStyle
}

const useStyles = (): StylesReturn => {
  return StyleSheet.create({
    bottomArea: {
      gap: 8,
    },
    friendsList: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
    empty: {
      paddingTop: 42,
    },
  })
}

export default useStyles

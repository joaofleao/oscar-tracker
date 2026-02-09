import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

type StylesReturn = {
  bottomArea: ViewStyle
  friendsList: ViewStyle
  title: TextStyle
}

const useStyles = (): StylesReturn => {
  return StyleSheet.create({
    bottomArea: {
      gap: 8,
      marginLeft: -20,
      marginRight: -40,
    },
    title: {
      paddingLeft: 20,
      paddingRight: 40,
    },
    friendsList: {
      paddingLeft: 20,
      paddingRight: 40,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },
  })
}

export default useStyles

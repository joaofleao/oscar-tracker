import { StyleSheet, ViewStyle } from 'react-native'

type StylesReturn = {
  root: ViewStyle
  selected: ViewStyle
}

const useStyles = (): StylesReturn => {
  return StyleSheet.create({
    root: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 4,
      paddingHorizontal: 20,
      borderRadius: 8,
    },
    selected: {
      backgroundColor: 'white',
      borderRadius: 8,
    },
  })
}

export default useStyles

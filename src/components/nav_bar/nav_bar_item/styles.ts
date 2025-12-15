import { StyleSheet, ViewStyle } from 'react-native'

type StylesReturn = {
  root: ViewStyle
  last: ViewStyle
  first: ViewStyle
}

const useStyles = (): StylesReturn => {
  return StyleSheet.create({
    root: {
      padding: 12,
      alignSelf: 'center',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
    },
    first: {
      paddingStart: 16,
    },
    last: {
      paddingEnd: 16,
    },
  })
}

export default useStyles

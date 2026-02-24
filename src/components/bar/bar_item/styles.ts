import { StyleSheet, ViewStyle } from 'react-native'

type StylesReturn = {
  root: ViewStyle
  icon: ViewStyle
}

const useStyles = (): StylesReturn => {
  return StyleSheet.create({
    root: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    icon: {},
  })
}

export default useStyles

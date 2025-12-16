import { StyleSheet, ViewStyle } from 'react-native'

type StylesReturn = {
  row: ViewStyle
  wrap: ViewStyle
}

const useStyles = (): StylesReturn => {
  return StyleSheet.create({
    row: {
      flexDirection: 'row',
      gap: 8,
      maxWidth: '100%',
    },
    wrap: {
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
    },
  })
}

export default useStyles

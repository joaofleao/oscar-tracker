import { StyleSheet, ViewStyle } from 'react-native'

type StylesReturn = {
  content: ViewStyle
  list: ViewStyle
  input: ViewStyle
  datepicker: ViewStyle
  calendarFooter: ViewStyle
  footer: ViewStyle
}

const useStyles = (): StylesReturn => {
  return StyleSheet.create({
    datepicker: {
      alignSelf: 'center',
    },
    content: {
      alignItems: 'center',
      justifyContent: 'center',
      margin: 10,
      paddingTop: 10,
    },
    list: {
      padding: 20,
    },
    input: {
      flex: 1,
    },
    footer: {
      flexDirection: 'row',
      gap: 8,
      marginBottom: 16,
    },
    calendarFooter: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 8,
    },
  })
}

export default useStyles

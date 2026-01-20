import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  header: ViewStyle
  button: ViewStyle
  content: ViewStyle
  trailing: ViewStyle
  title: TextStyle
}

const useStyles = (): StylesReturn => {
  const { semantics } = useTheme()

  return StyleSheet.create({
    root: {
      width: '100%',
      position: 'relative',
      paddingHorizontal: 16,
      paddingTop: 8,
      borderWidth: 1,
      backgroundColor: semantics.container.base.default,
      borderColor: semantics.container.stroke.default,
      overflow: 'hidden',
    },
    header: {
      flexDirection: 'row',
      gap: 8,
      alignItems: 'flex-start',
    },
    title: {
      flex: 1,
    },
    button: {},
    content: {
      paddingTop: 8,
    },
    trailing: {
      alignItems: 'center',
      flexDirection: 'row',
      gap: 4,
    },
  })
}

export default useStyles

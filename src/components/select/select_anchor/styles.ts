import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  container: ViewStyle
  content: TextStyle
  placeholder: TextStyle
  item: TextStyle
  itemDisabled: TextStyle
}

const useStyles = (): StylesReturn => {
  const { semantics, fonts } = useTheme()

  return StyleSheet.create({
    container: {
      gap: 4,
      width: '100%',
    },
    content: {
      backgroundColor: semantics.container.base.tint,
      borderColor: semantics.container.stroke.default,
      borderWidth: 1,
      borderRadius: 8,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 8,
      paddingRight: 14,
      paddingLeft: 14,
      height: 44,
    },
    placeholder: {
      flex: 1,
      color: semantics.container.foreground.light,
      fontFamily: fonts.tertiary.bold,
      fontSize: 16,
    },
    item: {
      flex: 1,
      color: semantics.container.foreground.default,
      fontFamily: fonts.tertiary.bold,
      fontSize: 16,
      lineHeight: 24,
    },
    itemDisabled: {
      color: semantics.container.foreground.light,
    },
  })
}

export default useStyles

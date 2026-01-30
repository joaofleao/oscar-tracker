import { Dimensions, StyleSheet, TextStyle, ViewStyle } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  container: ViewStyle
  content: TextStyle
  placeholder: TextStyle
  dropdown: ViewStyle
  overlay: ViewStyle
  itemContainer: ViewStyle
  selectedItemContainer: ViewStyle
  separator: ViewStyle
  item: TextStyle
  itemSelected: TextStyle
  itemDisabled: TextStyle
}

const useStyles = (): StylesReturn => {
  const { semantics, fonts } = useTheme()

  const window = Dimensions.get('window')
  const insets = useSafeAreaInsets()

  return StyleSheet.create({
    container: {
      gap: 4,
      width: '100%',
    },
    placeholder: {
      flex: 1,
      color: semantics.container.foreground.light,
      fontFamily: fonts.tertiary.bold,
      fontSize: 16,
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
    dropdown: {
      gap: 8,
      maxHeight: window.height / 2,
      bottom: insets.bottom + 20,
      alignSelf: 'center',
      width: window.width - 40,
      padding: 16,
      position: 'absolute',
      borderRadius: 12,
      backgroundColor: semantics.container.base.original,
      borderColor: semantics.container.stroke.default,
      borderWidth: 1,
    },
    overlay: {
      position: 'absolute',
      backgroundColor: semantics.background.base.tint,
      width: '100%',
      height: '100%',
    },
    itemContainer: {
      borderRadius: 14,

      paddingHorizontal: 10,
      paddingVertical: 10,
      height: 44,

      backgroundColor: semantics.container.base.original,
      borderColor: semantics.container.stroke.default,
      borderWidth: 1,
    },

    selectedItemContainer: {
      backgroundColor: semantics.container.base.tint,
    },
    separator: {
      height: 8,
    },
    item: {
      flex: 1,

      color: semantics.container.foreground.default,
      fontFamily: fonts.tertiary.bold,
      fontSize: 16,
      lineHeight: 24,
    },
    itemSelected: {
      backgroundColor: semantics.accent.foreground.default,
    },
    itemDisabled: {
      color: semantics.container.foreground.light,
    },
  })
}

export default useStyles

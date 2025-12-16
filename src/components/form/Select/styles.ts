import { Dimensions, TextStyle } from 'react-native'
import { StyleSheet, ViewStyle } from 'react-native'
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
  disabledItemContainer: ViewStyle
  separator: ViewStyle
  item: TextStyle
  itemSelected: TextStyle
  itemDisabled: TextStyle
}

type StylesProps = {
  small: boolean
  disabled: boolean
}

const useStyles = ({ small, disabled }: StylesProps): StylesReturn => {
  const { colors, fonts } = useTheme()

  const window = Dimensions.get('window')
  const insets = useSafeAreaInsets()

  return StyleSheet.create({
    container: {
      gap: 4,
    },
    content: {
      backgroundColor: colors.background.default,
      borderWidth: 1,
      borderColor: colors.background.container,
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
      borderRadius: 12,

      padding: small ? 3 : 12,

      paddingLeft: 14,
    },
    item: {
      flexGrow: 1,

      color: colors.text.default,

      fontFamily: fonts.secondary.regular,
      fontSize: 16,
      lineHeight: 24,
      height: 24,
    },
    itemDisabled: {
      color: colors.text.light,
    },
    placeholder: {
      flex: 1,
      color: disabled ? colors.text.light : colors.text.default,
      fontFamily: fonts.secondary.regular,
      fontSize: 16,
    },
    dropdown: {
      gap: 8,
      maxHeight: window.height / 2,
      bottom: insets.bottom,
      left: 20,
      right: 20,

      alignSelf: 'center',
      padding: 16,
      position: 'absolute',
      borderRadius: 12,
      backgroundColor: colors.background.default,
    },
    overlay: {
      position: 'absolute',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      width: '100%',
      height: '100%',
    },
    itemContainer: {
      borderRadius: 14,
      backgroundColor: colors.background.container,
      paddingHorizontal: 10,
      paddingVertical: 10,
      height: 44,
    },
    selectedItemContainer: {
      backgroundColor: colors.primary.default,
    },
    disabledItemContainer: {
      backgroundColor: colors.background.disabled,
    },
    separator: {
      height: 8,
    },
    itemSelected: {
      color: colors.text.inverse,
      fontFamily: fonts.secondary.bold,
    },
  })
}

export default useStyles

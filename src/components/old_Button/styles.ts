import { StyleSheet, TextStyle, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'

type StylesReturn = {
  root: ViewStyle
  label: TextStyle
  content: ViewStyle
  loadingContent: ViewStyle
}

type StylesProps = {
  variant?: 'primary' | 'secondary' | 'tertiary' | 'outlined' | 'text'
  icon: boolean
  size?: 'action' | 'default'
  width: 'fit' | 'fixed' | 'full' | 'fill'
  loading: boolean
}

const useStyles = ({ variant, size, icon, width, loading }: StylesProps): StylesReturn => {
  const { colors, fonts } = useTheme()

  const getBackgroundColor = (): string => {
    if (variant === 'primary') return colors.primary.default
    if (variant === 'tertiary') return colors.background.container
    if (variant === 'secondary') return colors.primary.shades.shade5
    return 'transparent'
  }

  const getHorizontalPadding = (): number => {
    if (size === 'action') return 8
    if (icon) return 10
    return 24
  }

  const getVerticalPadding = (): number => {
    if (size === 'action') return 8
    if (icon) return 10
    return 12
  }

  const getBorderRadius = (): number => {
    if (size === 'action' || icon) return 12
    return 16
  }

  const getContentColor = (): string => {
    if (variant === 'primary') return colors.text.inverse
    return colors.primary.default
  }

  return StyleSheet.create({
    root: {
      backgroundColor: getBackgroundColor(),
      paddingVertical: getVerticalPadding(),
      paddingHorizontal: getHorizontalPadding(),
      borderRadius: getBorderRadius(),
      borderWidth: 1,
      borderColor: variant === 'outlined' ? colors.primary.default : 'transparent',
      justifyContent: 'center',
      alignItems: 'center',
      width: width === 'fixed' ? 256 : width === 'fill' ? '100%' : 'auto',
      flex: width === 'full' ? 1 : null,
    },
    label: {
      textTransform: 'uppercase',
      fontFamily: fonts.tertiary.bold,
      fontSize: size === 'action' ? 12 : 16,
      lineHeight: size === 'action' ? 18 : 20,
      color: getContentColor(),
      textAlign: 'center',
    },
    content: {
      opacity: loading ? 0 : 1,
      flexDirection: 'row',
      gap: 12,
    },
    loadingContent: {
      opacity: loading ? 1 : 0,
      position: 'absolute',
    },
  })
}

export default useStyles

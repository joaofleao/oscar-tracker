import { TextStyle, ViewStyle } from 'react-native'

import { CoachmarkProps } from './types'
import { useTheme } from '@providers/theme'

type StylesProps = {
  visible: CoachmarkProps['visible']
}

type StylesReturn = {
  root: ViewStyle
  title: TextStyle
  description: TextStyle
  footer: ViewStyle
  arrow: ViewStyle
}

const useStyles = (props: StylesProps): StylesReturn => {
  const { colors, fonts } = useTheme()

  return {
    arrow: {
      backgroundColor: colors.background.container,
      width: 20,
      height: 20,
      position: 'absolute',
      right: 4,
      transform: [{ rotate: '45deg' }],
      top: -10,
    },
    root: {
      position: 'absolute',
      maxWidth: '50%',
      backgroundColor: colors.background.container,
      borderRadius: 16,
      gap: 10,
      padding: 20,
      display: props.visible ? 'flex' : 'none',
    },
    title: {
      color: colors.background.foreground,
      fontFamily: fonts.secondary.bold,
      fontSize: 20,
    },
    description: {
      fontFamily: fonts.secondary.regular,
      color: colors.background.foreground,
      fontSize: 16,
    },
    footer: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 10,
    },
  }
}

export default useStyles

import { StyleSheet, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'
import useScreenInsets from '@hooks/useScreenInsets'

type StylesReturn = {
  screen: ViewStyle
}
type StylesProps = {
  isTabScreen: boolean
}

const useStyles = ({ isTabScreen }: StylesProps): StylesReturn => {
  const { colors } = useTheme()
  const { top, bottom } = useScreenInsets()

  return StyleSheet.create({
    screen: {
      paddingTop: isTabScreen ? 0 : top,
      paddingBottom: isTabScreen ? 0 : bottom,
      backgroundColor: colors.background.default,
      flex: 1,
      position: 'relative',
    },
  })
}

export default useStyles

import { StyleSheet, ViewStyle } from 'react-native'

import useScreenInsets from '@hooks/useScreenInsets'
import { useTheme } from '@providers/theme'

type StylesReturn = {
  screen: ViewStyle
}
type StylesProps = {
  isTabScreen: boolean
}

const useStyles = ({ isTabScreen }: StylesProps): StylesReturn => {
  const { semantics } = useTheme()
  const { top, bottom } = useScreenInsets()

  return StyleSheet.create({
    screen: {
      paddingTop: isTabScreen ? 0 : top,
      paddingBottom: isTabScreen ? 0 : bottom,
      backgroundColor: semantics.background.base.default,
      flex: 1,
      position: 'relative',
    },
  })
}

export default useStyles

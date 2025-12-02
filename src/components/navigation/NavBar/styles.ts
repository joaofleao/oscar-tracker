import { StyleSheet, ViewStyle } from 'react-native'

import { useTheme } from '@providers/theme'
import useScreenInsets from '@hooks/useScreenInsets'

type StylesReturn = {
  container: ViewStyle
  footer: ViewStyle
  selector: ViewStyle
  background: ViewStyle
  progressContainer: ViewStyle
}

const useStyles = (): StylesReturn => {
  const { colors } = useTheme()

  const { bottom } = useScreenInsets()
  return StyleSheet.create({
    footer: {
      bottom: bottom,
      position: 'absolute',
      gap: 12,
      paddingHorizontal: 40,
      width: '100%',
      alignItems: 'center',
    },
    container: {
      backgroundColor: colors.background.container,
      borderRadius: 100,
      flexDirection: 'row',
    },
    selector: {
      position: 'absolute',
      width: 80,
      height: 60,
    },
    background: {
      width: 12,
      height: 4,
      borderRadius: 12,
      position: 'absolute',
      alignSelf: 'center',
      bottom: 12,
      backgroundColor: colors.primary.default,
    },
    progressContainer: {
      backgroundColor: colors.background.container,
      padding: 16,

      borderRadius: 48,
      alignSelf: 'center',
    },
  })
}

export default useStyles

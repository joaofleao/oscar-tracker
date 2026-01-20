import { TextStyle } from 'react-native'
import Animated from 'react-native-reanimated'

import useStyles from './styles'
import { TypographyProps } from './types'

const Typography = ({ style, display = false, onboardingAccent = false, onboarding = false, header = false, title = true, body = false, description = false, legend = false, color, center = false, auto = false, left = false, right = false, justify = false, ...props }: TypographyProps): React.ReactElement => {
  const styles = useStyles({ color })

  const getTextAlign = (): TextStyle['textAlign'] => {
    if (center) return 'center'
    if (auto) return 'auto'
    if (left) return 'left'
    if (right) return 'right'
    if (justify) return 'justify'
  }

  return (
    <Animated.Text
      style={[title && styles.title, display && styles.display, onboardingAccent && styles.onboardingAccent, onboarding && styles.onboarding, header && styles.header, body && styles.body, description && styles.description, legend && styles.legend, { textAlign: getTextAlign() }, style]}
      {...props}
    />
  )
}

export default Typography

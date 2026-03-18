import { TextStyle } from 'react-native'
import Animated from 'react-native-reanimated'

import useStyles from './styles'
import { MegaTypographyProps } from './types'

const MegaTypography = ({ style, color, center, auto, left, right, justify, title, description, subtitle, big, medium, small, extrasmall, ...props }: MegaTypographyProps): React.ReactElement => {
  const styles = useStyles({ color })

  const getTextAlign = (): TextStyle['textAlign'] => {
    if (auto) return 'auto'
    if (left) return 'left'
    if (right) return 'right'
    if (justify) return 'justify'
    return 'center'
  }
  const textStyle = [styles.title, description && styles.description, subtitle && styles.subtitle, big && styles.big, medium && styles.medium, small && styles.small, extrasmall && styles.extrasmall, { textAlign: getTextAlign() }, style]

  return (
    <Animated.Text
      allowFontScaling={false}
      style={textStyle}
      {...props}
    />
  )
}

export default MegaTypography

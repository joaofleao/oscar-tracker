import Svg, { Path } from 'react-native-svg'

import { IconProps } from '../types'
import { useTheme } from '@providers/theme'

const Icon = ({ orientation = 'default', style, size = 24, color: colorProp, ...rest }: IconProps): React.ReactElement => {
  const theme = useTheme()
  const scale = size / 24

  const rotations = {
    default: 0,
    right: 90,
    down: 180,
    left: 270,
    up: 360,
  }

  const color = colorProp || theme.semantics.background.foreground.default
  return (
    <Svg
      style={[{ transform: [{ rotate: `${rotations[orientation]}deg` }] }, style]}
      fill="none"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      {...rest}
    >
      <Path
        d="M14.293 8.29297C14.6835 7.90245 15.3165 7.90245 15.707 8.29297C16.0976 8.68349 16.0976 9.31651 15.707 9.70703L13.4141 12L15.707 14.293C16.0976 14.6835 16.0976 15.3165 15.707 15.707C15.3165 16.0976 14.6835 16.0976 14.293 15.707L12 13.4141L9.70703 15.707C9.31651 16.0976 8.68349 16.0976 8.29297 15.707C7.90245 15.3165 7.90245 14.6835 8.29297 14.293L10.5859 12L8.29297 9.70703C7.90245 9.31651 7.90245 8.68349 8.29297 8.29297C8.68349 7.90245 9.31651 7.90245 9.70703 8.29297L12 10.5859L14.293 8.29297Z"
        scale={scale}
        fill={color}
      />
    </Svg>
  )
}

export default Icon

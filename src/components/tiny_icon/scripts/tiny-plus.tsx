import Svg, { Path } from 'react-native-svg'

import { IconProps } from '../types'
import { useTheme } from '@providers/theme'

const Icon = ({ orientation = 'default', style, size = 24, color: colorProp, ...rest }: IconProps): React.ReactElement => {
  const theme = useTheme()
  const scale = size / 24
  const color = colorProp || theme.semantics.background.foreground.default
  const rotations = {
    default: 0,
    right: 90,
    down: 180,
    left: 270,
    up: 360,
  }

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
        d="M11 8C11 7.44772 11.4477 7 12 7C12.5523 7 13 7.44772 13 8V11H16C16.5523 11 17 11.4477 17 12C17 12.5523 16.5523 13 16 13H13V16C13 16.5523 12.5523 17 12 17C11.4477 17 11 16.5523 11 16V13H8C7.44772 13 7 12.5523 7 12C7 11.4477 7.44772 11 8 11H11V8Z"
        scale={scale}
        fill={color}
      />
    </Svg>
  )
}

export default Icon

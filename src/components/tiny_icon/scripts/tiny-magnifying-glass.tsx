import Svg, { Path } from 'react-native-svg'

import { IconProps } from '../types'
import { useTheme } from '@providers/theme'

const Icon = ({
  orientation = 'default',
  style,
  size = 24,
  color: colorProp,
  ...rest
}: IconProps): React.ReactElement => {
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
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M16.707 15.293C17.0976 15.6835 17.0976 16.3165 16.707 16.707C16.3165 17.0976 15.6835 17.0976 15.293 16.707L13.0321 14.4461C12.4365 14.798 11.7418 15 11 15C8.79086 15 7 13.2091 7 11C7 8.79086 8.79086 7 11 7C13.2091 7 15 8.79086 15 11C15 11.7418 14.798 12.4365 14.4461 13.0321L16.707 15.293ZM11 9C12.1046 9 13 9.89543 13 11C13 12.1046 12.1046 13 11 13C9.89543 13 9 12.1046 9 11C9 9.89543 9.89543 9 11 9Z"
        scale={scale}
        fill={color}
      />
    </Svg>
  )
}

export default Icon

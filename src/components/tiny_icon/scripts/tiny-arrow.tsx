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
        d="M11.2614 8.30317C11.4573 8.10905 11.723 8 12 8C12.277 8 12.5427 8.10905 12.7386 8.30317L15.6941 11.2325C15.8402 11.3773 15.9397 11.5619 15.98 11.7628C16.0202 11.9638 15.9995 12.172 15.9203 12.3612C15.8411 12.5505 15.7071 12.7122 15.5352 12.8259C15.3632 12.9396 15.1611 13.0002 14.9545 13L13 13L13 15C13 15.5523 12.5523 16 12 16C11.4477 16 11 15.5523 11 15V13H9.04554C8.83886 13.0002 8.63677 12.9396 8.46485 12.8259C8.29293 12.7122 8.1589 12.5505 8.07971 12.3612C8.00053 12.172 7.97975 11.9638 8.02001 11.7629C8.06027 11.5619 8.15976 11.3773 8.30588 11.2325L11.2614 8.30317Z"
        fill={color}
        scale={scale}
      />
    </Svg>
  )
}

export default Icon

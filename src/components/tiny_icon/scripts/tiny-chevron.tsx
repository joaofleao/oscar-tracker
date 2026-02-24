import Svg, { Path } from 'react-native-svg'

import { IconProps } from '../types'
import { useTheme } from '@providers/theme'

const Icon = ({ orientation = 'default', size = 24, color: colorProp, style, ...rest }: IconProps): React.ReactElement => {
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
        fillRule="evenodd"
        clipRule="evenodd"
        d="M11.2614 9.2835C11.4573 9.08765 11.723 8.97762 12 8.97762C12.277 8.97762 12.5427 9.08765 12.7386 9.2835L15.6941 12.239C15.8402 12.3852 15.9397 12.5714 15.98 12.7741C16.0202 12.9768 15.9995 13.187 15.9203 13.3779C15.8411 13.5688 15.7071 13.7319 15.5352 13.8466C15.3632 13.9614 15.1611 14.0225 14.9545 14.0223L9.04554 14.0223C8.83886 14.0225 8.63677 13.9614 8.46485 13.8466C8.29293 13.7319 8.1589 13.5688 8.07971 13.3779C8.00053 13.187 7.97975 12.9768 8.02001 12.7741C8.06027 12.5714 8.15976 12.3852 8.30588 12.239L11.2614 9.2835Z"
        fill={color}
        scale={scale}
      />
    </Svg>
  )
}

export default Icon

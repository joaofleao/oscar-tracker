import Svg, { Path } from 'react-native-svg'

import { IconProps } from '../types'
import { useTheme } from '@providers/theme'

const Icon = ({ orientation = 'default', style, size = 24, color: colorProp, filled = false, ...rest }: IconProps): React.ReactElement => {
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
        d="M16.2289 8.79567C15.9846 8.54342 15.6944 8.34331 15.3751 8.20679C15.0558 8.07027 14.7136 8 14.3679 8C14.0223 8 13.6801 8.07027 13.3607 8.20679C13.0414 8.34331 12.7513 8.54342 12.507 8.79567L11.9999 9.31893L11.4928 8.79567C10.9992 8.28638 10.3298 8.00026 9.6318 8.00026C8.93381 8.00026 8.2644 8.28638 7.77084 8.79567C7.27728 9.30495 7 9.99569 7 10.7159C7 11.4362 7.27728 12.1269 7.77084 12.6362L8.27794 13.1595L11.9999 17L15.7218 13.1595L16.2289 12.6362C16.4734 12.3841 16.6673 12.0847 16.7996 11.7552C16.9319 11.4257 17 11.0726 17 10.7159C17 10.3593 16.9319 10.0061 16.7996 9.67664C16.6673 9.34716 16.4734 9.0478 16.2289 8.79567Z"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        scale={scale}
        stroke={color}
        fill={filled ? color : undefined}
      />
    </Svg>
  )
}

export default Icon

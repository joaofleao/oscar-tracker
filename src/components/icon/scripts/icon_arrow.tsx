import Svg, { Path } from 'react-native-svg'

import { IconProps } from '../types'
import { useTheme } from '@providers/theme'

const Icon = ({ size = 24, color: colorProp, ...rest }: IconProps): React.ReactElement => {
  const theme = useTheme()
  const scale = size / 24

  const color = colorProp || theme.semantics.background.foreground.default
  return (
    <Svg
      fill="none"
      width={size}
      height={size}
      viewBox={`0 0 ${size} ${size}`}
      {...rest}
    >
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.7386 15.7165C12.5427 15.9124 12.277 16.0224 12 16.0224C11.723 16.0224 11.4573 15.9124 11.2614 15.7165L8.30588 12.761C8.15976 12.6148 8.06027 12.4286 8.02001 12.2259C7.97975 12.0232 8.00053 11.813 8.07971 11.6221C8.1589 11.4312 8.29293 11.2681 8.46485 11.1534C8.63677 11.0386 8.83886 10.9775 9.04554 10.9777H14.9545C15.1611 10.9775 15.3632 11.0386 15.5352 11.1534C15.7071 11.2681 15.8411 11.4312 15.9203 11.6221C15.9995 11.813 16.0202 12.0232 15.98 12.2259C15.9397 12.4286 15.8402 12.6148 15.6941 12.761L12.7386 15.7165Z"
        fill={color}
        scale={scale}
      />
      <Path
        d="M12 13V8.5"
        strokeWidth="2"
        strokeLinecap="round"
        stroke={color}
        scale={scale}
      />
    </Svg>
  )
}

export default Icon

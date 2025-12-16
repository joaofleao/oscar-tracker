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
        scale={scale}
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.7386 14.7165C12.5427 14.9124 12.277 15.0224 12 15.0224C11.723 15.0224 11.4573 14.9124 11.2614 14.7165L8.30588 11.761C8.15976 11.6148 8.06027 11.4286 8.02001 11.2259C7.97975 11.0232 8.00053 10.813 8.07971 10.6221C8.1589 10.4312 8.29293 10.2681 8.46485 10.1534C8.63677 10.0386 8.83886 9.9775 9.04554 9.97766H14.9545C15.1611 9.9775 15.3632 10.0386 15.5352 10.1534C15.7071 10.2681 15.8411 10.4312 15.9203 10.6221C15.9995 10.813 16.0202 11.0232 15.98 11.2259C15.9397 11.4286 15.8402 11.6148 15.6941 11.761L12.7386 14.7165Z"
        fill={color}
      />
    </Svg>
  )
}

export default Icon

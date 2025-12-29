import Svg, { Path } from 'react-native-svg'

import { IconProps } from '../types'
import { useTheme } from '@providers/theme'

const Icon = ({ style, orientation = 'default', size = 24, color: colorProp, ...rest }: IconProps): React.ReactElement => {
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
        d="M15.2627 8.32422C15.6359 7.91711 16.2687 7.88955 16.6758 8.2627C17.0829 8.63587 17.1104 9.26866 16.7373 9.67578L11.2373 15.6758C11.0479 15.8824 10.7803 16 10.5 16C10.2197 16 9.9521 15.8824 9.76269 15.6758L7.26269 12.9482C6.88968 12.5411 6.91716 11.9083 7.32422 11.5352C7.73131 11.1622 8.36415 11.1897 8.7373 11.5967L10.5 13.5195L15.2627 8.32422Z"
        scale={scale}
        fill={color}
      />
    </Svg>
  )
}

export default Icon

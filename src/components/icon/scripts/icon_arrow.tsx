import Svg, { Path } from 'react-native-svg'

import { IconProps } from '../types'
import { useTheme } from '@providers/theme'

const Icon = ({ size = 24, color: colorProp, orientation = 'default', style, ...rest }: IconProps): React.ReactElement => {
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
        scale={scale}
        d="M13.5001 8.12223L16.5961 11.2172C16.8774 11.4986 17.2589 11.6568 17.6567 11.6569C18.0546 11.6569 18.4362 11.499 18.7176 11.2177C18.999 10.9365 19.1571 10.5549 19.1572 10.1571C19.1573 9.75922 18.9994 9.37762 18.7181 9.09623L13.0611 3.43923C12.9218 3.29984 12.7564 3.18926 12.5743 3.11382C12.3923 3.03838 12.1972 2.99955 12.0001 2.99955C11.803 2.99955 11.6079 3.03838 11.4259 3.11382C11.2438 3.18926 11.0784 3.29984 10.9391 3.43923L5.2821 9.09523C5.14277 9.23456 5.03224 9.39997 4.95684 9.58202C4.88143 9.76406 4.84262 9.95918 4.84262 10.1562C4.84262 10.3533 4.88143 10.5484 4.95684 10.7304C5.03224 10.9125 5.14277 11.0779 5.2821 11.2172C5.42143 11.3566 5.58684 11.4671 5.76889 11.5425C5.95094 11.6179 6.14605 11.6567 6.3431 11.6567C6.54015 11.6567 6.73526 11.6179 6.91731 11.5425C7.09936 11.4671 7.26477 11.3566 7.4041 11.2172L10.5001 8.12223L10.5001 19.6572C10.5001 20.0551 10.6581 20.4366 10.9394 20.7179C11.2207 20.9992 11.6023 21.1572 12.0001 21.1572C12.3979 21.1572 12.7795 20.9992 13.0608 20.7179C13.3421 20.4366 13.5001 20.0551 13.5001 19.6572L13.5001 8.12223Z"
        fill={color}
      />
    </Svg>
  )
}

export default Icon

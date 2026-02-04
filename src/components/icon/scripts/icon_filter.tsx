import Svg, { ClipPath, Defs, G, Path, Rect } from 'react-native-svg'

import { IconProps } from '../types'
import { useTheme } from '@providers/theme'

const Icon = ({ filled = false, size = 24, color: colorProp, ...rest }: IconProps): React.ReactElement => {
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
      <G clipPath="url(#clip0_167_2)">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M3 4.5C3 4.10218 3.15804 3.72064 3.43934 3.43934C3.72064 3.15804 4.10218 3 4.5 3H19.5C19.8978 3 20.2794 3.15804 20.5607 3.43934C20.842 3.72064 21 4.10218 21 4.5V6.586C20.9999 7.11639 20.7891 7.62501 20.414 8L15 13.414V20.838C15 21.0255 14.9521 21.2099 14.8608 21.3737C14.7695 21.5375 14.6379 21.6753 14.4783 21.7739C14.3188 21.8724 14.1368 21.9286 13.9494 21.9371C13.7621 21.9455 13.5757 21.9059 13.408 21.822L9.691 19.964C9.48337 19.8602 9.30875 19.7006 9.1867 19.5031C9.06466 19.3057 9.00001 19.0781 9 18.846V13.414L3.586 8C3.2109 7.62501 3.00011 7.11639 3 6.586V4.5ZM5 5V6.586L10.56 12.146C10.6994 12.2853 10.8101 12.4507 10.8856 12.6327C10.9611 12.8148 11 13.0099 11 13.207V18.382L13 19.382V13.207C13 12.809 13.158 12.427 13.44 12.147L19 6.585V5H5Z"
          fill={color}
          scale={scale}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_167_2">
          <Rect
            width="24"
            height="24"
            fill="white"
          />
        </ClipPath>
      </Defs>
    </Svg>
  )
}

export default Icon

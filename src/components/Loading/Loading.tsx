// import LottieView from 'lottie-react-native'
import { ActivityIndicator, Platform } from 'react-native'

import { getAnimation, getColorPrimary, getColorSecondary, getSpeed } from './utils'
import { useTheme } from '@providers/theme'

export interface LoadingProps {
  animation?: 'dots' | 'movie' | 'circle' | 'confetti'
  size?: number
  disabled?: boolean
  type?: 'primary' | 'secondary'
}

const defaultValue = {
  animation: 'dots',
  size: 120,
  type: 'primary',
  disabled: false,
}

const Loading = (propArgs: LoadingProps): JSX.Element => {
  const { animation, size, type, disabled } = { ...defaultValue, ...propArgs }

  const render = getAnimation(animation)
  const speed = getSpeed(animation)
  const theme = useTheme()

  const colorPrimary = getColorPrimary(type, disabled, theme)
  const colorSecondary = getColorSecondary(type, disabled, theme)

  if (Platform.OS === 'android') return <ActivityIndicator color={colorPrimary} />

  return (
    <></>
    // <LottieView
    //   style={{ width: size, height: size }}
    //   autoPlay={true}
    //   source={render}
    //   speed={speed}
    //   loop={true}
    //   colorFilters={[
    //     { keypath: 'Wheel', color: colorPrimary },
    //     { keypath: 'WheelHole', color: colorSecondary },
    //     { keypath: 'Circle', color: colorPrimary },
    //     { keypath: 'Dot', color: colorPrimary },
    //   ]}
    // />
  )
}

export default Loading

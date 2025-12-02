import { Animated, Image, Pressable, PressableProps } from 'react-native'

import useStyles from './styles'
import Button from '@components/Button'
import Icon from '@components/Icon'
// import Skeleton from '@providers/Skeleton'
// import useSkeleton from '@providers/Skeleton/useSkeleton'
import usePressableAnimation from '@hooks/usePressableAnimation'
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)

type AvatarProps = PressableProps & {
  image?: string
  size?: 'small' | 'medium' | 'large'
}
const defaultProps: Partial<AvatarProps> = {
  size: 'small',
}

const Avatar = (props: AvatarProps): JSX.Element => {
  const { image, size, ...rest } = { ...props, ...defaultProps }
  const { scale, animationPressIn, animationPressOut } = usePressableAnimation({
    disabled: !props.onPress,
  })
  // const { opacity, onLoadEnd } = useSkeleton()
  const styles = useStyles({
    width: size === 'small' ? 32 : size === 'medium' ? 64 : 128,
    height: size === 'small' ? 32 : size === 'medium' ? 64 : 128,
  })

  if (image)
    return (
      // <Skeleton>
      <AnimatedPressable
        style={[
          styles.root,
          {
            transform: [{ scale }],
            // opacity
          },
        ]}
        onPressIn={animationPressIn}
        onPressOut={animationPressOut}
        {...rest}
      >
        <Image
          style={styles.image}
          // onLoadEnd={onLoadEnd}
          source={{ uri: image }}
        />
      </AnimatedPressable>
      // {/* </Skeleton> */}
    )
  else
    return (
      <Button
        // customRef={customRef}
        icon={<Icon.Person />}
        // size={size}
        variant="secondary"
        onPress={props.onPress}
      />
    )
}

export default Avatar

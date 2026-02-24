import { TouchableOpacity, View } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

import useStyles from './styles'
import { AccordionProps } from './types'
import { IconChevron } from '@components/icon'
import Typography from '@components/typography'

const Accordion = ({ content, header, entering }: AccordionProps): React.ReactElement => {
  const styles = useStyles()
  const isOpen = useSharedValue(false)

  const handlePress = (): void => {
    isOpen.value = !isOpen.value
  }

  const chevronAnimatedStyle = useAnimatedStyle(() => {
    return { transform: [{ rotate: withTiming(isOpen.value ? '180deg' : '0deg') }] }
  })

  const contentAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: withTiming(isOpen.value ? 1 : 0),
      maxHeight: withTiming(isOpen.value ? 300 : 0),
      paddingBottom: withTiming(isOpen.value ? 8 : 0),
    }
  })

  return (
    <Animated.View
      style={styles.root}
      entering={entering}
    >
      <TouchableOpacity
        onPress={handlePress}
        style={styles.header}
        activeOpacity={0.7}
      >
        <Typography style={styles.title}>{header.title}</Typography>

        <View style={styles.trailing}>
          {header.trailingArea}
          <Animated.View style={[styles.button, chevronAnimatedStyle]}>
            <IconChevron />
          </Animated.View>
        </View>
      </TouchableOpacity>

      <Animated.View style={[styles.content, contentAnimatedStyle]}>{content}</Animated.View>
    </Animated.View>
  )
}

export default Accordion

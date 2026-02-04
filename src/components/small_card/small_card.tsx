import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import Animated, { createAnimatedComponent, FadeIn } from 'react-native-reanimated'

import useStyles from './styles'
import { SmallCardProps } from './types'
import Button from '@components/button'
import { IconLocket, IconOscar } from '@components/icon'
import Row from '@components/row'
import Typography from '@components/typography'
import { useTheme } from '@providers/theme'
const AnimatedTouchableOpacity = createAnimatedComponent(TouchableOpacity)

const SmallCard = ({ _id, image, squared, winner, button, title, description, additional, spoiler, watched, disabled, style, ...props }: SmallCardProps): React.ReactElement => {
  const styles = useStyles()
  const { semantics } = useTheme()

  const hasImage = image !== undefined
  const isLoading = button?.loading?.(_id!) ?? false
  const content = (
    <>
      {hasImage && (
        <View style={styles.imageContainer}>
          <Animated.Image
            entering={FadeIn}
            blurRadius={spoiler && !watched ? 10 : 0}
            source={{ uri: image }}
            style={[styles.image, squared && styles.squared]}
          />
          {watched === false && (
            <View style={styles.spoiler}>
              <IconLocket
                color={semantics.container.foreground.light}
                size={16}
              />
            </View>
          )}
        </View>
      )}
      <View style={styles.header}>
        <Row middle>
          {winner && (
            <IconOscar
              filled
              size={12}
              color={semantics.brand.foreground.default}
            />
          )}
          <Typography
            numberOfLines={1}
            body
          >
            {title}
          </Typography>
        </Row>

        {(description || additional) && (
          <Typography
            numberOfLines={1}
            description
          >
            {description}
            {additional && ' '}
            {additional && (
              <Typography
                legend
                color={semantics.accent.base.default}
              >
                {additional}
              </Typography>
            )}
          </Typography>
        )}
      </View>
      <View>
        {button && (
          <Button
            disabled={button.disabled}
            variant="ghost"
            small
            icon={button.icon}
            title={button.title}
            onPress={() => button.onPress(_id!)}
            loading={isLoading}
          />
        )}
      </View>
    </>
  )

  if (props.onPress)
    return (
      <AnimatedTouchableOpacity
        {...props}
        style={[styles.root, style]}
      >
        {content}
      </AnimatedTouchableOpacity>
    )
  else
    return (
      <Animated.View
        {...props}
        style={[styles.root, style]}
      >
        {content}
      </Animated.View>
    )
}

export default SmallCard

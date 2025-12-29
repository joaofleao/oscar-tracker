import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { BlurView } from 'expo-blur'

import useStyles from './styles'
import { SmallCardProps } from './types'
import Button from '@components/button'
import { IconLocket } from '@components/icon'
import Typography from '@components/typography'
import { useTheme } from '@providers/theme'

const SmallCard = ({ _id, image, squared, button, title, description, additional, spoiler, watched, disabled, style, ...props }: SmallCardProps): React.ReactElement => {
  const styles = useStyles()
  const { semantics } = useTheme()

  const hasImage = image !== undefined
  const isLoading = button?.loading?.(_id!) ?? false
  const content = (
    <>
      {hasImage && (
        <View>
          <Image
            source={{ uri: image }}
            style={[styles.image, squared && styles.squared]}
          />
          {watched === false && (
            <BlurView
              style={styles.spoiler}
              intensity={spoiler && !watched ? 8 : 0}
            >
              <IconLocket
                color={semantics.container.foreground.light}
                size={16}
              />
            </BlurView>
          )}
        </View>
      )}
      <View style={styles.header}>
        <Typography
          numberOfLines={1}
          body
        >
          {title}
        </Typography>

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
      <TouchableOpacity
        {...props}
        style={[styles.root, style]}
      >
        {content}
      </TouchableOpacity>
    )
  else
    return (
      <View
        {...props}
        style={[styles.root, style]}
      >
        {content}
      </View>
    )
}

export default SmallCard

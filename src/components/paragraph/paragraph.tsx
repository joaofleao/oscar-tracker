import React from 'react'
import { Pressable } from 'react-native'
import Animated, { FadeIn, FadeOut } from 'react-native-reanimated'

import useStyles from './styles'
import { ParagraphProps } from './types'
import Blur from '@components/blur'
import { IconEyeClosed } from '@components/icon'
import Typography from '@components/typography'

const Paragraph = ({ text, spoiler, toggleSpoiler }: ParagraphProps): React.ReactElement => {
  const styles = useStyles()
  const shuffle = (str: string): string =>
    str
      .split(' ')
      .sort(() => Math.random() - 0.5)
      .join(' ')

  const content = (
    <Typography
      key={'paragraph'}
      entering={FadeIn}
      exiting={FadeOut}
      justify
      body
    >
      {text}
    </Typography>
  )
  const shuffledText = (
    <Typography
      key={'spoiler'}
      entering={FadeIn}
      exiting={FadeOut}
      justify
      body
    >
      {shuffle(text)}
    </Typography>
  )

  if (toggleSpoiler)
    return (
      <Pressable
        onPress={() => {
          toggleSpoiler('hidePlot')
        }}
        style={styles.root}
      >
        {!spoiler ? content : shuffledText}

        {spoiler && (
          <Animated.View
            style={[styles.spoiler]}
            entering={FadeIn}
            exiting={FadeOut}
          >
            <Blur style={styles.blur} />
            <IconEyeClosed />
          </Animated.View>
        )}
      </Pressable>
    )

  return content
}

export default Paragraph

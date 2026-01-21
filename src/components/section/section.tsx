import React from 'react'
import { View } from 'react-native'
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated'

import useStyles from './styles'
import { SectionProps } from './types'
import Button from '@components/button'
import Row from '@components/row'
import Typography from '@components/typography'

const Section = ({ children, entering, exiting, button, title }: SectionProps): React.ReactElement => {
  const styles = useStyles()
  return (
    <Animated.View style={styles.root}>
      <Row between>
        <Typography
          style={styles.text}
          numberOfLines={1}
        >
          {title}
        </Typography>
        {button && (
          <Button
            small
            title={button.title}
            onPress={button.action}
          />
        )}
      </Row>
      {children}
    </Animated.View>
  )
}

export default Section

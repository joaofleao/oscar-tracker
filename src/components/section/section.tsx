import React from 'react'
import Animated from 'react-native-reanimated'

import useStyles from './styles'
import { SectionProps } from './types'
import Button from '@components/button'
import Row from '@components/row'
import Typography from '@components/typography'

const Section = ({ children, entering, exiting, button, title, legend }: SectionProps): React.ReactElement => {
  const styles = useStyles()
  return (
    <Animated.View
      style={styles.root}
      entering={entering}
      exiting={exiting}
    >
      <Row between>
        <Typography
          legend={legend}
          style={styles.text}
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

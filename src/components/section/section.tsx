import React from 'react'
import Animated from 'react-native-reanimated'

import useStyles from './styles'
import { SectionProps } from './types'
import Badge from '@components/badge/badge'
import Button from '@components/button'
import Row from '@components/row'
import Typography from '@components/typography'

const Section = ({ children, entering, exiting, layout, button, title, legend, badge }: SectionProps): React.ReactElement => {
  const styles = useStyles()
  return (
    <Animated.View
      style={styles.root}
      entering={entering}
      exiting={exiting}
      layout={layout}
    >
      <Row between>
        <Typography
          legend={legend}
          style={styles.text}
        >
          {title}
        </Typography>
        {badge && (
          <Badge
            title={badge.title}
            variant={badge.variant}
          />
        )}

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

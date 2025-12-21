import React from 'react'
import { View } from 'react-native'

import useStyles from './styles'
import { SectionProps } from './types'
import Button from '@components/button'
import Row from '@components/row'
import Typography from '@components/typography'

const Section = ({ children, button, title }: SectionProps): React.ReactElement => {
  const styles = useStyles()

  return (
    <View style={{ gap: 8 }}>
      <Row between>
        <Typography
          style={{ flex: 1 }}
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
    </View>
  )
}

export default Section

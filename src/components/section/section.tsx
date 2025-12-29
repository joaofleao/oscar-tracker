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
    <View style={styles.text}>
      <Row between>
        <Typography
          style={styles.text}
          numberOfLines={1}
        >
          Melhor filme internactional baseado num bando de brancos djsaiod djsaio ds
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

import React from 'react'
import { ScrollView, View } from 'react-native'

import useStyles from './styles'
import { BarRootProps } from './types'

const Bar = ({ children: childrenProp, style }: BarRootProps): React.ReactElement => {
  const styles = useStyles()

  const children = React.Children.toArray(childrenProp)

  return (
    <ScrollView
      alwaysBounceHorizontal={false}
      contentContainerStyle={styles.root}
      style={style}
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      {children.map((child, index) => (
        <React.Fragment key={index}>
          {index !== 0 && <View style={styles.divider} />}
          {child}
        </React.Fragment>
      ))}
    </ScrollView>
  )
}

export default Bar

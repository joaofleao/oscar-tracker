import React from 'react'
import { View } from 'react-native'

import useStyles from './styles'
import { BlurProps } from './types'
import Blur from '@components/blur'

const HeaderBlur = ({ style, children, animation, variant = 'container', ...props }: BlurProps): React.ReactElement => {
  const styles = useStyles({ variant })

  const [headerHeight, setHeaderHeight] = React.useState<number>(0)

  return (
    <>
      <View style={{ height: headerHeight }} />

      <Blur
        variant="background"
        onLayout={(e) => {
          const { height } = e.nativeEvent.layout
          setHeaderHeight(height)
        }}
        style={[styles.floating, style]}
        animation={animation}
        {...props}
      >
        {children}
      </Blur>
    </>
  )
}

export default HeaderBlur

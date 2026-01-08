import React from 'react'
import { View } from 'react-native'
import Animated, { BounceIn } from 'react-native-reanimated'
import { useReorderableDrag } from 'react-native-reorderable-list'

import useStyles from './styles'
import { DraggableListItemProps } from './types'
import ListItem from '@components/list_item'
import { TinyMove } from '@components/tiny_icon'
import Typography from '@components/typography'
import { useTheme } from '@providers/theme'

const DraggableListItem = ({ index, secondaryActions = [], mainAction, ...props }: DraggableListItemProps): React.ReactElement => {
  const drag = useReorderableDrag()
  const styles = useStyles()
  const { semantics } = useTheme()

  return (
    <View style={styles.root}>
      <ListItem
        {...props}
        secondaryActions={[{ icon: <TinyMove />, onPressIn: drag }, ...secondaryActions]}
        mainAction={{ ...mainAction, onLongPress: drag }}
      />
      {index !== undefined && (
        <Animated.View
          style={styles.position}
          entering={BounceIn.delay(25 * index)
            .duration(100)
            .springify()
            .damping(50)}
        >
          <Typography color={semantics.accent.foreground.default}>{index}</Typography>
        </Animated.View>
      )}
    </View>
  )
}

export default DraggableListItem

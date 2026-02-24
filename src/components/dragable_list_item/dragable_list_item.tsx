import React, { ReactElement } from 'react'
import { View } from 'react-native'
import Animated, { BounceIn } from 'react-native-reanimated'
import { useReorderableDrag } from 'react-native-reorderable-list'

import useStyles from './styles'
import { DraggableItemProps } from './types'
import ListItem from '@components/list_item'
import SmallListItem from '@components/small_list_item'
import { TinyMove } from '@components/tiny_icon'
import Typography from '@components/typography'
import { useTheme } from '@providers/theme'

const DraggableItem = ({ small, index, disabled = false, ...props }: DraggableItemProps): React.ReactElement => {
  const drag = useReorderableDrag()
  const styles = useStyles()
  const { semantics } = useTheme()

  const renderDefaultItem = (): ReactElement => (
    <ListItem
      {...props}
      mainAction={disabled ? props.mainAction : { ...props.mainAction, onLongPress: drag }}
      secondaryActions={disabled ? props.secondaryActions : [{ icon: <TinyMove />, onPressIn: drag }, ...(props.secondaryActions ?? [])]}
    />
  )

  const renderSmallItem = (): ReactElement => (
    <SmallListItem
      {...props}
      mainAction={disabled ? props.mainAction : { ...props.mainAction, onLongPress: drag }}
      secondaryActions={disabled ? props.secondaryActions : [...(props.secondaryActions ?? []), { icon: <TinyMove />, onPressIn: drag }]}
    />
  )

  return (
    <View style={styles.root}>
      {small ? renderSmallItem() : renderDefaultItem()}

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

export default DraggableItem

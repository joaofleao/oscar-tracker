import { View } from 'react-native'
import { AnimatedProps } from 'react-native-reanimated'

import { ListItemProps } from '@components/list_item'

export interface DraggableItemProps extends ListItemProps {
  index?: number
  small?: boolean
  disabled?: boolean
  ghost?: boolean
  layout?: AnimatedProps<View>['layout']
}

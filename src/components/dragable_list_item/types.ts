import { ListItemProps } from '@components/list_item'

export interface DraggableListItemProps extends Omit<ListItemProps, 'onLongPress'> {
  index?: number
}

import { TouchableOpacityProps, View } from 'react-native'
import { AnimatedProps } from 'react-native-reanimated'

import { IconProps } from '@components/icon'

export type SmallCardActionProps = {
  icon?: React.ReactElement<IconProps>
  title: string
  onPress: (movie: NonNullable<SmallCardProps['_id']>) => void | Promise<void>
  loading?: (movie: NonNullable<SmallCardProps['_id']>) => boolean
  disabled?: boolean
}

export interface SmallCardProps extends TouchableOpacityProps {
  _id: string
  image?: string
  title?: string
  description?: string
  spoiler?: boolean
  watched?: boolean
  squared?: boolean
  winner?: boolean
  entering?: AnimatedProps<View>['entering']
  exiting?: AnimatedProps<View>['exiting']
  layout?: AnimatedProps<View>['layout']
  chip?: {
    title: string
    variant: 'brand' | 'container'
  }

  additional?: string
  index?: number
  button?: SmallCardActionProps
}

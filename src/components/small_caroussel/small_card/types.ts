import { TouchableOpacityProps } from 'react-native'

import { IconProps } from '@components/icon'

export type SmallCardActionProps = {
  icon?: React.ReactElement<IconProps>
  title: string
  onPress: (movie: NonNullable<SmallCardProps['_id']>) => void | Promise<void>
  loading?: (movie: NonNullable<SmallCardProps['_id']>) => boolean
  disabled: boolean
}

export interface SmallCardProps extends TouchableOpacityProps {
  _id?: string
  image?: string
  label?: string
  description?: string
  additional?: string
  index?: number
  button?: SmallCardActionProps
}

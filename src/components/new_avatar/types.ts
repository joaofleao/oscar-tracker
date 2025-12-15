import { Ref } from 'react'
import { TouchableOpacityProps, View } from 'react-native'

export interface AvatarProps extends TouchableOpacityProps {
  image?: string
  label?: string
  ref?: Ref<View>
}

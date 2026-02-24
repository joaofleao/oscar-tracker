import { TouchableOpacityProps } from 'react-native'

export interface MovieSliderItemProps extends TouchableOpacityProps {
  title: string
  image: string
  spoiler?: boolean
  watched?: boolean
  height?: number

  description?: string
  bottomArea?: React.ReactElement
  isActive?: boolean
}

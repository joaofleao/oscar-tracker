import { ViewProps } from 'react-native'

import { SemanticsType } from '@providers/theme'

export interface BlurProps extends ViewProps {
  animation?: object
  variant?: keyof SemanticsType
}

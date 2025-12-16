import { ViewProps } from 'react-native'

export interface RowProps extends ViewProps {
  wrap?: boolean
  center?: boolean
  start?: boolean
  end?: boolean
  between?: boolean
  around?: boolean
  evenly?: boolean
}

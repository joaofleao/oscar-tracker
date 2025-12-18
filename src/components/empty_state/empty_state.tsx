import React from 'react'
import { View } from 'react-native'

import { EmptyStateProps } from './types'
import { TriangleLogo } from '@components/logo'
import Typography from '@components/typography'
import { useTheme } from '@providers/theme'

const EmptyState = ({ title, description }: EmptyStateProps): React.ReactElement => {
  const { semantics } = useTheme()
  return (
    <View style={{ minHeight: 300, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
      <TriangleLogo color={semantics.container.base.pressed} />
      <View style={{ alignItems: 'center' }}>
        <Typography>{title}</Typography>
        <Typography description>{description}</Typography>
      </View>
    </View>
  )
}

export default EmptyState

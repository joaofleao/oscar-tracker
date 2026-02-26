import React from 'react'
import { ActivityIndicator, View } from 'react-native'

import useStyles from './styles'
import { EmptyStateProps } from './types'
import { TriangleLogo } from '@components/logo'
import Typography from '@components/typography'
import { useTheme } from '@providers/theme'

const EmptyState = ({ title, loading, description, style }: EmptyStateProps): React.ReactElement => {
  const { semantics } = useTheme()
  const styles = useStyles()
  return (
    <View style={[styles.root, style]}>
      {loading ? (
        <ActivityIndicator color={semantics.container.foreground.default} />
      ) : (
        <>
          <TriangleLogo
            color={semantics.container.base.pressed}
            width={80}
          />
          <View style={styles.content}>
            <Typography center>{title}</Typography>
            <Typography
              center
              legend
            >
              {description}
            </Typography>
          </View>
        </>
      )}
    </View>
  )
}

export default EmptyState

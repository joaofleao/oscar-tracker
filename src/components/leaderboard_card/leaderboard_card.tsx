import React from 'react'
import { Image, Text, View } from 'react-native'

import useStyles from './styles'
import { LeaderboardCardProps } from './types'
import Badge from '@components/badge'
import Row from '@components/row'
import Typography from '@components/typography'
import { useTheme } from '@providers/theme'

const LeaderboardCard = ({ image, label, sublabel, description, badge, points, pointsLabel, variant = 'container', ...props }: LeaderboardCardProps): React.ReactElement => {
  const styles = useStyles({ variant })
  const { semantics } = useTheme()

  const hasImage = image !== undefined

  return (
    <>
      <Row
        middle
        style={styles.root}
        {...props}
      >
        {hasImage && (
          <View style={styles.imageContainer}>
            <Image
              source={{ uri: image }}
              style={styles.image}
            />
          </View>
        )}

        <View style={styles.content}>
          <Typography>
            {label} {sublabel && <Typography legend>{sublabel}</Typography>}
          </Typography>

          {description && <Typography legend>{description}</Typography>}
        </View>

        <View style={styles.placeContainer}>
          <Text style={styles.place}>{points}</Text>
          <Typography color={semantics[variant].foreground.default}>{pointsLabel}</Typography>
        </View>
      </Row>
      {badge && (
        <Badge
          style={styles.badge}
          title={badge}
          entering={props.entering}
          exiting={props.exiting}
          layout={props.layout}
        />
      )}
    </>
  )
}

export default LeaderboardCard

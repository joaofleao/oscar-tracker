import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'
import { BlurView } from 'expo-blur'

import useStyles from './styles'
import { MediumCardProps } from './types'
import { IconLocket, IconOscar } from '@components/icon'
import Tag from '@components/tag'
import Typography from '@components/typography'
import { useTheme } from '@providers/theme'

const MediumCard = ({ image, label, spoiler, watched, winner, ...props }: MediumCardProps): React.ReactElement => {
  const styles = useStyles()
  const { semantics } = useTheme()

  const hasImage = image !== undefined

  return (
    <TouchableOpacity
      style={styles.root}
      {...props}
    >
      {hasImage && (
        <View style={styles.container}>
          <Image
            source={{ uri: image }}
            style={styles.image}
          />
          {!watched && (
            <BlurView
              style={styles.spoiler}
              intensity={spoiler && !watched ? 10 : 0}
            >
              <IconLocket
                color={semantics.container.foreground.light}
                size={16}
              />
            </BlurView>
          )}
          {winner && (
            <Tag
              style={styles.winner}
              icon={
                <IconOscar
                  filled
                  color={semantics.brand.foreground.default}
                />
              }
            />
          )}
        </View>
      )}

      <Typography body>{label}</Typography>
    </TouchableOpacity>
  )
}

export default MediumCard

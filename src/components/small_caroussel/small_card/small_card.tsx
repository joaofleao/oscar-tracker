import React from 'react'
import { Image, TouchableOpacity, View } from 'react-native'

import useStyles from './styles'
import { SmallCardProps } from './types'
import Typography from '@components/typography'

const SmallCard = ({ image, label, description, ...props }: SmallCardProps): React.ReactElement => {
  const styles = useStyles()

  const hasImage = image !== undefined

  return (
    <TouchableOpacity
      style={styles.root}
      {...props}
    >
      {hasImage && (
        <Image
          source={{ uri: `https://image.tmdb.org/t/p/w500${image}` }}
          style={styles.image}
        />
      )}
      <View style={{ flex: 1 }}>
        <Typography body>{label}</Typography>
        <Typography
          numberOfLines={1}
          description
        >
          {description}
        </Typography>
      </View>
    </TouchableOpacity>
  )
}

export default SmallCard

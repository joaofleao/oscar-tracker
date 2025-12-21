import React from 'react'
import { Image, TouchableOpacity } from 'react-native'

import useStyles from './styles'
import { MediumCardProps } from './types'
import Typography from '@components/typography'

const MediumCard = ({ image, label, ...props }: MediumCardProps): React.ReactElement => {
  const styles = useStyles()

  const hasImage = image !== undefined

  return (
    <TouchableOpacity
      style={styles.root}
      {...props}
    >
      {hasImage && (
        <Image
          source={{ uri: image }}
          style={styles.image}
        />
      )}

      <Typography body>{label}</Typography>
    </TouchableOpacity>
  )
}

export default MediumCard

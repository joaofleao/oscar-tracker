import React from 'react'
import { FlatList } from 'react-native'

import useStyles from './styles'
import { CarousselProps } from './types'
import Typography from '@components/typography'

const Caroussel = <T,>({ data, item, style, empty, contentContainerStyle, ...props }: CarousselProps<T>): React.ReactElement => {
  const styles = useStyles()

  const ItemComponent = item as any

  return (
    <FlatList
      ListEmptyComponent={<Typography legend>{empty}</Typography>}
      showsHorizontalScrollIndicator={false}
      horizontal
      data={data}
      renderItem={({ item }) => <ItemComponent {...item} />}
      style={[styles.root, style]}
      contentContainerStyle={[styles.content, contentContainerStyle]}
      {...props}
    />
  )
}

export default Caroussel

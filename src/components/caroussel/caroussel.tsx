import React from 'react'
import { FlatList, ListRenderItem } from 'react-native'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import { CarousselProps } from './types'
import Row from '@components/row'
import Typography from '@components/typography'

function Caroussel<T>({ render, data, style, group, empty, contentContainerStyle, ...props }: CarousselProps<T>): React.ReactElement {
  const styles = useStyles()
  const { t } = useTranslation()

  const sectiontitle = (title: string): React.ReactElement => (
    <Row middle>
      <Typography legend>{title}</Typography>
    </Row>
  )

  const renderItem: ListRenderItem<T> = ({ item, index }) => {
    if (!data || data.length === 0) return <></>

    if (group !== undefined) {
      const refinedItem = item as T & { [group]: string }
      const refinedData = data as (T & { [group]: string })[]

      if (refinedData[index - 1]?.[group] !== refinedItem[group])
        return (
          <Row middle>
            {sectiontitle(String(t(`overall:${refinedItem[group]}`)))}
            {render ? render(refinedItem, index) : <Typography>{String(refinedItem)}</Typography>}
          </Row>
        )
    }

    if (render) return render(item, index)

    return <Typography>{String(item)}</Typography>
  }

  return (
    <FlatList
      ListEmptyComponent={<Typography legend>{empty}</Typography>}
      showsHorizontalScrollIndicator={false}
      horizontal
      data={data}
      renderItem={renderItem}
      keyExtractor={(item, index) => ((item as any).__section ? `section-${(item as any).title}-${index}` : ((item as any).id ?? (item as any).key ?? index.toString()))}
      style={[styles.root, style]}
      contentContainerStyle={[styles.content, contentContainerStyle]}
      {...props}
    />
  )
}

export default Caroussel

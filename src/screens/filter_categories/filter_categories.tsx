import { useState } from 'react'
import { View } from 'react-native'
import { FadeInDown, FadeOutUp } from 'react-native-reanimated'
import ReorderableList, { ReorderableListProps } from 'react-native-reorderable-list'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import Button from '@components/button'
import DraggableListItem from '@components/dragable_list_item'
import { IconCheckCircle, IconDiscard, IconEyeClosed, IconEyeOpen, IconLocket } from '@components/icon'
import Row from '@components/row'
import Section from '@components/section'
import Sheet from '@components/sheet/sheet'
import SmallListItem from '@components/small_list_item'
import Typography from '@components/typography'
import { useEdition } from '@providers/edition'
import { ScreenType } from '@router/types'

const FilterCategories: ScreenType<'filter_categories'> = ({ navigation }) => {
  const styles = useStyles()
  const { t } = useTranslation()

  const { nominations, setOrderedCategories, setHiddenCategories, hiddenCategories, orderedCategories } = useEdition()

  const [localCategories, setLocalCategories] = useState(
    nominations
      .slice(1)
      .map((n) => ({ ...n.category, hide: (hiddenCategories ?? []).includes(n.category._id) }))
      .sort((a, b) => {
        if (!orderedCategories || (orderedCategories ?? []).length === 0) return 0
        const indexA = orderedCategories.indexOf(a._id)

        const indexB = orderedCategories.indexOf(b._id)

        if (indexA !== -1 && indexB !== -1) {
          return indexA - indexB
        }
        if (indexA !== -1) return -1
        if (indexB !== -1) return 1
        return 0
      }),
  )

  const handleReorder: ReorderableListProps<any>['onReorder'] = (event) => {
    const { from, to } = event
    const customOrder = [...localCategories]
    const [item] = customOrder.splice(from, 1)
    customOrder.splice(to, 0, item)
    setLocalCategories(customOrder)
  }

  const handleSave = (): void => {
    const categoryIds = localCategories.map((n) => n._id)
    setOrderedCategories([nominations[0].category._id, ...categoryIds])
    setHiddenCategories(localCategories.filter((n) => n.hide).map((n) => n._id))
    navigation.goBack()
  }

  const toggleCategoryVisibility = (categoryId: string): void => {
    setLocalCategories((prevCategories) => prevCategories.map((category) => (category._id === categoryId ? { ...category, hide: !category.hide } : category)))
  }
  const handleDiscard = (): void => {
    setLocalCategories(nominations.slice(1).map((n) => ({ ...n.category, hide: (hiddenCategories ?? []).includes(n.category._id) })))
  }

  const handleClear = (): void => {
    setHiddenCategories([])
    setOrderedCategories([])
    setLocalCategories(nominations.slice(1).map((n) => ({ ...n.category, hide: (hiddenCategories ?? []).includes(n.category._id) })))
    navigation.goBack()
  }

  const hasChanges =
    JSON.stringify(localCategories.map((e) => ({ id: e._id, hide: e.hide }))) !==
    JSON.stringify(
      nominations
        .slice(1)
        .map((n) => ({ id: n.category._id, hide: (hiddenCategories ?? []).includes(n.category._id) }))
        .sort((a, b) => {
          if (!orderedCategories || (orderedCategories ?? []).length === 0) return 0
          const indexA = orderedCategories.indexOf(a.id)

          const indexB = orderedCategories.indexOf(b.id)

          if (indexA !== -1 && indexB !== -1) {
            return indexA - indexB
          }
          if (indexA !== -1) return -1
          if (indexB !== -1) return 1
          return 0
        }),
    )
  const isDefault = orderedCategories.length === 0 && (hiddenCategories ?? []).length === 0

  const header = (
    <>
      <Section title={t('filter_categories:categories')}>
        <SmallListItem
          badge={`${nominations[0].nominations.filter((n) => n.watched).length}/${nominations[0].nominations.length}`}
          id={nominations[0].category._id}
          title={nominations[0].category.name}
          secondaryActions={[
            {
              disabled: true,
              icon: <IconLocket size={16} />,
            },
          ]}
        />
      </Section>
      <View style={styles.gap} />
    </>
  )

  return (
    <Sheet
      reordable
      header={<Typography>{t('filter_categories:filter')}</Typography>}
      footer={
        <>
          {hasChanges && (
            <Row
              entering={FadeInDown.delay(300)}
              exiting={FadeOutUp.delay(300)}
            >
              <Button
                icon={<IconDiscard />}
                onPress={handleDiscard}
              />

              <Button
                onPress={handleSave}
                icon={<IconCheckCircle />}
                variant="brand"
                title={t('filter_categories:save')}
              />
            </Row>
          )}
          {!hasChanges && !isDefault && (
            <Button
              entering={FadeInDown.delay(300)}
              exiting={FadeOutUp.delay(300)}
              onPress={handleClear}
              icon={<IconDiscard />}
              variant="brand"
              title={t('filter_categories:restore_defaults')}
            />
          )}
        </>
      }
    >
      <ReorderableList
        ListHeaderComponent={header}
        onReorder={handleReorder}
        data={localCategories}
        renderItem={({ item }) => (
          <DraggableListItem
            key={item._id}
            ghost={item.hide}
            small
            id={item._id}
            title={item.name}
            badge={`${nominations.find((n) => n.category._id === item._id)?.nominations.filter((n) => n.watched).length}/${nominations.find((n) => n.category._id === item._id)?.nominations.length}`}
            secondaryActions={[
              {
                icon: <IconEyeOpen size={16} />,
                selectedIcon: <IconEyeClosed size={16} />,
                selected: item.hide,
                onPress: () => toggleCategoryVisibility(item._id),
              },
            ]}
          />
        )}
      />
    </Sheet>
  )
}

export default FilterCategories

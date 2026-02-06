import { useState } from 'react'
import { View } from 'react-native'
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated'
import ReorderableList, { ReorderableListProps } from 'react-native-reorderable-list'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import Blur from '@components/blur'
import Button from '@components/button'
import DraggableListItem from '@components/dragable_list_item'
import { IconCheckCircle, IconDiscard, IconEyeClosed, IconEyeOpen, IconLocket } from '@components/icon'
import Section from '@components/section'
import SmallListItem from '@components/small_list_item'
import Typography from '@components/typography'
import { useEdition } from '@providers/edition'
import { ScreenType } from '@router/types'

const Filter: ScreenType<'filter'> = ({ navigation }) => {
  const styles = useStyles()
  const { t } = useTranslation()

  const { nominations, clearCategoriesSettings, setOrderedCategories, setHiddenCategories, hiddenCategories, orderedCategories } = useEdition()

  const [localCategories, setLocalCategories] = useState(nominations.slice(1).map((n) => ({ ...n.category, hide: (hiddenCategories ?? []).includes(n.category._id) })))

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
    clearCategoriesSettings()
    setLocalCategories(nominations.slice(1).map((n) => ({ ...n.category, hide: (hiddenCategories ?? []).includes(n.category._id) })))
    navigation.goBack()
  }

  const hasChanges = JSON.stringify(localCategories.map((e) => ({ id: e._id, hide: e.hide }))) !== JSON.stringify(nominations.slice(1).map((n) => ({ id: n.category._id, hide: (hiddenCategories ?? []).includes(n.category._id) })))
  const isDefault = orderedCategories.length === 0 && (hiddenCategories ?? []).length === 0

  const header = (
    <View style={styles.contentHeader}>
      <Section title={t('filter:categories')}>
        <SmallListItem
          chip={` ${nominations[0].nominations.filter((n) => n.watched).length}/${nominations[0].nominations.length} `}
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
    </View>
  )

  return (
    <>
      <Blur style={styles.header}>
        <Typography>{t('filter:filter')}</Typography>
      </Blur>

      <ReorderableList
        ListHeaderComponent={header}
        onReorder={handleReorder}
        style={styles.root}
        contentContainerStyle={styles.content}
        data={localCategories}
        ItemSeparatorComponent={() => <View style={styles.gap} />}
        renderItem={({ item }) => (
          <DraggableListItem
            key={item._id}
            ghost={item.hide}
            small
            id={item._id}
            title={item.name}
            chip={` ${nominations.find((n) => n.category._id === item._id)?.nominations.filter((n) => n.watched).length}/${nominations.find((n) => n.category._id === item._id)?.nominations.length} `}
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
      <Animated.View
        style={styles.footer}
        entering={FadeInDown.delay(300)}
        exiting={FadeOutUp.delay(300)}
      >
        {hasChanges && (
          <>
            <Button
              icon={<IconDiscard />}
              onPress={handleDiscard}
            />

            <Button
              onPress={handleSave}
              icon={<IconCheckCircle />}
              variant="brand"
              title={t('filter:save')}
            />
          </>
        )}
        {!hasChanges && !isDefault && (
          <Button
            onPress={handleClear}
            icon={<IconDiscard />}
            variant="brand"
            title={t('filter:restore_defaults')}
          />
        )}
      </Animated.View>
    </>
  )
}

export default Filter

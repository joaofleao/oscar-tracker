import React from 'react'
import { Dimensions, FlatList, type ListRenderItemInfo, View } from 'react-native'

import * as steps from './Steps'
import useStyles from './styles'
import Button from '@components/Button'
import Global from '@components/Global'
import Header from '@components/Header'
import Icon from '@components/Icon'
import ProgressBar from '@components/ProgressBar'
import { useUser } from '@providers/user'
import type { PreferencesProps } from '@types'
import routes from '@utils/routes'

const Preferences = ({ navigation }: PreferencesProps): JSX.Element => {
  const scrollViewRef = React.useRef<FlatList>(null)
  const { setPreferences } = useUser()

  const [index, setIndex] = React.useState(0)
  const { width } = Dimensions.get('window')

  React.useEffect(() => {
    return navigation.addListener('beforeRemove', (e) => {
      if (index > 0)
        setIndex((oldValue) => {
          return oldValue - 1
        })
      e.preventDefault()
    })
  }, [navigation, index, setIndex])

  const handleNext = (show: boolean): void => {
    if (index === 1)
      setPreferences((old) => {
        return { ...old, poster: show }
      })

    if (index === 2)
      setPreferences((old) => {
        return { ...old, plot: show }
      })
    if (index === 3)
      setPreferences((old) => {
        return { ...old, casting: show }
      })
    if (index === 4)
      setPreferences((old) => {
        return { ...old, ratings: show }
      })
    handleForward()
  }

  const handleForward = (): void => {
    if (index < 5)
      setIndex((oldValue) => {
        return oldValue + 1
      })
    else {
      navigation.navigate(routes.home)
    }
  }
  const handleBack = (): void => {
    if (index > 0)
      setIndex((oldValue) => {
        return oldValue - 1
      })
  }

  React.useEffect(() => {
    scrollViewRef.current?.scrollToIndex({
      index,
      animated: true,
    })
  }, [index])

  const screens = [
    {
      key: 0,
      secondButton: 'Lets go!',
      title: 'Spoiler Settings',
      content: steps.introduction(),
    },
    {
      key: 1,
      firstButton: 'Of course!',
      secondButton: 'Heh? No',
      title: 'Poster',
      content: steps.poster(),
    },
    {
      key: 2,
      firstButton: 'Yep',
      secondButton: 'Nope',
      title: 'Plot',
      content: steps.plot(),
    },
    {
      key: 3,
      firstButton: 'Yeah',
      secondButton: 'Nah',
      title: 'Casting',
      content: steps.cast(),
    },
    {
      key: 4,
      firstButton: 'Definitely',
      secondButton: 'Not for me',
      title: 'Ratings',
      content: steps.ratings(),
    },
    {
      key: 5,
      secondButton: 'Nice!',
      title: 'Spoiler Settings',
      content: steps.conclusion(),
    },
  ]

  const renderItem = ({
    item,
  }: ListRenderItemInfo<{
    firstButton: string
    secondButton: string
    content: JSX.Element
  }>): JSX.Element => {
    return <View style={[styles.stepScreen, { width: width - 40 }]}>{item.content}</View>
  }
  const styles = useStyles()

  return (
    <Global.Screen>
      <Header.Root>
        <Button
          style={index === 0 && styles.headerRoot}
          onPress={handleBack}
          icon={<Icon.ArrowLeft />}
          size="action"
          variant="secondary"
        />
        <Header.Title>{screens[index].title}</Header.Title>
        <Header.Placeholder />
      </Header.Root>

      <View style={styles.content}>
        <FlatList
          style={styles.list}
          ref={scrollViewRef}
          data={screens}
          horizontal
          showsHorizontalScrollIndicator={false}
          scrollEnabled={false}
          renderItem={renderItem}
        />
        <ProgressBar
          total={5}
          progress={index}
        />
        <View style={styles.buttonContainer}>
          {screens[index].firstButton != null && (
            <Button
              width="full"
              variant="secondary"
              label={screens[index].firstButton}
              onPress={(): void => {
                handleNext(false)
              }}
            />
          )}
          {screens[index].secondButton != null && (
            <Button
              width="full"
              label={screens[index].secondButton}
              onPress={(): void => {
                handleNext(true)
              }}
            />
          )}
        </View>
      </View>
    </Global.Screen>
  )
}

export default Preferences

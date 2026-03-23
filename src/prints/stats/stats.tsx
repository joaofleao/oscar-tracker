import React, { useEffect, useState } from 'react'
import { PixelRatio, Text, View } from 'react-native'
import ViewShot, { captureRef } from 'react-native-view-shot'
import { LinearGradient } from 'expo-linear-gradient'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import { StatsProps } from './types'
import Column from '@components/column/column'
import { IconOscar } from '@components/icon'
import Row from '@components/row'
import TinyAvatar from '@components/tiny_avatar'
import Typography from '@components/typography'
import { useEdition } from '@providers/edition'
import useTheme from '@providers/theme/useTheme'
import { useUser } from '@providers/user'
import { ordinal } from '@utils/ordinals'

const Stats = ({ setImage }: StatsProps): React.ReactElement => {
  const [loadedImages, setLoadedImages] = useState<number>(0)
  const styles = useStyles()

  const { i18n, t } = useTranslation()
  const { semantics } = useTheme()

  const { user } = useUser()
  const { edition, movies, nominations, awards } = useEdition()

  const handleCapture = async (): Promise<void> => {
    captureRef(viewRef, { quality: 1, width: pixels * 2 }).then((uri) => {
      setImage(uri)
    })
  }
  useEffect(() => {
    if (loadedImages === 1) {
      handleCapture()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadedImages])

  const targetPixelCount = 1080
  const pixelRatio = PixelRatio.get()
  const pixels = targetPixelCount / pixelRatio

  const viewRef = React.createRef<View>()

  return (
    <View style={styles.root}>
      <ViewShot
        ref={viewRef}
        options={{ quality: 1, width: pixels * 2 }}
        style={styles.container}
      >
        <LinearGradient
          style={styles.gradient}
          colors={semantics.brand.base.gradient.toReversed() as any}
        />

        <Row
          between
          middle
        >
          <Row middle>
            <Typography branded>OSCARS</Typography>
            <Typography legend>{ordinal(edition?.number ?? 0, i18n.language, false)}</Typography>
          </Row>
          <Typography title>{edition?.year}</Typography>
        </Row>

        <Column style={styles.content}>
          <Column>
            <Row trailing>
              <Text style={styles.big}>{awards?.personal?.movies}</Text>
              <Text style={styles.description}>{`/${movies.length}`}</Text>
            </Row>

            <Text style={styles.description}>{t('share:movies')}</Text>
          </Column>

          <Column>
            <Row trailing>
              <Text style={styles.medium}>{awards?.personal?.hours}</Text>
              <Text style={styles.description}>{t('share:hours')}</Text>
            </Row>

            <Text style={styles.description}>{t('share:watched')}</Text>
          </Column>
          <Column>
            <Row trailing>
              <Text style={styles.medium}>{awards?.personal?.categories}</Text>
              <Text style={styles.description}>{`/${nominations.length}`}</Text>
            </Row>

            <Text style={styles.description}>{t('share:categories')}</Text>
          </Column>
          <Column>
            <Row trailing>
              <Text style={styles.medium}>{awards?.personal?.satisfaction}</Text>
              <Text style={styles.description}>%</Text>
            </Row>

            <Text style={styles.description}>{t('share:satisfaction')}</Text>
          </Column>
        </Column>

        <Row
          between
          trailing
        >
          <Row center>
            <IconOscar
              size={20}
              filled
              color={semantics.accent.base.default}
            />
            <View>
              <Row middle>
                <Typography>
                  <Typography style={styles.highlight}>ACADEMY </Typography>TRACKER
                </Typography>
              </Row>
            </View>
          </Row>

          <Row
            middle
            end
          >
            <Typography body>@{user?.username}</Typography>
            <TinyAvatar
              image={user?.imageURL}
              label={user?.name}
              onLoadEnd={() => setLoadedImages((prev) => prev + 1)}
            />
          </Row>
        </Row>
      </ViewShot>
    </View>
  )
}

export default Stats

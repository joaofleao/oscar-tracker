import React, { useEffect } from 'react'
import { FlatList, View } from 'react-native'
import { useAction, useQuery } from 'convex/react'
import { api } from 'convex_api'
import { useTranslation } from 'react-i18next'

import useStyles from './styles'
import Typography from '@components/typography'
import { TabType } from '@router/types'

const Movie: TabType<'movie'> = ({ navigation, route }) => {
  const { tmdbId } = route.params
  const styles = useStyles()
  const { t, i18n } = useTranslation()

  const movie = useAction(api.oscars.getMovieDetail)

  const [movieData, setMovieData] = React.useState<any>({})

  useEffect(() => {
    movie({ tmdbId }).then((data) => {
      setMovieData(data)
    })
  }, [tmdbId])

  return <Typography>{movieData.title ? movieData.title[i18n.language] : ''}</Typography>
}

export default Movie

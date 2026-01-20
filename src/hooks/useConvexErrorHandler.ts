import { Alert } from 'react-native'
import { useAction } from 'convex/react'
import { api } from 'convex_api'
import { useTranslation } from 'react-i18next'

const map: Record<string, string> = {
  InvalidSecret: 'wrong_password',
  InvalidAccountId: 'wrong_email',
  'already exists': 'already_exists',
}

const parseError = (errorMessage: string): string => {
  for (const key of Object.keys(map)) {
    if (errorMessage.includes(key)) {
      return map[key]
    }
  }
  return 'unknown_error'
}

const useConvexErrorHandler = (): ((error: any) => void) => {
  const { t } = useTranslation()
  const reportError = useAction(api.user.reportError)

  const catchConvexError = (error: { message: string }): void => {
    const code = parseError(error.message)

    if (code === 'unknown_error')
      Alert.alert(t(`errors:${code}.title`), error.message, [
        { text: t('errors:continue') },
        {
          text: t('errors:report'),
          onPress: (): Promise<any> => reportError({ message: error.message }),
          isPreferred: true,
        },
      ])
    else Alert.alert(t(`errors:${code}.title`), t(`errors:${code}.message`), [{ text: t('errors:continue') }])
  }

  return catchConvexError
}

export default useConvexErrorHandler

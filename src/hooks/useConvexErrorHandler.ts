import { Alert } from 'react-native'
import { useAction } from 'convex/react'
import { api } from 'convex_api'
import { useTranslation } from 'react-i18next'

import { authErrorCatalog, type AuthErrorCode, getAuthErrorMessage } from './error_catalog'

const parseError = (errorMessage: string): AuthErrorCode => {
  const errorLower = errorMessage.toLowerCase()

  for (const code of Object.keys(authErrorCatalog) as AuthErrorCode[]) {
    if (errorLower.includes(code.toLowerCase()) || (errorLower.includes('invalid') && code === 'invalid-credentials') || (errorLower.includes('not found') && code === 'account-not-found') || (errorLower.includes('password') && errorLower.includes('required') && code === 'password-missing-signin') || (errorLower.includes('weak') && code === 'password-weak') || (errorLower.includes('reset') && code === 'reset-not-enabled') || (errorLower.includes('verify') && code === 'verify-not-enabled')) {
      return code
    }
  }

  return 'auth-generic'
}

const useConvexErrorHandler = (): ((error: any) => void) => {
  const { t } = useTranslation()
  const { i18n } = useTranslation()
  const reportError = useAction(api.user.reportError)

  const catchConvexError = (error: { message: string }): void => {
    const errorCode = parseError(error.message)
    const title = getAuthErrorMessage(errorCode, i18n.language)

    if (errorCode === 'auth-generic')
      Alert.alert(title, error.message, [
        { text: t('errors:continue') },
        {
          text: t('errors:report'),
          onPress: (): Promise<any> => reportError({ message: error.message }),
          isPreferred: true,
        },
      ])
    else Alert.alert(title, undefined, [{ text: t('errors:continue') }])
  }

  return catchConvexError
}

export default useConvexErrorHandler

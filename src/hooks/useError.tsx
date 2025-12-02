import { FirebaseAuthTypes } from '@react-native-firebase/auth'

import { useToast } from '@providers/toast'

interface useErrorType {
  showFirebaseError: (error: FirebaseAuthTypes.NativeFirebaseAuthError) => void
}

const useError = (): useErrorType => {
  const toast = useToast()

  const showFirebaseError = (error: FirebaseAuthTypes.NativeFirebaseAuthError): void => {
    if (error.code === 'auth/network-request-failed')
      toast.showToast(
        'Unable to connect',
        'We encountered an error while trying to connect to the internet, try again later',
        'error',
      )
    else toast.showToast(error.code, error.message, 'error')
  }

  return { showFirebaseError }
}

export default useError

import { useEffect } from 'react'
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

import useError from '../../hooks/useError'
import AuthContext, { type AuthContextType } from './AuthContext'
import { useToast } from '@providers/toast'
import { useUser } from '@providers/user'
import { UserType } from '@types'

const AuthProvider = ({ children }: { children?: JSX.Element }): JSX.Element => {
  const toast = useToast()
  const { setUid } = useUser()
  const { showFirebaseError } = useError()

  //subscribes to auth changes
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged((data: FirebaseAuthTypes.User | null) => {
      if (data !== undefined) {
        setUid(data?.uid)
      } else setUid(null)
    })
    return subscriber
  }, [])

  const signIn: AuthContextType['signIn'] = async (email, password) => {
    try {
      const response = await auth().signInWithEmailAndPassword(email, password)
      setUid(response.user.uid)
      return response
    } catch (error) {
      showFirebaseError(error)
      throw error
    }
  }

  const signUp: AuthContextType['signUp'] = async (email, password) => {
    try {
      const response = auth().createUserWithEmailAndPassword(email, password)
      return response
    } catch (error) {
      showFirebaseError(error)
      throw error
    }
  }

  const addUser: AuthContextType['addUser'] = async (displayName, nickname) => {
    const object: UserType = {
      email: auth().currentUser.email,
      displayName,
      nickname,
      uid: auth().currentUser.uid,
      movies: [],
      admin: false,
      onboarding: false,
      phoneNumber: null,
      photoURL: null,
      preferences: {
        plot: false,
        cast: false,
        ratings: false,
        poster: false,
      },
      settings: {
        language: 'pt-BR',
        darkMode: true,
      },
    }

    try {
      const response = firestore().collection('users').doc(auth().currentUser.uid).set(object)
      setUid(auth().currentUser.uid)
      return response
    } catch (error) {
      showFirebaseError(error)
      throw error
    }
  }

  const signOut: AuthContextType['signOut'] = async () => {
    try {
      const response = await auth().signOut()
      setUid(null)
      return response
    } catch (error) {
      showFirebaseError(error)
      throw error
    }
  }

  const recoverPassword: AuthContextType['recoverPassword'] = async (email) => {
    auth()
      .sendPasswordResetEmail(email)
      .then(() => {
        toast.showToast(
          'Email Sent',
          'You will recieve an email to recover the password if your account exists.',
          'success',
        )
      })
      .catch(showFirebaseError)
  }

  const verifyEmail: AuthContextType['verifyEmail'] = async () => {
    auth().currentUser.sendEmailVerification()
  }

  const value: AuthContextType = {
    signIn,
    signUp,
    signOut,
    addUser,
    recoverPassword,
    verifyEmail,
    user: auth().currentUser,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider

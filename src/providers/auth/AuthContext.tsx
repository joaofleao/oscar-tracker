import { createContext } from 'react'
import { FirebaseAuthTypes } from '@react-native-firebase/auth'

export interface AuthContextType {
  signIn: (email: string, password: string) => Promise<FirebaseAuthTypes.UserCredential>
  signUp: (email: string, password: string) => Promise<FirebaseAuthTypes.UserCredential>
  addUser: (nickname: string, displayName: string) => Promise<void>
  signOut: () => Promise<void>
  recoverPassword: (email: string) => Promise<void>
  verifyEmail: () => Promise<void>
  user: FirebaseAuthTypes.User
}

const AuthContext = createContext<AuthContextType | null>(null)
AuthContext.displayName = 'AuthContext'

export default AuthContext

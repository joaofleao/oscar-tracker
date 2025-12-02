import { deleteItemAsync, getItemAsync, setItemAsync } from 'expo-secure-store'

import { print } from '@utils/functions'

interface useAsyncStorageType {
  storeString: (id: string, value: string) => Promise<void>
  storeObject: (id: string, value: unknown) => Promise<void>
  readString: (id: string) => Promise<string>
  readObject: (id: string) => Promise<unknown>
  remove: (id: string) => Promise<void>
}

const useAsyncStorage = (): useAsyncStorageType => {
  const storeObject: useAsyncStorageType['storeObject'] = async (id, value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await setItemAsync(id, jsonValue)
    } catch (e) {
      print('async-storage', `error saving object: ${id}`, 'red')
    }
  }

  const storeString: useAsyncStorageType['storeString'] = async (id, value) => {
    try {
      await setItemAsync(id, value)
    } catch (e) {
      print('async-storage', `error saving string: ${id}`, 'red')
    }
  }

  const readString: useAsyncStorageType['readString'] = async (id) => {
    try {
      const value = await getItemAsync(id)
      if (value !== null) {
        return value
      }
    } catch (e) {
      print('async-storage', `error reading string: ${id}`, 'red')
    }
    return ''
  }

  const readObject: useAsyncStorageType['readObject'] = async (id) => {
    try {
      const jsonValue = await getItemAsync(id)
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch (e) {
      print('async-storage', `error reading string: ${id}`, 'red')
    }
  }

  const remove: useAsyncStorageType['remove'] = async (id) => {
    try {
      await deleteItemAsync(id)
    } catch (e) {
      print('async-storage', `error removing: ${id}`, 'red')
    }
  }

  return {
    storeObject,
    storeString,
    readString,
    readObject,
    remove,
  }
}

export default useAsyncStorage

import { useContext } from 'react'

import StringsContext from './context'
import { type StringsContextType } from './types'

const useStrings = (): StringsContextType => {
  const useStringsContext = useContext(StringsContext)

  if (useStringsContext === null) {
    throw new Error('useStrings has to be used within <StringsContext.Provider>')
  }
  return useStringsContext
}

export default useStrings

import React from 'react'

import SelectAnchor from './select_anchor'
import SelectDropdown from './select_dropdown'
import { SelectProps } from './types'

const Select = <T,>({ renderAnchor, ...props }: SelectProps<T>): React.ReactElement => {
  const [visible, setVisible] = React.useState(false)

  const selectedOption = props.data.find((item) => {
    return item.id === props.selected
  })

  const renderDefaultAnchor = (): React.ReactElement => (
    <SelectAnchor
      visible={visible}
      setVisible={setVisible}
      {...props}
    />
  )

  return (
    <>
      {renderAnchor?.({
        setVisible,
        visible,
        selectedOption,
        ...props,
      }) ?? renderDefaultAnchor()}

      <SelectDropdown
        visible={visible}
        setVisible={setVisible}
        {...props}
      />
    </>
  )
}

export default Select

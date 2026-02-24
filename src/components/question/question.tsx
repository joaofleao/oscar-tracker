import React from 'react'

import { QuestionProps } from './types'
import Button from '@components/button'
import Row from '@components/row'
import Typography from '@components/typography'

const Question = ({ title, on, off, selected, setSelected }: QuestionProps): React.ReactElement => {
  return (
    <Row between>
      <Typography body>{title}</Typography>

      <Row>
        <Button
          small
          onPress={() => setSelected(false)}
          title={off}
          variant={selected ? 'ghost' : 'brand'}
        />
        <Button
          small
          onPress={() => setSelected(true)}
          title={on}
          variant={selected ? 'brand' : 'ghost'}
        />
      </Row>
    </Row>
  )
}

export default Question

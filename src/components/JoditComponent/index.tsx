import React, { useState, useRef, useMemo } from 'react'
import JoditEditor from 'jodit-react'

import * as S from './styles'

type JoditComponentProps = {
  placeholder: string
  label?: string
  description: string
  setData?: (field: string, value: string) => void
}

const JoditComponent = ({
  placeholder,
  label,
  description,
  setData
}: JoditComponentProps) => {
  const editor = useRef(null)
  const [content, setContent] = useState(description)

  const onChange = (newContent: string) => {
    setContent(newContent)
    setData && setData('description', newContent)
  }

  const config = {
    readonly: false, // all options from https://xdsoft.net/jodit/docs/,
    placeholder: placeholder,
    height: 280,
    width: 491
  }

  return (
    <>
      {!!label && <S.Label>{label}</S.Label>}
      <JoditEditor
        ref={editor}
        value={content}
        config={config}
        onBlur={(newContent) => onChange(newContent)}
      />
    </>
  )
}

export default JoditComponent

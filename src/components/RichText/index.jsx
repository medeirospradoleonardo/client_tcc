import dynamic from 'next/dynamic'
const Editor = dynamic(
  () => import('react-draft-wysiwyg').then((mod) => mod.Editor),
  { ssr: false }
)
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'

import * as S from './styles'
import { useState } from 'react'
import { User } from 'templates/ProductBacklog'
import { ContentState, EditorState, convertToRaw } from 'draft-js'
import draftToHtml from 'draftjs-to-html'
// import htmlToDraft from 'html-to-draftjs'
const htmlToDraft =
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  typeof window === 'object' && require('html-to-draftjs').default

// const htmlToDraft = dynamic(
//   () => import('html-to-draftjs').then((mod) => mod),
//   { ssr: false }
// )

// type TextEditorProps = {
//   label?: string
//   content: string
//   setData: (field: string, value: string | null | User | number) => void
// }

const TextEditor = ({
  label,
  content,
  setData,
  style,
  input,
  disabled = false
}) => {
  let editorState
  const contentBlock = htmlToDraft(content)
  if (contentBlock) {
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks
    )
    editorState = EditorState.createWithContent(contentState)
  }
  const [editorStateData, setEditorStateData] = useState(editorState)

  const editorStateChange = (editorState) => {
    setEditorStateData(editorState)
    setData(input, draftToHtml(convertToRaw(editorState.getCurrentContent())))
  }

  return (
    <>
      {!!label && <S.Label>{label}</S.Label>}
      <Editor
        editorState={editorStateData}
        toolbarClassName="toolbarClassName"
        wrapperClassName="wrapperClassName"
        editorClassName="editorClassName"
        onEditorStateChange={editorStateChange}
        editorStyle={style}
        readOnly={disabled}
      />
    </>
  )
}

export default TextEditor

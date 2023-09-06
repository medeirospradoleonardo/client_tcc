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

type TextEditorProps = {
  label?: string
  content: string
  setData: (field: string, value: string | null | User | number) => void
}

const TextEditor = ({ label, content, setData }: TextEditorProps) => {
  let editorState
  const contentBlock = htmlToDraft(content)
  if (contentBlock) {
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks
    )
    editorState = EditorState.createWithContent(contentState)
  }
  const [editorStateData, setEditorStateData] = useState<
    EditorState | undefined
  >(editorState)

  const editorStateChange = (editorState: EditorState) => {
    setEditorStateData(editorState)
    setData(
      'description',
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    )
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
        editorStyle={{
          border: '1px solid rgb(227, 232, 241)',
          width: '491px',
          height: '170px'
        }}
      />
    </>
  )
}

export default TextEditor

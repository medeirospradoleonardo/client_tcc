import React from 'react'
import * as S from './styles'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { getColorFromName } from 'components/Item'

interface KnowledgeProps {
  id: string
  permited: boolean
  title: string
  author: string
  editKnowledge: (id: string) => void
  deleteKnowledge: (id: string) => void
}

const Knowledge = ({
  id,
  permited,
  title,
  author,
  editKnowledge,
  deleteKnowledge
}: KnowledgeProps) => {
  title = title.trim()
  return (
    <S.Container onClick={() => editKnowledge(id)}>
      <S.Title>
        {title.length > 60 ? `${title.slice(0, 60)}...` : title}
      </S.Title>
      <S.Right>
        <S.AvatarContainer>
          <S.Avatar color={getColorFromName(author)}>
            <span>{author?.charAt(0)}</span>
            <div>
              <span className="title">{author}</span>
            </div>
          </S.Avatar>
        </S.AvatarContainer>

        {permited && (
          <S.Icon>
            <IconButton
              onClick={(e) => {
                e.stopPropagation()
                deleteKnowledge(id)
              }}
            >
              <DeleteIcon style={{ color: '#030517' }} fontSize="large" />
            </IconButton>
          </S.Icon>
        )}
      </S.Right>
    </S.Container>
  )
}

export default Knowledge

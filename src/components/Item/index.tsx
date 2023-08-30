import React from 'react'
import { Draggable } from 'react-beautiful-dnd'
import styled from 'styled-components'
import * as S from './styles'
import { getBoardStatus } from 'utils/mappers'
import { IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

interface ItemProps {
  id: string
  title: string
  timeEstimated: number
  status: string | null
  responsible: string
  deleteBoard: (id: string) => void
}

const colors = [
  '#DA7657',
  '#54ac44',
  '#5784DA',
  '#AA57DA',
  '#DA5757',
  '#DA5792',
  '#0f3c61',
  '#57A5DA'
]

export const getColorFromName = (name: string) =>
  colors[name.toLocaleLowerCase().charCodeAt(0) % colors.length]

const Item: React.FC<ItemProps> = ({
  id,
  title,
  timeEstimated,
  status,
  responsible,
  deleteBoard
}) => {
  return (
    <S.Container>
      <S.Id concluded={status == 'concluded' ? true : false}>{id}</S.Id>
      <S.Title>{title}</S.Title>
      <S.Right>
        <S.TimeEstimated>
          <div className="timeEstimated">
            <span className="title">Tempo estimado (em horas)</span>
            <span className="timeEstimatedSpan">{timeEstimated}</span>
          </div>
        </S.TimeEstimated>
        <S.Status color={getBoardStatus(status)?.color}>
          <span className="title">Status</span>
          {getBoardStatus(status)?.title}
        </S.Status>

        <S.AvatarContainer>
          <S.Avatar color={getColorFromName(responsible)}>
            <span>{responsible?.charAt(0)}</span>
            <div>
              <span className="title">{responsible}</span>
            </div>
          </S.Avatar>
        </S.AvatarContainer>

        <S.Icon>
          <IconButton
            onClick={(e) => {
              e.stopPropagation()
              deleteBoard(id)
            }}
          >
            <DeleteIcon style={{ color: '#030517' }} fontSize="large" />
          </IconButton>
        </S.Icon>
      </S.Right>
    </S.Container>
  )
}

export default Item

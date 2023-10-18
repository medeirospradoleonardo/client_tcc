import * as React from 'react'
import * as S from './styles'

import { Draggable, DropResult, Droppable } from 'react-beautiful-dnd'
import Item from 'components/Item'
import { Board, Sprint, User } from 'templates/ProductBacklog'
import { Dialog, IconButton } from '@mui/material'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined'
import KeyboardArrowRightOutlinedIcon from '@mui/icons-material/KeyboardArrowRightOutlined'
import ArrowRightAltOutlinedIcon from '@mui/icons-material/ArrowRightAltOutlined'
import TextField from 'components/TextField'
import Heading from 'components/Heading'
import Button from 'components/Button'
import Confirm from 'components/Confirm'
import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { MUTATION_SPRINT_TOGGLE_EXPAND } from 'graphql/mutations/sprint'
import { Session } from 'next-auth'

export function padTo2Digits(num: number) {
  return num.toString().padStart(2, '0')
}

export function formatDate(date: Date) {
  const d = new Date(date),
    year = d.getFullYear()
  let day = '' + d.getDate(),
    month = '' + (d.getMonth() + 1)

  if (month.length < 2) month = '0' + month
  if (day.length < 2) day = '0' + day

  return [day, month, year].join('/')
}

export type SprintProps = {
  permited: boolean
  session: Session
  sprint: Sprint
  createBoard: (idPath: string | null) => void
  editBoard: (id: string) => void
  deleteSprint: (id: string) => void
  deleteBoard: (id: string) => void
  editSprint: (id: string) => void
  user: User
}

export default function SprintComponent({
  permited,
  session,
  sprint,
  createBoard,
  editBoard,
  deleteSprint,
  deleteBoard,
  editSprint,
  user
}: SprintProps) {
  const [expandSprint, setExpandSprint] = useState<boolean>(sprint.expand)

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    background: 'white',
    padding: '10px',
    marginBottom: '5px',
    borderRadius: '5px',
    borderBottom: '1px solid rgb(178,185,197)',

    ...draggableStyle
  })

  const [toggleSprintExpandGraphQL] = useMutation(
    MUTATION_SPRINT_TOGGLE_EXPAND,
    {
      context: { session },
      onCompleted: () => {
        setExpandSprint(!expandSprint)
      }
    }
  )

  const toggleSprintExpand = (id: string) => {
    toggleSprintExpandGraphQL({
      variables: {
        id: id,
        expand: !expandSprint
      }
    })
  }

  return (
    <>
      <S.ContainerSprint>
        <S.ContainerHeader>
          <IconButton onClick={() => toggleSprintExpand(sprint.id)}>
            {expandSprint ? (
              <KeyboardArrowDownOutlinedIcon
                style={{ color: '#030517' }}
                fontSize="large"
              />
            ) : (
              <KeyboardArrowRightOutlinedIcon
                style={{ color: '#030517' }}
                fontSize="large"
              />
            )}
          </IconButton>
          <S.ContainerTitle>
            <S.Title>
              <Heading size="medium" color="black" lineBottom>
                {/* {sprint.name} */}
                {sprint.name && sprint.name.length > 50
                  ? `${sprint.name?.slice(0, 50)}...`
                  : sprint.name}
              </Heading>
            </S.Title>
          </S.ContainerTitle>
          <S.ContainerDate>
            <h4>{formatDate(new Date(sprint.initialDate))}</h4>
            <ArrowRightAltOutlinedIcon style={{ marginTop: '5px' }} />
            <h4>{formatDate(new Date(sprint.finalDate))}</h4>
          </S.ContainerDate>
          <S.Right>
            {permited && (
              <>
                <div>
                  <IconButton onClick={() => editSprint(sprint.id)}>
                    <EditIcon style={{ color: '#030517' }} fontSize="large" />
                  </IconButton>
                </div>
                <div>
                  <IconButton onClick={() => deleteSprint(sprint.id)}>
                    <DeleteIcon style={{ color: '#030517' }} fontSize="large" />
                  </IconButton>
                </div>
              </>
            )}
          </S.Right>
        </S.ContainerHeader>
        {expandSprint && (
          <Droppable droppableId={`sprint-${sprint.id}`}>
            {(provided) => (
              <S.Content>
                <div {...provided.droppableProps} ref={provided.innerRef}>
                  {sprint.boards &&
                    sprint.boards.map((board: Board, index: number) => (
                      <Draggable
                        key={board.id}
                        index={index}
                        draggableId={`draggable-${board.id}`}
                        isDragDisabled={!permited}
                      >
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style
                            )}
                            onClick={
                              permited
                                ? () => editBoard(board.id)
                                : user.id == board.responsible.id
                                ? () => editBoard(board.id)
                                : undefined
                            }
                          >
                            <Item
                              permited={permited}
                              deleteBoard={deleteBoard}
                              key={board.id}
                              id={board.id}
                              title={board.title}
                              timeEstimated={board.timeEstimated}
                              responsible={board.responsible.name}
                              status={board.status}
                            />
                          </div>
                        )}
                      </Draggable>
                    ))}

                  {provided.placeholder}
                </div>
                {/* {permited && (
                  <Button
                    style={{ color: '#000' }}
                    icon={<AddIcon />}
                    minimal
                    size="small"
                    onClick={() => createBoard(sprint.id)}
                  >
                    Criar item
                  </Button>
                )} */}
              </S.Content>
            )}
          </Droppable>
        )}
      </S.ContainerSprint>
    </>
  )
}
